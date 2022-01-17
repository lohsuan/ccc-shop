<template>
  <v-card
    min-height="700px"
    min-width="300px"
    max-width="1600px"
    class="elevation-5 my-3"
  >
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title class="pl-3">
        <v-icon class="mr-3"> mdi-wrench </v-icon>
        {{ $store.state.userStore.username }}'s Management Page
      </v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left> mdi-account </v-icon>
        Account
      </v-tab>
      <v-tab>
        <v-icon left> mdi-laptop </v-icon>
        Products
      </v-tab>
      <v-tab>
        <v-icon left> mdi-calendar-text </v-icon>
        Orders
      </v-tab>
      <v-tab>
        <v-icon left> mdi-sale </v-icon>
        Discounts
      </v-tab>
      <v-tab>
        <v-icon left> mdi-finance </v-icon>
        銷售量報表
      </v-tab>
      <v-tab>
        <v-icon left> mdi-cash-multiple </v-icon>
        銷售額報表
      </v-tab>

      <v-tab-item style="width: 1300px">
        <AccountManagementTab />
      </v-tab-item>

      <v-tab-item style="width: 1300px">
        <ProductTab />
      </v-tab-item>

      <v-tab-item style="width: 1300px">
        <OrderTab />
      </v-tab-item>

      <v-tab-item style="width: 1300px">
        <DiscountTab />
      </v-tab-item>

      <v-tab-item style="width: 1300px">
        <ProductSalesReport />
      </v-tab-item>

      <v-tab-item style="width: 1300px">
        <SalesReport />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import AccountManagementTab from "./AccountManagementTab";
import ProductTab from "./ProductTab";
import OrderTab from "./OrderTab";
import DiscountTab from "./DiscountTab";
// import ReportTab from "./ReportTab";
import ProductSalesReport from "./ProductSalesReport";
import SalesReport from "./SalesReport.vue";

export default {
  name: "StaffPage",
  components: {
    AccountManagementTab,
    ProductTab,
    OrderTab,
    DiscountTab,
    // ReportTab,
    ProductSalesReport,
    SalesReport,
  },
};
</script>

<style>
</style>