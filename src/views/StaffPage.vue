<template>
  <div>
    <v-container class="d-flex flex-column justify-center align-center">
      <StaffContent />
    </v-container>
  </div>
</template>

<script>
import StaffContent from "../components/StaffContent";

export default {
  name: "Staff",
  components: {
    StaffContent,
  },
};
</script>

<style></style>
