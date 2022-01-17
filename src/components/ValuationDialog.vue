<template>
  <v-dialog width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        outlined
        class="mx-3"
        color="indigo"
        v-bind="attrs"
        v-on="on"
        @click="getValuations"
        >看看大家怎麼說</v-btn
      >
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="indigo" dark>買家真心話</v-toolbar>
        <v-card-text class="mt-3 pb-1">
          <div v-if="valuations.length === 0">
            <v-row dense>
              <v-col>
                <div class="text-center text-h5 mt-4">
                  No valuation, Only me...
                </div>
                <div class="text-center text--lighten-1 mt-5">
                  ⧸⎩⎠⎞͏(・∀・)⎛͏⎝⎭⧹
                </div>
              </v-col>
            </v-row>
          </div>
          <div
            class="subtitle-1 py-3"
            v-for="valuation in valuations"
            :key="valuation.customerId"
          >
            <v-row dense>
              <v-col cols="1">
                <v-icon small color="indigo"> mdi-account </v-icon>
              </v-col>
              <v-col>
                <div style="color: black; font-weight: 600">
                  {{ valuation.customerName }} :
                </div>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <div>{{ valuation.comment }}</div>
              </v-col>
              <v-col cols="1">
                <v-icon small color="blue lighten-2" v-if="valuation.rating >= 3">
                  mdi-thumb-up
                </v-icon>
                <v-icon small color="red lighten-2" v-else>
                  mdi-thumb-down
                </v-icon>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { getValuations } from "@/api/valuationApi";

export default {
  props: ["productId"],
  data: () => {
    return {
      valuations: [],
    };
  },
  methods: {
    async getValuations() {
      this.valuations = await getValuations(this.productId);
      console.log(this.valuations.length);
    },
  },
};
</script>

<style>
</style>