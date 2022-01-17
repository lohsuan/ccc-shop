<template>
  <v-dialog v-model="isOpenDialog" width="500" persistent>
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title>
          <span class="text-h5 font-weight-bold">註冊</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="username"
                  label="使用者名稱*"
                  type="text"
                  :rules="usernameRules"
                  required
                  dense
                  prepend-icon="mdi-account-circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  label="密碼*"
                  type="password"
                  :rules="passwordRules"
                  required
                  dense
                  prepend-icon="mdi-lock"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="phone"
                  label="手機號碼*"
                  type="tel"
                  :rules="phoneRules"
                  required
                  dense
                  prepend-icon="mdi-cellphone"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="電子郵件*"
                  type="email"
                  :rules="emailRules"
                  required
                  dense
                  prepend-icon="mdi-email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="creditCard"
                  label="信用卡"
                  type="text"
                  :rules="creditCardRules"
                  dense
                  prepend-icon="mdi-credit-card"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="address"
                  label="住址"
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
            color="blue-grey"
            text
            @click="closeDialog()"
          >
            關閉
          </v-btn>
          <v-btn
            color="blue"
            text
            @click="signUpUser()"
            :disabled="!valid"
          >
            註冊
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>

    <v-snackbar
        v-model="isOpenSnackbar"
        :timeout="2000"
        color="green darken-2"
    >
      註冊成功
    </v-snackbar>
  </v-dialog>
</template>

<script>
import { createUser } from "@/api/userApi";

export default {
  name: "SignUpDialog",
  props: ["identity"],
  data: () => {
    return {
      isOpenDialog: false,
      isOpenSnackbar: false,
      valid: false,
      username: "",
      password: "",
      phone: "",
      email: "",
      creditCard: "",
      address: "",
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
    };
  },
  methods: {
    openDialog() {
      this.isOpenDialog = true;
    },
    closeDialog() {
      this.reset();
      this.isOpenDialog = false;
    },
    async signUpUser() {
      const result = await createUser(
        this.username,
        this.identity,
        this.password,
        this.phone,
        this.email,
        this.creditCard,
        this.address
      );

      if (!result.username) {
        // sign up failed
        return
      }
      this.isOpenSnackbar = true;
      setTimeout(() => {
        this.closeDialog();
        this.$emit("close");
      }, 2000);
    },
    reset() {
      this.$refs.form.reset();
    },
    validate() {
      this.$refs.form.validate();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
</style>