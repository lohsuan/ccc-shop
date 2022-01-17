<template>
  <div>
    <v-container class="d-flex flex-column justify-center align-center">
      <MyAccountContent />
    </v-container>
  </div>
</template>

<script>
import MyAccountContent from "../components/MyAccountContent";

export default {
  name: "Account",
  components: {
    MyAccountContent,
  },
};
</script>

<style></style>
