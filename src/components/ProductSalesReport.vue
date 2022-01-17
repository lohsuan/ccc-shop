<template>
  <div class="mt-10">
    <div class="text-h4 font-weight-bold" style="text-align: center">
      產品銷售量統計圖
    </div>
    <v-row class="mt-3 justify-center align-center">
      <div class="text-h5 font-weight-bold">From:</div>
      <v-col cols="2">
        <v-text-field
          v-model="startTimepicker"
          type="text"
          prepend-inner-icon="mdi-calendar"
          readonly
          @click="startTimeDialog = true"
        ></v-text-field>
      </v-col>
      <div class="text-h5 font-weight-bold">To:</div>
      <v-col cols="2">
        <v-text-field
          v-model="endTimepicker"
          prepend-inner-icon="mdi-calendar"
          readonly
          @click="endTimeDialog = true"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn color="green accent-1" @click="generateReport">Generate</v-btn>
      </v-col>
    </v-row>
    <template>
      <v-dialog v-model="startTimeDialog" max-width="300px">
        <v-date-picker
          v-model="startTimepicker"
          color="green lighten-1"
        ></v-date-picker>
        <v-btn @click="startTimeDialog = false">OK</v-btn>
      </v-dialog>
      <v-dialog v-model="endTimeDialog" max-width="300px">
        <v-date-picker
          color="green lighten-1"
          v-model="endTimepicker"
        ></v-date-picker>
        <v-btn @click="endTimeDialog = false">OK</v-btn>
      </v-dialog>
    </template>
    <v-container class="mt-10 d-flex justify-center align-center">
      <apexchart
        width="530"
        type="bar"
        :options="options"
        :series="series"
      ></apexchart>
      <apexchart
        class="ml-10"
        width="450"
        type="pie"
        :options="pieOptions"
        :series="pieSeries"
      ></apexchart>
    </v-container>
  </div>
</template>

<script>
import { getProductSalesReport } from "@/api/reportApi";

export default {
  data: function () {
    return {
      options: {
        chart: {
          id: "productSalesReport",
        },
        xaxis: {
          categories: ["A", "B", "C"],
        },
      },
      series: [
        {
          name: "銷售數量",
          data: [13, 4, 6],
        },
      ],
      pieOptions: {
        labels: ["A", "B", "C"],
      },
      pieSeries: [13, 4, 6],
      startTimeDialog: false,
      endTimeDialog: false,
      reportData: {},
      startTimepicker: "2018-01-01",
      endTimepicker: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
    };
  },
  mounted() {
    this.generateReport();
  },
  methods: {
    async generateReport() {
      this.reportData = await getProductSalesReport(
        sessionStorage.getItem("id"),
        this.startTimepicker,
        this.endTimepicker
      );
      this.options = this.prepareOptions(this.reportData.categoryList);
      this.series = this.prepareSeries(this.reportData.quantityList);
      this.pieOptions = this.preparePieOptions(this.reportData.categoryList);
      this.pieSeries = this.preparePieSeries(this.reportData.quantityList);
    },
    prepareOptions(responseCategories) {
      const options = {
        chart: {
          id: "productSalesReport",
        },
        xaxis: {
          categories: responseCategories,
        },
      };
      return options;
    },
    prepareSeries(responseQuantity) {
      const series = [
        {
          name: "銷售數量",
          data: responseQuantity,
        },
      ];
      return series;
    },
    preparePieOptions(responseCategories) {
      const pieOptions = {
        labels: responseCategories,
      };
      return pieOptions;
    },
    preparePieSeries(responseQuantity) {
      const pieSeries = responseQuantity;
      return pieSeries;
    },
  },
};
</script>

<style>
</style>