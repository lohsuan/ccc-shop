<template>
  <div>
    <ProductSalesReport />
    <SalesReport />
  </div>
</template>

<script>
import ProductSalesReport from "./ProductSalesReport";
import SalesReport from "./SalesReport.vue";

export default {
  components: {
    ProductSalesReport,
    SalesReport,
  },
  data: function() {
    return {

    }
  },
}
</script>

<style>

</style>