<template>
  <v-dialog v-model="dialog" persistent max-width="550">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="d-flex align-center justify-center"
        v-bind="attrs"
        v-on="on"
        small
        icon
      >
        <v-icon style="color: #333">mdi-delete</v-icon>
      </v-btn>
    </template>

    <v-card class="py-5 text-center">
      <i
        class="las la-exclamation-circle mx-auto"
        style="font-size: 8rem; color: #ff5252"
      ></i>

      <v-btn
        :disabled="loadingBtn"
        icon
        @click="dialog = false"
        class="btnClose"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <div class="d-flex flex-column py-3">
        <h3 class="mx-auto">Excluir este arquivo?</h3>
      </div>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          :disabled="loadingBtn"
          rounded
          color="grey"
          class="white--text"
          large
          @click="dialog = false"
        >
          <span class="px-14 text-capitalize font-weight-regular">Voltar</span>
        </v-btn>

        <v-btn
          :loading="loadingBtn"
          color="error"
          rounded
          large
          @click="removerArquivo"
        >
          <span class="px-6 text-none font-weight-regular white--text">
            Excluir arquivo
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { REMOVE_ATTACHMENT } from "@/core/store/velo-fianca/attachment.module.js";
import { GET_REMOVE_ATTACHMENT } from "@/core/store/velo-fianca/checkout.module.js";
import {
  deletePropertydocuments,
  deleteClientesPersonDocuments,
  deleteFiancaVeloPersonDocuments,
} from "@/core/service/velo-fianca/attachment.service";
import dropbox from "@/utils/dropbox";

export default {
  props: {
    anexo: Object,
    index: Number,
  },
  data() {
    return {
      dialog: false,
      loadingBtn: false,
    };
  },
  methods: {
    async removerArquivo() {
      try {
        const { id, idProposePersonDocuments } = this.anexo;
        this.loadingBtn = true;

        this.$route.name === "checkout-id"
          ? await deletePropertydocuments(id)
          : await deleteClientesPersonDocuments(id);

        const basePath =
          this.$route.name === "checkout-id" ? "/property" : "/person";

        await dropbox().filesDeleteV2({
          path: `${basePath}/${this.anexo.path}`,
        });

        if (this.$route.name === "attachment") {
          await deleteFiancaVeloPersonDocuments(idProposePersonDocuments);
        }

        this.$store.dispatch(GET_REMOVE_ATTACHMENT, {
          index: this.index,
        });
        this.$store.dispatch(REMOVE_ATTACHMENT, this.anexo);

        this.$toast.success("Arquivo excluido com sucesso!");
      } catch (error) {
        this.$toast.error(
          "Não foi possivel excluir o arquivo, tente novamente mais tarde"
        );

        console.log(error);
      }

      this.loadingBtn = false;
      this.dialog = false;
    },

    getNameFile() {
      const parts = this.anexo.link.split("/");

      const removeQueryParams = parts[parts.length - 1].split("?dl");

      return removeQueryParams[0];
    },
  },
};
</script>

<style></style>
