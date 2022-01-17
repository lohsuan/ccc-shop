<template>
  <v-dialog v-model="isOpenDialog" width="400">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title>
          <span class="text-h5 font-weight-bold">評價 !</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="valuation"
                  solo
                  name="input-7-4"
                  label="給出你的珍貴看法 !"
                  :rules="valuationRules"
                  append-icon="mdi-square-edit-outline"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <div class="text-center">
                  <v-rating
                    v-model="rating"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    empty-icon="$ratingFull"
                    hover
                  ></v-rating>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-grey"
            text
            @click="
              closeDialog();
              reset();
            "
          >
            關閉
          </v-btn>
          <v-btn
            color="blue"
            text
            @click="createValuation()"
            :disabled="!valid"
          >
            送出
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-snackbar v-model="isOpenSnackbar" :timeout="2000">
        Login Fail
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="isOpenSnackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-form>
  </v-dialog>
</template>

<script>
import { createValuation } from "@/api/valuationApi";
import { getCustomerValuations } from "@/api/valuationApi";

export default {
  name: "SignInDialog",
  data: () => {
    return {
      isOpenDialog: false,
      isOpenSnackbar: false,
      valid: false,
      rating: 0,
      valuation: "",
      valuationRules: [(v) => !!v || "欄位不可留空"],
      productName: "",
    };
  },
  async mounted() {
    await this.$store.dispatch("productStore/loadAllProducts");
  },
  methods: {
    async openDialog(productName) {
      this.isOpenDialog = true;
      this.productName = productName;

      var p = this.$store.state.productStore.products.filter(
        (product) => product.name === this.productName
      );
      var data = await getCustomerValuations(
        sessionStorage.getItem("id"),
        p[0].id
      );
      console.log("data", data);
      this.valuation = data.comment;
      this.rating = data.rating;
      this.resetValidation();
    },
    reset() {
      this.$refs.form.reset();
      this.rating = 0;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    createValuation() {
      var p = this.$store.state.productStore.products.filter(
        (product) => product.name === this.productName
      );
      createValuation(
        sessionStorage.getItem("id"),
        p[0].id,
        this.valuation,
        this.rating
      );
      this.closeDialog();
    },
    closeDialog() {
      this.reset();
      this.isOpenDialog = false;
    },
  },
};
</script>

<style>
</style>