<template>
  <v-container>
    <h1 class="text-h4 text-center">"{{ searchText }}" 的搜尋結果</h1>
    <v-skeleton-loader
        v-for="i in 5"
        :key="i"
        class="mx-auto my-12"
        max-width="1000"
        type="list-item-two-line"
    ></v-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  name: "SearchLoadingPage",
  data: () => {
    return {
      searchText: "",
    }
  },
  mounted() {
    this.searchText = this.$route.params.text
    this.$store.dispatch("productStore/loadAllProducts")
    setTimeout(() => {
      this.$router.push({ name: 'SearchResult', params: { text: this.searchText } })
    }, this.getLoadingTimeout())
  },
  methods: {
    getLoadingTimeout() {
      return Math.floor(Math.random() * 2000) + 500;
    }
  }
}
</script>

<style scoped>

</style>