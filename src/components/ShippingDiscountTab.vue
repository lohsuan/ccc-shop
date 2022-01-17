<template>
  <v-data-table
    :headers="headers"
    :items="shippingDiscounts"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>免運折扣</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- new/edit discount dialog -->
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Discount
            </v-btn>
          </template>
          <!-- new/edit discount card -->
          <v-form ref="form">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="editedItem.policyDescription"
                        label="Policy Description*"
                        :rules="descriptionRules"
                        required
                        dense
                        prepend-icon="mdi-note-edit"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="startTimepicker"
                        type="text"
                        label="Start Time*"
                        :rules="startTimeRules"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        @click="startTimeDialog = true"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="endTimepicker"
                        label="End Time*"
                        :rules="startTimeRules"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        @click="endTimeDialog = true"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="editedItem.targetPrice"
                        label="Target Price*"
                        :rules="targetPriceRules"
                        required
                        dense
                        prepend-icon="mdi-currency-usd"
                      ></v-text-field>
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
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="
                    close();
                    reset();
                  "
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="
                    save();
                    reset();
                  "
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
        <!-- end of new/edit discount dialog -->
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
    </template>

    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
  </v-data-table>
</template>

<script>
import { createShippingDiscount } from "@/api/discountApi";
import { editShippingDiscount } from "@/api/discountApi";
import { getVenderShippingDiscounts } from "@/api/discountApi";

export default {
  data: () => ({
    loading: false,
    dialog: false,
    dialogDelete: false,
    startTimeDialog: false,
    endTimeDialog: false,
    headers: [
      { text: "Discount Code", align: "start", value: "discountCode" },
      {
        text: "Policy Description",
        value: "policyDescription",
        sortable: false,
      },
      { text: "Start Time", value: "startDate" },
      { text: "End Time", value: "endDate" },
      { text: "Target Price", value: "targetPrice" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    startTimepicker: null,
    endTimepicker: null,
    descriptionRules: [(v) => !!v || "欄位不可留空"],
    startTimeRules: [(v) => !!v || "欄位不可留空"],
    endTimeRules: [(v) => !!v || "欄位不可留空"],
    targetPriceRules: [
      (v) => !!v || "欄位不可留空",
      (v) => /^\d+$/.test(v) || "目標金額只能為整數",
    ],
    shippingDiscounts: [],
    editedIndex: -1,
    editedItem: {
      discountCode: null,
      policyDescription: null,
      startTime: null,
      endTime: null,
      targetPrice: null,
    },
    defaultItem: {
      discountCode: null,
      policyDescription: null,
      startTime: null,
      endTime: null,
      targetPrice: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Discount" : "Edit Discount";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async mounted() {
    this.shippingDiscounts = await getVenderShippingDiscounts(
      this.$store.state.userStore.id
    );
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    async refersh() {
      this.shippingDiscounts = await getVenderShippingDiscounts(
        this.$store.state.userStore.id
      );
    },

    editItem(item) {
      this.editedIndex = this.shippingDiscounts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.startTimepicker = new Date(
        this.shippingDiscounts[this.editedIndex].startDate
      )
        .toISOString()
        .substr(0, 10);
      this.endTimepicker = new Date(
        this.shippingDiscounts[this.editedIndex].endDate
      )
        .toISOString()
        .substr(0, 10);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.shippingDiscounts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    //  async deleteItemConfirm() {
    //   this.loading = true;
    //   await deleteDiscount(this.shippingDiscounts[this.editedIndex].id);
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   this.loading = false;
    //   this.refersh();
    //   this.closeDelete();
    // },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.shippingDiscounts[this.editedIndex],
          this.editedItem
        );
        await editShippingDiscount(
          this.editedItem.discountCode,
          this.$store.state.userStore.id,
          this.editedItem.policyDescription,
          this.startTimepicker,
          this.endTimepicker,
          this.editedItem.targetPrice
        );
      } else {
        await createShippingDiscount(
          this.$store.state.userStore.id,
          this.editedItem.policyDescription,
          this.startTimepicker,
          this.endTimepicker,
          this.editedItem.targetPrice
        );
      }
      await this.refersh();
      this.close();
    },
  },
};
</script>

<style>
</style>