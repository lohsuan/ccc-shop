<template>
  <div>
    <v-container class="d-flex flex-column justify-center align-center">
      <MyOrderContent />
    </v-container>
  </div>
</template>

<script>
import MyOrderContent from "../components/MyOrderContent";

export default {
  name: "Order",
  components: {
    MyOrderContent,
  },
};
</script>

<style></style>
