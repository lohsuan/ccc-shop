<template>
  <v-dialog
      v-model="isOpenDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar
          dark
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="closeDialog()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>訂單確認</v-toolbar-title>
      </v-toolbar>

      <!-- shopping cart items list -->
      <v-list three-line subheader>
        <v-subheader class="subtitle-1 ma-4">訂單內容</v-subheader>

        <v-list-item v-for="product in products" :key="product.id" class="mx-2 my-4">
          <v-img
              max-height="150"
              max-width="150"
              :src="product.pictureURL"
          ></v-img>
          <v-list-item-content class="ml-6">
            <v-list-item-title>{{ product.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ getProductPriceText(product) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="ma-4">
          <v-img
              max-height="200"
              max-width="150"
              src="https://images.twgreatdaily.com/images/elastic/D8g/D8gfW3cBDlXMa8eqBJBF.jpg"
              v-if="accelerateShippingSwitch"
          />
          <v-img
              max-height="200"
              max-width="150"
              src="http://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/5669285/0/637600552353230000?v=1"
              v-else
          />
          <v-list-item-content class="ml-6">
            <v-list-item-title>{{ accelerateShippingSwitch ? "頭文字 D 飆速宅配" : "普通宅配" }}</v-list-item-title>
            <v-list-item-subtitle>$ {{ shippingPrice }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-switch
              v-model="accelerateShippingSwitch"
              label="切換宅配服務"
          ></v-switch>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <!-- payment settings -->
      <v-list three-line subheader>
        <v-subheader class="subtitle-1 ma-4">付款詳情</v-subheader>

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-list-item>
                <v-icon large>mdi-ticket-percent</v-icon>
                <v-list-item-content class="ml-6">
                  <v-list-item-title>使用折扣</v-list-item-title>
                  <v-list-item-subtitle>{{ discountInfo }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="d-flex flex-column justify-start align-start ml-4 my-2">
                <v-select
                    v-model="selectedShippingDiscount"
                    :items="shippingDiscounts"
                    :disabled="shippingDiscounts.length === 0"
                    item-text="policyDescription"
                    label="運費折抵"
                    return-object
                    dense
                    outlined
                    clearable
                ></v-select>
                <v-select
                    v-model="selectedSeasoningDiscount"
                    :items="seasoningDiscounts"
                    :disabled="seasoningDiscounts.length === 0"
                    item-text="policyDescription"
                    label="季節性優惠"
                    return-object
                    dense
                    outlined
                    clearable
                ></v-select>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-list-item>
                <v-icon large>mdi-credit-card</v-icon>
                <v-list-item-content class="ml-6">
                  <v-list-item-title>付款方式</v-list-item-title>
                  <v-list-item-subtitle>{{ paymentInfo }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="ml-6">
              <v-radio-group v-model="paymentMethodIndex" row>
                <v-radio
                    v-for="(item, index) in paymentMethods"
                    :key="index"
                    :label="item"
                    :value="index"
                ></v-radio>
              </v-radio-group>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-list-item>
                <v-icon large>mdi-truck-delivery</v-icon>
                <v-list-item-content class="ml-6">
                  <v-list-item-title>寄送地址</v-list-item-title>
                  <v-list-item-subtitle>{{ address }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="ml-6">
              <v-radio-group v-model="useDefaultAddress" row>
                <v-radio label="使用預設地址" :value="true"></v-radio>
                <v-radio label="自訂地址" :value="false"></v-radio>
              </v-radio-group>
              <v-text-field
                  v-model="inputAddress"
                  v-if="!useDefaultAddress"
                  label="自訂地址"
                  solo
              ></v-text-field>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list>

      <!-- price and send order button -->
      <v-list subheader class="px-8 py-4">
        <v-list-item>
          <v-icon large>mdi-currency-usd</v-icon>
          <v-list-item-content class="ml-6">
            <v-list-item-title class="d-flex flex-row justify-space-between align-center">
              <div class="text-subtitle-1">總金額: $ {{ totalPrice }}</div>
              <v-btn
                  color="cyan"
                  class="white--text ma-5"
                  @click="sendOrder()"
              >
                結帳
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- snackbar -->
      <v-snackbar
          v-model="isShowSnackbar"
          :timeout="2000"
          color="red"
      >
        訂單資料不完整！
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>

<script>
import {createOrder} from "../api/orderApi"

export default {
  name: "SendOrderDialog",
  props: ["vender"],
  data: () => {
    return {
      products: [],
      accelerateShippingSwitch: false,
      paymentMethodIndex: 0,
      paymentMethods: ["貨到付款", "信用卡", "電信支付"],
      useDefaultAddress: true,
      inputAddress: "",
      isOpenDialog: false,
      isShowSnackbar: false,
      selectedShippingDiscount: null,
      selectedSeasoningDiscount: null,
    }
  },
  computed: {
    shippingPrice() {
      if (this.selectedShippingDiscount) return 0
      return this.accelerateShippingSwitch ? 2022 : 111
    },
    discountInfo() {
      const shippingDiscountText = this.selectedShippingDiscount ? `運費折抵 -${this.shippingPrice}` : "運費折抵: 無"
      const seasoningDiscountText = this.selectedSeasoningDiscount ? `季節性優惠 x${this.selectedSeasoningDiscount.discountRate * 100}%` : "季節性優惠: 無"
      return `${shippingDiscountText}, ${seasoningDiscountText}`
    },
    paymentInfo() {
      let paymentInfo = this.paymentMethods[this.paymentMethodIndex]
      if (this.paymentMethodIndex === 1) {
        if (!this.$store.state.userStore.creditCard) return "請先設定信用卡號"
        paymentInfo += ": " + this.$store.state.userStore.creditCard
      }
      return paymentInfo
    },
    address() {
      return this.useDefaultAddress ? this.$store.state.userStore.address : this.inputAddress.trim()
    },
    totalPrice() {
      let totalPrice = this.$store.getters["shoppingCartStore/getShopTotalPrice"](this.vender)
      // for (const product of this.products) {
      //   const discountRate = this.$store.getters["discountStore/getProductSpecialDiscountRate"](this.vender, product.category)
      //   totalPrice += Math.round(product.price * product.quantity * discountRate)
      // }
      if (this.selectedSeasoningDiscount) totalPrice = Math.round(totalPrice * this.selectedSeasoningDiscount.discountRate)
      return totalPrice + this.shippingPrice
    },
    shippingDiscounts() {
      const totalPrice = this.$store.getters["shoppingCartStore/getShopTotalPrice"](this.vender)
      return this.$store.getters["discountStore/getVenderShippingDiscount"](this.vender).filter(discount => totalPrice >= discount.targetPrice)
    },
    seasoningDiscounts() {
      return this.$store.getters["discountStore/getVenderSeasoningDiscount"](this.vender)
    }
  },
  methods: {
    openDialog() {
      this.isOpenDialog = true
      this.products = this.$store.getters["shoppingCartStore/getSelectedVenderProducts"](this.vender)
    },
    closeDialog() {
      this.isOpenDialog = false
    },
    getProductPriceText(product) {
      const discountRate = this.$store.getters["discountStore/getProductSpecialDiscountRate"](this.vender, product.category)
      return `${product.price * discountRate} x ${product.quantity} = ${product.price * product.quantity * discountRate}`
    },
    checkOrderInformation() {
      if (this.selectedShippingDiscount && (this.totalPrice < this.selectedShippingDiscount.targetPrice)) return false
      if (!this.address) return false
      if (this.paymentMethodIndex === 1 && !this.$store.state.userStore.creditCard.trim()) return false
      return true
    },
    sendOrder() {
      if (!this.checkOrderInformation()) {
        this.isShowSnackbar = true
        return
      }

      const orderItems = {}
      for (const product of this.products) {
        orderItems[product.id.toString()] = product.quantity
      }

      const orderData = {
        customerId: this.$store.state.userStore.id,
        shippingFee: this.shippingPrice,
        recipientName: this.$store.state.userStore.username,
        shippingAddress: this.address,
        paymentMethod: this.paymentMethodIndex,
        creditCardId: this.$store.state.userStore.creditCard,
        shippingDiscountCode: this.selectedShippingDiscount ? this.selectedShippingDiscount.discountCode : null,
        seasoningDiscountCode: this.selectedShippingDiscount ? this.selectedSeasoningDiscount.discountCode : null,
        totalPrice: this.totalPrice,
        orderItems: orderItems
      }

      createOrder(orderData)
      location.reload()
      this.isOpenDialog = false
    }
  }
}
</script>
