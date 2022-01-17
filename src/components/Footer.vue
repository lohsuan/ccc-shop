<template>
  <v-footer dark padless>
    <v-card flat tile class="indigo lighten-1 white--text text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <a href="/" style="color: inherit; text-decoration: none;">
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </a>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        This shopping platform is designed and developed by NTUT CCC-Shop,
        which is a project for Database Systems course in NTUT.
        All information and data from this platform are only for educational usages.
        If you are interested or this project provides you some support or inspiration,
        you can check out our source code
        <a
            href="https://github.com/CCC-Shop"
            target="_blank"
            style="text-decoration: underline;
            color: inherit;"
        >here</a>.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        Copyright© <strong>CCC Shop</strong> — {{ currentYear }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
};
</script>

<style>
</style>