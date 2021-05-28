<template>
  <v-dialog persistent v-model="view" width="360">
    <v-card class="py-8 px-5">
      <v-card-text class="pa-0">
        <v-progress-circular
          indeterminate
          color="primary"
          class="d-block mx-auto"
          :size="40"
        ></v-progress-circular>

        <h2 class="mt-5 text-center">Sua proposta está sendo carregada...</h2>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    view: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
