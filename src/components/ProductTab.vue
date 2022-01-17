<template>
  <v-data-table
    :headers="headers"
    :items="products"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>商品管理列表</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- new/edit product dialog -->
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Product
            </v-btn>
          </template>
          <!-- new/edit product card -->
          <v-form ref="form">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Product Name*"
                        :rules="productNameRules"
                        required
                        dense
                        prepend-icon="mdi-package-variant-closed"
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
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Price*"
                        :rules="priceRules"
                        required
                        dense
                        prepend-icon="mdi-currency-usd"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.stock"
                        label="Stock*"
                        :rules="stockRules"
                        required
                        dense
                        prepend-icon="mdi-counter"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="editedItem.warehouseAddress"
                        label="Warehouse Address*"
                        :rules="warehouseAddressRules"
                        required
                        dense
                        prepend-icon="mdi-map-marker"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                        :rules="descriptionRules"
                        dense
                        prepend-icon="mdi-note-edit"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="editedItem.pictureURL"
                        label="Picture URL"
                        :rules="pictureURLRules"
                        dense
                        prepend-icon="mdi-image"
                      ></v-text-field>
                    </v-col>
                  </v-row>
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
        <!-- end of new/edit product dialog -->

        <!-- delete product dialog -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <div class="text-center">
            <v-sheet
              class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
              color="blue-grey darken-3"
              dark
            >
              <div class="grey--text text--lighten-1 text-h5 mb-4">
                Are you sure to delete this product?
              </div>

              <v-btn
                :disabled="loading"
                class="ma-1"
                color="grey"
                plain
                @click="closeDelete"
              >
                Cancel
              </v-btn>

              <v-btn
                :loading="loading"
                class="ma-1"
                color="error"
                plain
                @click="deleteItemConfirm"
              >
                Delete
              </v-btn>
            </v-sheet>
          </div>
        </v-dialog>
        <!-- end of delete product dialog -->
      </v-toolbar>
    </template>

    <template v-slot:[`item.pictureURL`]="{ item }">
      <v-img class="img" height="90" width="150" :src="item.pictureURL"></v-img>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>

    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
  </v-data-table>
</template>

<script>
import { createProduct } from "@/api/productApi";
import { updateProduct } from "@/api/productApi";
import { deleteProduct } from "@/api/productApi";

export default {
  data: () => ({
    loading: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Picture", align: "start", sortable: false, value: "pictureURL" },
      { text: "Product Name", value: "name" },
      { text: "Category", value: "category" },
      { text: "Price", value: "price" },
      { text: "Stock", value: "stock" },
      { text: "Warehouse Address", value: "warehouseAddress" },
      { text: "Description", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    productNameRules: [(v) => !!v || "欄位不可留空"],
    categoryRules: [(v) => !!v || "欄位不可留空"],
    priceRules: [
      (v) => !!v || "欄位不可留空",
      (v) => /^\d+$/.test(v) || "價格只能包含數字",
    ],
    stockRules: [
      (v) => !!v || "欄位不可留空",
      (v) => /^\d+$/.test(v) || "庫存只能包含數字",
    ],
    warehouseAddressRules: [(v) => !!v || "欄位不可留空"],
    descriptionRules: [],
    pictureURLRules: [],
    products: [],
    editedIndex: -1,
    editedItem: {
      name: null,
      category: null,
      price: null,
      stock: null,
      warehouseAddress: null,
      description: null,
      pictureURL: null,
    },
    defaultItem: {
      name: null,
      category: "COMPUTER",
      price: null,
      stock: null,
      warehouseAddress: null,
      description: null,
      pictureURL: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Product" : "Edit Product";
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
    await this.$store.dispatch("productStore/loadAllProducts");
    this.products = this.$store.state.productStore.products.filter(
      (product) => {
        return (
          product.venderId === this.$store.state.userStore.id &&
          product.existFlag === true
        );
      }
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

    async refresh() {
      await this.$store.dispatch("productStore/loadAllProducts");
      this.products = this.$store.state.productStore.products.filter(
        (product) => {
          return (
            product.venderId === this.$store.state.userStore.id &&
            product.existFlag === true
          );
        }
      );
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.loading = true;
      await deleteProduct(this.products[this.editedIndex].id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.loading = false;
      await this.refresh();
      this.closeDelete();
    },

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
        Object.assign(this.products[this.editedIndex], this.editedItem);
        await updateProduct(
          this.editedItem.name,
          this.$store.state.userStore.id,
          category,
          this.editedItem.price,
          this.editedItem.stock,
          this.editedItem.warehouseAddress,
          this.editedItem.description,
          this.editedItem.pictureURL,
          this.editedItem.id
        );
      } else {
        await createProduct(
          this.editedItem.name,
          this.$store.state.userStore.id,
          category,
          this.editedItem.price,
          this.editedItem.stock,
          this.editedItem.warehouseAddress,
          this.editedItem.description,
          this.editedItem.pictureURL
        );
      }
      await this.refresh();
      this.close();
    },
  },
};
</script>

<style>
</style>