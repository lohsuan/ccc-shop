<template>
  <v-dialog v-model="isOpenDialog" width="500" persistent>
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title>
          <span class="text-h5 font-weight-bold">登入</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="username"
                    label="使用者名稱"
                    type="text"
                    :rules="usernameRules"
                    required
                    prepend-icon="mdi-account-circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="password"
                    label="密碼"
                    :rules="passwordRules"
                    type="password"
                    required
                    prepend-icon="mdi-lock"
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
          <v-btn color="blue" text @click="signInUser()" :disabled="!valid">
            登入
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>

    <v-snackbar
        v-model="isOpenSnackbar"
        :timeout="2000"
        color="red"
    >
      登入失敗，帳號或密碼錯誤
    </v-snackbar>
  </v-dialog>
</template>

<script>
export default {
  name: "SignInDialog",
  data: () => {
    return {
      isOpenDialog: false,
      isOpenSnackbar: false,
      valid: false,
      username: "",
      password: "",
      usernameRules: [
        (v) => !!v || "欄位不可留空",
        (v) => /^[A-Za-z0-9]+$/.test(v) || "使用者名稱只能有英文字母或數字",
      ],
      passwordRules: [
        (v) => !!v || "欄位不可留空",
        (v) => (v && v.length >= 6) || "密碼至少需有 6 個字元",
      ],
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
    async signInUser() {
      await this.$store.dispatch("userStore/loginUser", {
        username: this.username,
        password: this.password,
      });

      if (this.$store.state.userStore.isLogin) {
        this.closeDialog();
        this.$emit("close");
        location.reload();
      } else {
        this.reset();
        this.isOpenSnackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>