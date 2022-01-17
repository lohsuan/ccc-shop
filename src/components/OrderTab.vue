<template>
  <v-card>
    <v-card-title>
      訂單列表
      <v-alert text type="info" elevation="2" class="mx-10">
        <div class="text-body-2">點擊「運送狀態」可更新商品的運送狀態</div>
      </v-alert>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search For Recipient"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="orders" :search="search">
      <template v-slot:[`item.orderItems`]="{ item }">
        <v-row class="my-4" v-for="(value, key) in item.orderItems" :key="key">
          {{ key + " : " + value }}
        </v-row>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          class="py-3 my-4 status"
          :color="getColor(item.status)"
          label
          x-small
          dark
          @click="
            openAlert(item.status);
            openDialog(item.id, item.status);
          "
        >
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>
    <v-card-actions>
      <v-dialog v-model="showAlert">
        <template>
          <v-alert type="error" class="mb-0"
            >This order has already been "RECEIVED".</v-alert
          >
        </template>
      </v-dialog>
      <v-dialog v-model="isOpenDialog" max-width="600px">
        <div class="text-center">
          <v-sheet
            class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
            color="blue-grey darken-3"
            dark
          >
            <div class="grey--text text--lighten-1 text-h5 mb-4">
              Are you sure to update the status of this order?
            </div>
            <div>目前訂單狀態</div>
            <div>
              <v-chip
                class="py-3 my-4"
                :color="getColor(previousStatus)"
                label
                default
                dark
              >
                {{ previousStatus }}
              </v-chip>
            </div>
            <div>下一個訂單狀態</div>
            <div>
              <v-chip
                class="py-3 my-4"
                :color="getColor(this.nextStatus)"
                label
                default
                dark
              >
                {{ this.nextStatus }}
              </v-chip>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="loading"
              class="ma-1"
              color="grey"
              plain
              @click="closeDialog"
            >
              Close
            </v-btn>
            <v-btn
              :loading="loading"
              class="ma-1"
              color="error"
              plain
              @click="updateItemConfirm"
            >
              Update
            </v-btn>
          </v-sheet>
        </div>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getVenderOrders } from "@/api/orderApi";
import { updateOrders } from "@/api/orderApi";

export default {
  data: () => ({
    search: "",
    showAlert: false,
    headers: [
      { text: "訂單編號", value: "id" },
      { text: "收件人", value: "recipientName" },
      { text: "購買商品 : 數量", value: "orderItems" },
      { text: "總金額", value: "totalPrice" },
      { text: "收件地址", value: "shippingAddress" },
      { text: "運費", value: "shippingFee" },
      { text: "運送狀態", value: "status" },
      { text: "付款方式", value: "paymentMethod" },
      { text: "下訂日期", value: "orderDate" },
      { text: "運送日期", value: "shippingDate" },
      { text: "抵達日期", value: "deliveryDate" },
    ],
    orders: [],
    loading: false,
    isOpenDialog: false,
    orderId: null,
    previousStatus: null,
    nextStatus: null,
  }),

  async mounted() {
    this.orders = await getVenderOrders(this.$store.state.userStore.id);
  },

  methods: {
    getColor(type) {
      if (type === "SHIPPING") return "pink";
      else if (type === "DELIVERED") return "orange";
      else if (type === "ORDER") return "blue";
      else return "green";
    },

    getUpperStatus(type) {
      if (type === "SHIPPING") return "DELIVERED";
      else if (type === "DELIVERED") return "RECEIVED";
      else if (type === "ORDER") return "SHIPPING";
    },

    openAlert(previousStatus) {
      if (previousStatus === "RECEIVED") {
        this.showAlert = true;
      }
    },

    openDialog(orderId, previousStatus) {
      if (previousStatus !== "RECEIVED") {
        this.isOpenDialog = true;
        this.orderId = orderId;
        this.previousStatus = previousStatus;
        this.nextStatus = this.getUpperStatus(previousStatus);
      }
    },

    async updateItemConfirm() {
      this.loading = true;
      await updateOrders(this.orderId, this.nextStatus);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.loading = false;
      await this.refresh();
      this.closeDialog();
    },

    closeDialog() {
      this.isOpenDialog = false;
    },

    async refresh() {
      this.orders = await getVenderOrders(this.$store.state.userStore.id);
    },
  },
};
</script>

<style>
.status {
  transition: 500ms;
  position: relative;
  overflow: hidden;
}

.status:hover,
.status:active {
  transform: scaleY(1.05) scaleX(1.05);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}
</style>