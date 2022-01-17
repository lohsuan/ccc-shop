<template>
  <v-container style="width: 1000px">
    <v-alert
      border="top"
      icon="mdi-shield-lock-outline"
      prominent
      text
      type="info"
      elevation="2"
      class="mx-10 mt-5"
    >
      <div class="text-body-2">小提醒</div>
      <div class="text-body-2">
        你選擇的「使用者名稱」將會被引用於網站上公開評價及相關連結，如果你不希望你的真實姓名被列入本平台，建議你選擇一個親切的暱稱使用。請放心，你的所有訊息、檔案及相關購買資料，網站將保障你的個人隱私！
      </div>
    </v-alert>
    <v-card flat class="mx-10">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="$store.state.userStore.username"
                label="使用者名稱"
                type="text"
                :rules="usernameRules"
                required
                prepend-icon="mdi-account-circle"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="$store.state.userStore.phone"
                label="手機號碼"
                type="tel"
                :rules="phoneRules"
                required
                prepend-icon="mdi-cellphone"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="$store.state.userStore.email"
                label="電子郵件"
                type="email"
                :rules="emailRules"
                required
                prepend-icon="mdi-email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="$store.state.userStore.creditCard"
                label="信用卡"
                type="text"
                :rules="creditCardRules"
                prepend-icon="mdi-credit-card"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="$store.state.userStore.address"
                label="住址"
                type="text"
                :rules="addressRules"
                prepend-icon="mdi-map-marker"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-3">
            <v-spacer></v-spacer>
            <!-- <v-btn class="mr-3" color="success" @click="onEdit">
            <v-icon left> mdi-pencil </v-icon>
            edit
          </v-btn> -->
            <v-btn color="primary" @click="save">
              <v-icon left> mdi-content-save-all </v-icon>
              SAVE
            </v-btn>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { updateUser } from "@/api/userApi";

export default {
  name: "AccountManagementPage",
  data: () => {
    return {
      // isEditDisabled: true,
      usernameRules: [
        (v) => !!v || "欄位不可留空",
        (v) => /^[A-Za-z0-9]+$/.test(v) || "使用者名稱只能有英文字母或數字",
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
    };
  },
  methods: {
    onEdit() {
      // this.isEditDisabled = false;
    },
    save() {
      // this.isEditDisabled = true;
      updateUser(
        this.$store.state.userStore.id,
        this.$store.state.userStore.username,
        "2",
        this.$store.state.userStore.phone,
        this.$store.state.userStore.email,
        this.$store.state.userStore.creditCard,
        this.$store.state.userStore.address
      );
      sessionStorage.setItem("id", this.$store.state.userStore.id);
      sessionStorage.setItem("username", this.$store.state.userStore.username);
      sessionStorage.setItem("identity", this.$store.state.userStore.identity);
      sessionStorage.setItem("phone", this.$store.state.userStore.phone);
      sessionStorage.setItem("email", this.$store.state.userStore.email);
      sessionStorage.setItem(
        "creditCard",
        this.$store.state.userStore.creditCard
      );
      sessionStorage.setItem("address", this.$store.state.userStore.address);
    },
  },
};
</script>

<style>
</style>