<template>
  <div class="mt-10">
    <div class="text-h4 font-weight-bold" style="text-align: center">
      銷售額趨勢圖
    </div>
    <v-container class="mt-10 d-flex justify-center align-center">
      <apexchart
        width="800"
        type="line"
        :options="options"
        :series="series"
      ></apexchart>
    </v-container>
  </div>
</template>

<script>
import { getSalesReport } from "@/api/reportApi";

export default {
  data: function () {
    return {
      options: {
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: [
            "2021/02",
            "2021/03",
            "2021/04",
            "2021/05",
            "2021/06",
            "2021/07",
            "2021/08",
            "2021/09",
            "2021/10",
            "2021/11",
            "2021/12",
            "2021/01",
          ],
        },
        tooltip: {
          fixed: {
            enabled: false,
            position: "topRight",
          },
        },
      },

      series: [
        {
          name: "series",
          data: [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42],
        },
      ],
    };
  },
  mounted() {
    this.generateReport();
  },
  methods: {
    async generateReport() {
      this.reportData = await getSalesReport(sessionStorage.getItem("id"));
      this.options = this.prepareOptions(this.reportData.timeList);
      this.series = this.prepareSeries(this.reportData.totalPriceList);
    },
    prepareOptions(timeList) {
      const options = {
        stroke: {
          curve: "smooth",
        },
        chart: {
          id: "salesReport",
        },
        xaxis: {
          categories: timeList,
        },
      };
      return options;
    },
    prepareSeries(totalPriceList) {
      const series = [
        {
          name: "銷售額",
          data: totalPriceList,
        },
      ];
      return series;
    },
  },
};
</script>

<style>
</style>