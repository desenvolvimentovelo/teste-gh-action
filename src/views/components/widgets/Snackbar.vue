<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" :vertical="vertical">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="closeSnackbar()">
          Confirmar
        </v-btn>

        <v-btn color="red" text v-bind="attrs" @click="closeSnackbar()"> Cancelar </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "v-snack",
  props: {
    getCloseSnackbar: Boolean,
  },
  data: () => ({
    text: "Deseja salvar este anexo?",
    vertical: true,
  }),
  methods: {
    closeSnackbar() {
      this.$emit("closeSnackbar", !this.getCloseSnackbar);
    },
  },
};
</script>

<style></style>
