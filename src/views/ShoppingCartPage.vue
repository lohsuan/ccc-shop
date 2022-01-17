<template>
  <div>
    <!-- Logged in -->
    <v-container class="d-flex flex-column justify-center align-center pt-4" v-if="$store.state.userStore.isLogin">
      <h3 class="text-h3 mt-6">{{ $store.state.userStore.username }} 的購物車</h3>
      <div v-if="cartProducts.length > 0">
        <ShoppingCartCard
            v-for="(items, index) in cartProducts"
            :key="index"
            :items="items"
        />
      </div>
      <div v-else class="d-flex flex-column justify-start align-center py-8 px-8 my-4">
        <h5 class="text-h5 font-weight-bold">你的購物車是空的，給我去買東西！</h5>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/">
              <v-btn
                  color="cyan"
                  class="white--text ma-5"
                  v-bind="attrs"
                  v-on="on"
                  style="text-decoration: none;"
              >
                去逛街
              </v-btn>
            </router-link>
          </template>
          <span>快去啦</span>
        </v-tooltip>
      </div>
    </v-container>

    <!-- Not logged in -->
    <v-container class="d-flex flex-column justify-center align-center" v-else>
      <h2>請先登入以查看購物車</h2>
      <v-btn color="cyan" class="white--text ma-5" @click="$refs.signInDialog.openDialog()">
        登入
      </v-btn>
    </v-container>

    <SignInDialog ref="signInDialog" identity="1"/>
  </div>
</template>

<script>
import SignInDialog from "../components/SignInDialog";
import ShoppingCartCard from "../components/ShoppingCartCard";

export default {
  name: "ShoppingCart",
  components: {
    ShoppingCartCard,
    SignInDialog
  },
  computed: {
    cartProducts() {
      return this.$store.state.shoppingCartStore.cartProducts
    }
  },
  mounted() {
    this.$store.dispatch("shoppingCartStore/loadUserCartProducts")
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("shoppingCartStore/updateCartStateToBackend")
    next()
  }
};
</script>

<style></style>
