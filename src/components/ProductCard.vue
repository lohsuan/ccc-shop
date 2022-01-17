<template >
  <v-card class="mx-auto my-6 card" height="300" width="250">
    <div class="overlay">
      <v-btn
        class="ma-2 pa-4"
        outlined
        color="white"
        @click="$refs.productInfoDialog.openDialog()"
      >
        Info
      </v-btn>
    </div>
    <v-img
      class="img"
      height="180"
      width="300"
      :src="product.pictureURL"
    ></v-img>

    <v-card-title>{{ product.name }}</v-card-title>

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
      </v-row>

      <div class="mx-1 my-4 text-subtitle-1">$ {{ product.price }}</div>
    </v-card-text>

    <ProductInfoDialog ref="productInfoDialog" :product="product" />
  </v-card>
</template>

<script>
import ProductInfoDialog from "./ProductInfoDialog";

export default {
  name: "ProductCard",
  components: {
    ProductInfoDialog,
  },
  props: ["product"],
};
</script>

<style>
.card {
  transition: 500ms;
  position: relative;
  overflow: hidden;
}

.card img {
  z-index: 1;
}

.card:hover img {
  filter: blur(4px);
}

.card:hover .overlay {
  opacity: 0.7;
}

.card .overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  background-color: #232b34;
  opacity: 0;
  z-index: 100;
  transition: all 0.3s ease-in;
}

.card:hover,
.card:active {
  transform: scaleY(1.1) scaleX(1.06);
  /* box-shadow: 0 140px 98px rgba(0, 0, 0, 0.25), 0 0px 60px rgba(0, 0, 0, 0.22); */
}
</style>
