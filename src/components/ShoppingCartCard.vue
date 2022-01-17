<template>
  <v-container>
    <v-card class="py-4 px-8 my-4">
      <h3 class="text-center">{{ items.venderName }}</h3>
      <v-divider class="my-4"></v-divider>
      <ShoppingCartItemRow v-for="item in items.items" :key="item.id" :item="item"/>
      <v-divider class="my-4"></v-divider>
      <v-row class="d-flex flex-row justify-space-between align-center ma-4">
        <h3>總金額：$ {{ shopTotalPrice }}</h3>
        <v-btn
            color="cyan"
            class="white--text ma-5"
            @click="submitOrder()"
        >
          立即下單
        </v-btn>
      </v-row>
    </v-card>

    <SendOrderDialog
        ref="sendOrderDialog"
        :vender="items.venderName"
        @close="isOpenDialog = false"
    />

    <v-snackbar
        v-model="isShowSnackbar"
        :timeout="2000"
        color="red"
    >
      請勾選購物車商品再下單！
    </v-snackbar>
  </v-container>
</template>

<script>
import ShoppingCartItemRow from "./ShoppingCartItemRow";
import SendOrderDialog from "./SendOrderDialog";

export default {
  name: "ShoppingCartCard",
  components: {
    SendOrderDialog,
    ShoppingCartItemRow
  },
  props: ["items"],
  data: () => {
    return {
      isOpenDialog: false,
      isShowSnackbar: false
    }
  },
  computed: {
    shopTotalPrice: function () {
      return this.$store.getters['shoppingCartStore/getShopTotalPrice'](this.items.venderName)
    }
  },
  methods: {
    submitOrder() {
      const selectedProducts = this.$store.getters["shoppingCartStore/getSelectedVenderProducts"](this.items.venderName)
      if (selectedProducts.length === 0) {
        this.isShowSnackbar = true
      } else {
        this.$store.dispatch("shoppingCartStore/updateCartStateToBackend")
        this.$refs.sendOrderDialog.openDialog()
      }
    }
  }
}
</script>

<style></style>