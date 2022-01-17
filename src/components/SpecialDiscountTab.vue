<template>
  <v-data-table
    :headers="headers"
    :items="specialDiscounts"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>商品折扣</v-toolbar-title>
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
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.discountRate"
                        label="Discount Rate*"
                        :rules="discountRateRules"
                        required
                        dense
                        prepend-icon="mdi-currency-usd"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="editedItem.category"
                        label="Category*"
                        :items="['COMPUTER', 'NOTEBOOK', 'TABLET', 'PHONE']"
                        :rules="categoryRules"
                        required
                        dense
                        prepend-icon="mdi-shape"
                      ></v-select>
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
import { createSpecialDiscount } from "@/api/discountApi";
import { editSpecialDiscount } from "@/api/discountApi";
import { getVenderSpecialDiscounts } from "@/api/discountApi";

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
      { text: "Category", value: "category" },
      { text: "Discount Rate", value: "discountRate" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    startTimepicker: null,
    endTimepicker: null,
    descriptionRules: [(v) => !!v || "欄位不可留空"],
    startTimeRules: [(v) => !!v || "欄位不可留空"],
    endTimeRules: [(v) => !!v || "欄位不可留空"],
    categoryRules: [(v) => !!v || "欄位不可留空"],
    discountRateRules: [
      (v) => !!v || "欄位不可留空",
      (v) => /^-?\d+(?:[.,]\d*?)?$/.test(v) || "比率只能包含數字",
    ],
    specialDiscounts: [],
    editedIndex: -1,
    editedItem: {
      discountCode: null,
      policyDescription: null,
      startTime: null,
      endTime: null,
      category: null,
      discountRate: null,
    },
    defaultItem: {
      discountCode: null,
      policyDescription: null,
      startTime: null,
      endTime: null,
      category: "COMPUTER",
      discountRate: null,
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
    this.specialDiscounts = await getVenderSpecialDiscounts(
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
      this.specialDiscounts = await getVenderSpecialDiscounts(
        this.$store.state.userStore.id
      );
    },

    editItem(item) {
      this.editedIndex = this.specialDiscounts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.startTimepicker = new Date(this.specialDiscounts[this.editedIndex].startTime.split(" ")[0])
        .toISOString()
        .substr(0, 10);
      this.endTimepicker = new Date(this.specialDiscounts[this.editedIndex].endTime.split(" ")[0])
        .toISOString()
        .substr(0, 10);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.specialDiscounts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    //  async deleteItemConfirm() {
    //   this.loading = true;
    //   await deleteDiscount(this.specialDiscounts[this.editedIndex].id);
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
      const categorys = ["COMPUTER", "NOTEBOOK", "TABLET", "PHONE"];
      let category = categorys.indexOf(this.editedItem.category).toString();

      if (this.editedIndex > -1) {
        Object.assign(this.specialDiscounts[this.editedIndex], this.editedItem);
        await editSpecialDiscount(
          this.editedItem.discountCode,
          this.$store.state.userStore.id,
          this.editedItem.policyDescription,
          this.startTimepicker,
          this.endTimepicker,
          category,
          this.editedItem.discountRate
        );
      } else {
        await createSpecialDiscount(
          this.$store.state.userStore.id,
          this.editedItem.policyDescription,
          this.startTimepicker,
          this.endTimepicker,
          category,
          this.editedItem.discountRate
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