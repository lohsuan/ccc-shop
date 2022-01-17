<template>
  <v-container class="d-flex justify-center align-center">
    <div style="width: 1000px">
      <div class="text-h5 mx-10 my-10">基本資料</div>
      <AccountManagementTab />
    </div>
  </v-container>
</template>

<script>
import AccountManagementTab from "./AccountManagementTab";

export default {
  components: {
    AccountManagementTab,
  },
};
</script>

<style>
</style>