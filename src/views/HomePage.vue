<template>
  <div id="home">
    <!-- header -->
    <Welcome />

    <v-container
      class="broadcaster discount mt-5 justify-center d-flex"
      style="width: 1550px"
    >
      <v-col cols="12">
        <div>
          <div
            v-for="shippingDiscounts in $store.state.discountStore
              .shippingDiscounts"
            :key="shippingDiscounts.discountCode"
          >
            <v-icon color="blue darken-2"> mdi-bullhorn </v-icon>
            {{ shippingDiscounts.policyDescription }}
          </div>
        </div>

        <div>
          <div
            class="mt-5"
            v-for="seasoningsDiscounts in $store.state.discountStore
              .seasoningsDiscounts"
            :key="seasoningsDiscounts.discountCode"
          >
            <v-icon color="blue darken-2"> mdi-bullhorn </v-icon>
            {{ seasoningsDiscounts.policyDescription }}
          </div>
        </div>

        <div>
          <div
            class="mt-5"
            v-for="specialDiscounts in $store.state.discountStore
              .specialDiscounts"
            :key="specialDiscounts.discountCode"
          >
            <v-icon color="blue darken-2"> mdi-bullhorn </v-icon>
            {{ specialDiscounts.policyDescription }}
          </div>
        </div>
      </v-col>
    </v-container>

    <v-container
      class="d-flex justify-center align-center"
      style="width: 1600px"
    >
      <v-card color="product" style="width: 1600px">
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold text-h2 product--text">Products</h1>
        </v-card-title>
        <v-tabs color="product" fixed-tabs background-color="transparent">
          <v-tab @click="chooseCategory(0)">ALL</v-tab>
          <v-tab @click="chooseCategory(1)">COMPUTER</v-tab>
          <v-tab @click="chooseCategory(2)">NOTEBOOK</v-tab>
          <v-tab @click="chooseCategory(3)">TABLET</v-tab>
          <v-tab @click="chooseCategory(4)">PHONE</v-tab>
          <v-tab-item v-for="n in 5" :key="n">
            <v-card color="product">
              <v-container>
                <v-row justify="center">
                  <div
                    v-for="product in getShowingProducts()"
                    :key="product.name"
                  >
                    <div class="pa-4" v-if="product.existFlag == 1">
                      <ProductCard :product="product" />
                    </div>
                  </div>
                </v-row>
              </v-container>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-container>

    <!-- footer -->
    <Footer />
  </div>
</template>

<script>
import Welcome from "../components/Welcome";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default {
  name: "Home",
  components: {
    Welcome,
    ProductCard,
    Footer,
  },
  data: () => {
    return {
      selectedIndex: 0,
      categories: ["ALL", "COMPUTER", "NOTEBOOK", "TABLET", "PHONE"],
    };
  },
  mounted() {
    this.$store.dispatch("productStore/loadAllProducts");
    this.$store.dispatch("discountStore/loadCurrentShippingDiscount");
    this.$store.dispatch("discountStore/loadCurrentSeasoningDiscount");
    this.$store.dispatch("discountStore/loadCurrentSpecialDiscount");
  },
  methods: {
    getShowingProducts() {
      if (this.selectedIndex === 0) {
        return this.$store.state.productStore.products;
      }

      return this.$store.state.productStore.products.filter(
        (product) => product.category === this.categories[this.selectedIndex]
      );
    },
    chooseCategory(index) {
      this.selectedIndex = index;
    },
  },
};
</script>

<style>
#home {
  background-image: url(https://mdn.mozillademos.org/files/11307/bubbles.png),
    linear-gradient(to bottom, rgba(34, 86, 155, 0.911), rgba(255, 255, 255, 0));
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: bottom right, left, right;
  font-family: monospace;
}

.broadcaster {
  background-color: #b4ebca;
}

.discount {
  border-radius: 10px;
}

.product {
  background-color: #fffbe6 !important;
}
.product--text {
  color: #356859 !important;
}
</style>
