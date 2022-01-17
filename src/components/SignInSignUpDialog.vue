<template>
  <div>
    <v-dialog v-model="isOpenDialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> 登入 / 註冊 </v-card-title>

        <v-divider></v-divider>

        <v-card-text style="padding: 0px">
          <v-carousel
            :show-arrows="false"
            cycle
            height="250"
            interval="4000"
            hide-delimiter-background
            show-arrows-on-hover
            delimiter-icon="mdi-minus"
            style="padding: 0px"
          >
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
          </v-carousel>
        </v-card-text>

        <v-card-actions>
          <v-row justify="center" style="margin: 0px">
            <v-btn
              color="primary"
              text
              @click="$refs.signUpDialog.openDialog()"
            >
              註冊帳號
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="$refs.signInDialog.openDialog()"
            >
              登入帳號
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <SignUpDialog
      ref="signUpDialog"
      identity="2"
      @close="isOpenDialog = false"
    />
    <SignInDialog ref="signInDialog" @close="isOpenDialog = false" />
  </div>
</template>

<script>
import SignUpDialog from "./SignUpDialog";
import SignInDialog from "./SignInDialog";

export default {
  name: "SignInSignUpDialog",
  components: {
    SignUpDialog,
    SignInDialog,

  },
  data: () => {
    return {
      isOpenDialog: false,
      items: [
        {
          src: "https://techsaydigi.com/wp-content/uploads/2021/10/c5482f525b8615658cc1a33d35ce0fed.jpg",
        },
        {
          src: "https://img.global.news.samsung.com/tw/wp-content/uploads/2021/08/Z-Flip3_Z-Fold3-Design-Story_main1.jpg",
        },
        {
          src: "https://s1.eestatic.com/2021/08/11/elandroidelibre/otros-dispositivos/otros/603451433_200321239_1706x960.jpg",
        },
        {
          src: "https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_14-16-inch_10182021_big.jpg.slideshow-xlarge_2x.jpg",
        },
        {
          src: "https://s.yimg.com/os/creatr-uploaded-images/2020-09/412dfe00-f77c-11ea-afdf-134045af78fd",
        },
      ],
    };
  },
  methods: {
    openDialog() {
      this.isOpenDialog = true;
    },
  },
};
</script>