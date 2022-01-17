<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="username"
    class="elevation-5 my-5"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>人員管理列表</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- new/edit item dialog -->
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="info mr-5" dark v-bind="attrs" v-on="on">
              New User
            </v-btn>
          </template>
          <!-- new/edit item card -->
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
                        v-model="editedItem.username"
                        label="Username*"
                        type="text"
                        :rules="usernameRules"
                        required
                        dense
                        prepend-icon="mdi-account-circle"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="editedItem.identity"
                        label="Identity*"
                        :items="['ADMIN', 'STAFF', 'CUSTOMER']"
                        required
                        dense
                        prepend-icon="mdi-account-group"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" v-if="editedIndex === -1">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password*"
                        type="password"
                        :rules="passwordRules"
                        required
                        dense
                        prepend-icon="mdi-lock"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email*"
                        type="email"
                        :rules="emailRules"
                        required
                        dense
                        prepend-icon="mdi-email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Phone number*"
                        type="tel"
                        :rules="phoneRules"
                        required
                        dense
                        prepend-icon="mdi-cellphone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.creditCard"
                        label="Credit card"
                        type="text"
                        :rules="creditCardRules"
                        dense
                        prepend-icon="mdi-credit-card"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.address"
                        label="Address"
                        type="text"
                        :rules="addressRules"
                        dense
                        prepend-icon="mdi-map-marker"
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
        <!-- end of new/edit item dialog -->

        <!-- delete item dialog -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <div class="text-center">
            <v-sheet
              class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
              color="blue-grey darken-3"
              dark
            >
              <div class="grey--text text--lighten-1 text-h5 mb-4">
                Are you sure to delete this user?
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
        <!-- end of delete item dialog -->
      </v-toolbar>
    </template>
    <template v-slot:[`item.identity`]="{ item }">
      <v-chip
        class="py-3 my-4"
        :color="getColor(item.identity)"
        label
        x-small
        dark
      >
        {{ item.identity }}
      </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>

    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
  </v-data-table>
</template>

<script>
import { createUser } from "@/api/userApi";
import { updateUser } from "@/api/userApi";
import { deleteUser } from "@/api/userApi";
import { getAllUser } from "@/api/userApi";

export default {
  data: () => ({
    loading: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Username", align: "start", value: "username" },
      { text: "Identity", value: "identity" },
      { text: "Email", value: "email" },
      { text: "Phone", value: "phone" },
      { text: "Credit card", value: "creditCard" },
      { text: "Address", value: "address" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    usernameRules: [
      (v) => !!v || "欄位不可留空",
      (v) => /^[A-Za-z0-9]+$/.test(v) || "使用者名稱只能有英文字母或數字",
    ],
    passwordRules: [
      (v) => !!v || "欄位不可留空",
      (v) => (v && v.length >= 6) || "密碼至少需有 6 個字元",
    ],
    phoneRules: [
      (v) => !!v || "欄位不可留空",
      (v) => /^\d+$/.test(v) || "電話只能包含數字",
    ],
    emailRules: [
      (v) => !!v || "欄位不可留空",
      (v) =>
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          v
        ) || "電子郵件格式不符",
    ],
    creditCardRules: [],
    addressRules: [],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: -1,
      username: null,
      identity: null,
      password: null,
      email: null,
      phone: null,
      creditCard: null,
      address: null,
    },
    defaultItem: {
      id: -1,
      username: null,
      identity: "CUSTOMER",
      password: null,
      email: null,
      phone: null,
      creditCard: null,
      address: null,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
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
    this.users = await getAllUser();
  },
  methods: {
    getColor(identity) {
      if (identity === "ADMIN") return "pink";
      else if (identity === "STAFF") return "orange";
      else return "green";
    },
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
      this.users = await getAllUser();
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.loading = true;
      await deleteUser(this.users[this.editedIndex].id);
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
      const identities = ["ADMIN", "STAFF", "CUSTOMER"];
      let identity = identities.indexOf(this.editedItem.identity).toString();

      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
        await updateUser(
          this.editedItem.id,
          this.editedItem.username,
          identity,
          this.editedItem.phone,
          this.editedItem.email,
          this.editedItem.creditCard,
          this.editedItem.address
        );
      } else {
        await createUser(
          this.editedItem.username,
          identity,
          this.editedItem.password,
          this.editedItem.phone,
          this.editedItem.email,
          this.editedItem.creditCard,
          this.editedItem.address
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