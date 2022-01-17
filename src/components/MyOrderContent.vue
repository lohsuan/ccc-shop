<template>
  <v-card>
    <v-card-title>
      訂單列表
      <v-alert text type="info" elevation="2" class="mx-10">
        <div class="text-body-2">
          點擊訂單中之「購買商品」，可給出屬於你的專屬評價
        </div>
      </v-alert>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="orders" :search="search">

      <template v-slot:[`item.orderItems`]="{ item }">
        <v-row
          class="my-4 px-2 py-1 order"
          v-for="(value, key) in item.orderItems"
          :key="key"
          @click="$refs.giveValuationDialog.openDialog(key)"
        >
          {{ key + " : " + value }}
        </v-row>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          class="py-3 my-4"
          :color="getColor(item.status)"
          label
          x-small
          dark
        >
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>
    <GiveValuationDialog ref="giveValuationDialog" />
  </v-card>
</template>

<script>
import { getCustomerOrders } from "@/api/orderApi";
import GiveValuationDialog from "./GiveValuationDialog";

export default {
  components: {
    GiveValuationDialog,
  },
  data: () => ({
    // loading: false,
    // dialogDelete: false,
    search: "",
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
      // { text: "Actions", value: "actions", sortable: false },
    ],
    orders: [],
    // editedIndex: -1,
    // editedItem: {
    //   id: -1,
    //   username: null,
    //   identity: null,
    //   password: null,
    //   email: null,
    //   phone: null,
    //   creditCard: null,
    //   address: null,
    // },
  }),
  // watch: {
  //   dialogDelete(val) {
  //     val || this.closeDelete();
  //   },
  // },
  async mounted() {
    this.orders = await getCustomerOrders(sessionStorage.getItem("id"));
    // console.log(this.orders);
  },
  methods: {
    // deleteItem(item) {
    //   this.editedIndex = this.orders.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialogDelete = true;
    // },
    // async deleteItemConfirm() {
    //   this.loading = true;
    //   updateOrders(this.orders[this.editedIndex].id);
    //   this.orders.splice(this.editedIndex, 1);
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   this.loading = false;
    //   this.closeDelete();
    // },
    // closeDelete() {
    //   this.dialogDelete = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   });
    // },
    getColor(type) {
      if (type === "SHIPPING") return "pink";
      else if (type === "DELIVERED") return "orange";
      else if (type === "ORDER") return "blue";
      else return "green";
    },
    // getProductName(id) {
    //   var product = getProduct(id);
    //   console.log(product);
    //   var promise = Promise.resolve(product);
    //   promise.then(function (p) {
    //     console.log(p.name);
    //     return p.name;
    //   });
    //   return product.name;
    // },
  },
};
</script>

<style>
.order {
  background-color: rgb(173 204 255);
  border-radius: 13px;
}

.order:hover {
  background-color: rgb(69 146 253);
  border-radius: 13px;
}

.order {
  transition: 500ms;
  position: relative;
  overflow: hidden;
}

.order:hover,
.order:active {
  transform: scaleY(1.05) scaleX(1.05);
  box-shadow: 0 140px 98px rgba(0, 0, 0, 0.25), 0 0px 60px rgba(0, 0, 0, 0.22);
}
</style>