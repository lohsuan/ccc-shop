<template>
  <v-row class="text-center welcome-page mt-7" align="center">
    <v-col cols="4">
      <h1 class="font-weight-medium mt-5 text-center">
        <i>CCC Shop</i>
      </h1>
      <h5 class="font-weight-regular text-center">享受尊爵不凡的購物體驗</h5>
    </v-col>
    <v-col cols="8">
      <v-carousel
        cycle
        height="250"
        interval="6000"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        style="margin-right: 0px"
      >
        <v-carousel-item
          class="mr-10"
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Welcome",
  data: () => {
    return {
      items: [
        {
          src: "https://i.imgur.com/UWcwTvm.png",
          // src: "https://i.imgur.com/tdHQ8jC.png",
        },
        {
          src: "https://i.imgur.com/imJCVKW.png",
        },
        {
          src: "https://s.yimg.com/os/creatr-uploaded-images/2020-09/412dfe00-f77c-11ea-afdf-134045af78fd",
        },
        {
          src: "https://cdn2.ettoday.net/images/5953/5953731.jpg",
        },
        {
          src: "https://dlcdnwebimgs.asus.com/gain/c05b6491-6d2b-48f0-81f0-d268840208d6/",
        },
      ],
    };
  },
};
</script>

<style>
/* .welcome-page {
  background-color: aliceblue;
} */

.welcome-page h1 {
  color: rgb(243 222 76);
}

.welcome-page h5 {
  color: rgb(199 207 136);
}

.welcome-page {
  animation-duration: 3s;
  animation-name: slideIn;
  font-size: 200%;
}

@keyframes slideIn {
  from {
    margin-right: 50%;
    width: 300%;
  }

  75% {
    font-size: 300%;
    margin-right: 25%;
    width: 150%;
  }

  to {
    margin-right: 10%;
    width: 100%;
  }
}
</style>
