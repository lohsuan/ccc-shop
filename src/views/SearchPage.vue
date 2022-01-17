<template>
  <v-container>
    <h1 class="text-h4 text-center">"{{ searchText }}" 的搜尋結果</h1>
    <div v-if="products.length > 0">
      <v-list>
        <div v-for="product in products" :key="product.id">
          <SearchResultProductCard :product="product" />
        </div>
      </v-list>
    </div>

    <div v-else class="mx-auto my-12 d-flex flex-column align-center">
      <h3 class="text-center text-h6">沒有找到商品 QQ</h3>
      <router-link to="/" style="text-decoration: none">
        <v-btn color="cyan" class="white--text ma-5"> 回首頁</v-btn>
      </router-link>
    </div>
  </v-container>
</template>

<script>

import SearchResultProductCard from "../components/SearchResultProductCard";
export default {
  name: "SearchPage",
  components: {SearchResultProductCard},

  data: () => {
    return {
      searchText: "",
      products: [],
    };
  },
  mounted() {
    this.searchText = this.$route.params.text;
    this.products = this.$store.getters["productStore/searchProductsByText"](
        this.searchText
    );
  },
};
</script>

<style>
</style>