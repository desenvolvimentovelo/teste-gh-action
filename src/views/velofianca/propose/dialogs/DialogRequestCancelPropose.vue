<template>
  <v-dialog
    v-model="objRequestCancelPropose.flDialogRequestCancelpropose"
    persistent
    max-width="550"
  >
    <v-card class="py-5 text-center">
      <i
        class="las la-exclamation-circle mx-auto"
        style="font-size: 8rem; color: #ff5252"
      ></i>

      <v-btn icon @click="fecharDialog()" class="btnClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <div class="d-flex flex-column py-3">
        <h3 class="mx-auto">Cancelar esta proposta?</h3>
        <h5 class="mx-auto text-light font-weight-medium">
          Seu pedido vai ser avaliado pela VELO
        </h5>
      </div>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          :disabled="loadingBtn"
          rounded
          color="grey"
          class="white--text"
          large
          @click="fecharDialog()"
        >
          <span class="px-16 text-capitalize font-weight-regular">Voltar</span>
        </v-btn>

        <v-btn
          :loading="loadingBtn"
          @click="requestCancelPropose"
          color="primary"
          rounded
          large
        >
          <span class="px-13 text-none font-weight-regular white--text">
            Confirmar
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { sendMail } from "@/core/service/core.service.js";

export default {
  data() {
    return {
      loadingBtn: false,
    };
  },

  props: {
    objRequestCancelPropose: Object,
  },

  methods: {
    requestCancelPropose() {
      this.loadingBtn = true;

      sendMail(2, this.objRequestCancelPropose.idPropose).then(() => {
        this.loadingBtn = false;
        this.fecharDialog();
      });
    },

    fecharDialog() {
      this.$emit(
        "closeDialog",
        !this.objRequestCancelPropose.flDialogRequestCancelpropose
      );
    },
  },
};
</script>
