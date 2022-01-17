<template>
  <v-dialog v-model="isOpenDialog" width="500">
    <v-card>
      <v-img height="400" :src="product.pictureURL"></v-img>
      <v-card-title>
        <span class="text-h5 font-weight-bold">{{ product.name }}</span>
        <v-spacer></v-spacer>
        <span class="subtitle-2">{{ product.venderName }}</span>
      </v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="product.rate"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          <!-- <div class="grey--text ms-4">{{ product.rate }}</div> -->
        </v-row>

        <div class="mt-4 text-subtitle-1">$ {{ product.price }}</div>
        <div>
          {{ product.description }}
        </div>
      </v-card-text>

      <v-container>
        <v-row justify="center" align="center">
          <v-btn fab x-small @click="decreaseQuantity()">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <div class="mx-4">{{ quantity }}</div>
          <v-btn fab x-small @click="increaseQuantity()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <div class="mx-6 my-4 text-subtitle-2">
            只剩 {{ product.stock }} 個 !
          </div>
          <ValuationDialog :productId="this.product.id" />
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn
          v-if="$store.state.userStore.isLogin"
          block
          class="mb-3"
          color="secondary"
          elevation="5"
          @click="addProductToCart"
        >
          加入購物車
        </v-btn>
        <v-btn
          v-else
          block
          disabled
          class="mb-3"
          color="secondary"
          elevation="5"
          @click="addProductToCart"
        >
          請先登入帳號以購買商品
        </v-btn>

        <v-snackbar
          v-model="isShowSnackbar"
          :timeout="2000"
          color="blue"
          centered
        >
          <v-icon>mdi-information</v-icon>
          此商品已加入過購物車！
        </v-snackbar>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ValuationDialog from "./ValuationDialog";
import { addShoppingCartProduct } from "../api/shoppingCartApi";

export default {
  name: "ProductInfoDialog",
  components: {
    ValuationDialog,
  },
  props: ["product"],
  data: () => {
    return {
      isOpenDialog: false,
      isShowSuccessAlert: false,
      isShowFailAlert: false,
      isShowSnackbar: false,
      quantity: 1,
    };
  },
  methods: {
    openDialog() {
      this.isOpenDialog = true;
    },
    decreaseQuantity() {
      if (this.quantity <= 1) return;
      this.quantity--;
    },
    increaseQuantity() {
      if (this.quantity >= this.product.stock) return;
      this.quantity++;
    },
    async addProductToCart() {
      const hasProduct = this.$store.getters[
        "shoppingCartStore/checkShoppingCartHasProduct"
      ](this.product.venderName, this.product.id);
      if (hasProduct) {
        this.isShowSnackbar = true;
      } else {
        await addShoppingCartProduct(
          this.product.id,
          this.$store.state.userStore.id,
          this.quantity
        );
        await this.$store.dispatch("shoppingCartStore/loadUserCartProducts");
        this.isOpenDialog = false;
      }
    },
  },
};
</script>

<style></style>
