<template>
  <v-card
    elevation="0"
    class="mx-3"
    style="
      width: 220px;
      min-height: 291px;
      height: 97% !important;
      border-radius: 12px;
      border: 2px dashed #9e9e9e;
    "
  >
    <v-col align="center" class="h-100 d-flex align-center justify-center flex-column">
      <v-avatar size="100" class="mb-3">
        <img src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png" />
      </v-avatar>

      <h5 style="color: #707070">Nome</h5>

      <h5 class="grey--text font-weight-regular">Responsável</h5>

      <div class="pt-4">
        <DialogResponsavel :isEditModal="false" />
      </div>
    </v-col>
  </v-card>
</template>

<script>
import DialogResponsavel from "@/views/velofianca/propose/dialogs/DialogResponsavel";

export default {
  components: {
    DialogResponsavel,
  },
};
</script>

<style></style>
