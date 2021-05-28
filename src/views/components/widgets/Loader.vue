<template>
  <div v-if="getLoading" class="container-loader">
    <v-progress-circular
      :size="70"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getLoading"]),
  },
};
</script>

<style>
.container-loader {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #42424247;
  z-index: 3;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
