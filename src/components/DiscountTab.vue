<template>
  <v-card>
    <v-tabs>
      <v-tab> Seasonings Discount </v-tab>
      <v-tab>
        <!-- <v-icon left> mdi-laptop </v-icon> -->
        Shipping Discount
      </v-tab>
      <v-tab>
        <!-- <v-icon left> mdi-calendar-text </v-icon> -->
        Special Discount
      </v-tab>

      <v-tab-item style="width: 1300px">
        <SeasoningsDiscountTab />
      </v-tab-item>

      <v-tab-item style="width: 1300px">
        <ShippingDiscountTab />
      </v-tab-item>

      <v-tab-item style="width: 1300px">
        <SpecialDiscountTab />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import SeasoningsDiscountTab from "./SeasoningsDiscountTab";
import ShippingDiscountTab from "./ShippingDiscountTab";
import SpecialDiscountTab from "./SpecialDiscountTab";

export default {
  name: "StaffPage",
  components: {
    SeasoningsDiscountTab,
    ShippingDiscountTab,
    SpecialDiscountTab,
  },
};
</script>

<style>
</style>