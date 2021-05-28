<template>
  <v-dialog
    v-model="objCancelarProposta.flDialogCancelarProposta"
    persistent
    max-width="550"
  >
    <v-card class="py-5 text-center">
      <i
        class="las la-exclamation-circle mx-auto"
        style="font-size: 8rem; color: #ff5252"
      ></i>

      <v-btn icon @click="fecharDialog" class="btnClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <div class="d-flex flex-column py-3">
        <h3 class="mx-auto">Cancelar esta proposta?</h3>
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
          color="error"
          rounded
          large
          @click="cancelarProposta"
        >
          <span class="px-6 text-none font-weight-regular white--text">
            Cancelar proposta
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { REMOVE_PROPOSE } from "@/core/store/velo-fianca/propose.module.js";
import { deletePropose } from "@/core/service/core.service.js";

export default {
  data() {
    return {
      loadingBtn: false,
    };
  },
  props: {
    objCancelarProposta: Object,
  },
  methods: {
    cancelarProposta() {
      this.loadingBtn = true;

      deletePropose(this.objCancelarProposta.id).then(() => {
        this.$store.dispatch(REMOVE_PROPOSE, this.objCancelarProposta.id);

        this.$toast.success("Proposta cancelada com sucesso!", {
          duration: 1000,
        });

        sessionStorage.clear();

        this.$route.path !== "/proposta"
          ? this.$router.push("/proposta")
          : false;

        this.loadingBtn = false;

        this.fecharDialog();
      });
    },

    fecharDialog() {
      this.$emit(
        "closeDialog",
        !this.objCancelarProposta.flDialogCancelarProposta
      );
    },
  },
};
</script>
