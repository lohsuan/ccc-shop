<template>
  <v-card
      class="ma-8 py-4"
      @click="$refs.productInfoDialog.openDialog()"
  >
    <v-list-item class="ma-4">
      <v-img max-height="150" max-width="150" :src="product.pictureURL"/>
      <v-list-item-content class="ml-6">
        <v-list-item-title class="font-weight-bold my-2">{{
            product.name
          }}
        </v-list-item-title>
        <v-list-item-subtitle>{{
            product.category
          }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-spacer></v-spacer>
      <v-list-item-action-text>
        剩餘數量: {{ product.stock }}
      </v-list-item-action-text>
      <v-list-item-action>
        <h6 class="text-subtitle-1">$ {{ product.price }}</h6>
      </v-list-item-action>
    </v-list-item>

    <ProductInfoDialog
        ref="productInfoDialog"
        :product="product"
    />
  </v-card>
</template>

<script>
import ProductInfoDialog from "../components/ProductInfoDialog";

export default {
  name: "SearchResultProductCard",
  components: {
    ProductInfoDialog
  },
  props: ["product"]
}
</script>