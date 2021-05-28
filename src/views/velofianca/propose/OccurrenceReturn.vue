<template>
  <v-app>
    <div style="background-color: #ececec; overflow: hidden !important">
      <v-breadcrumbs :items="itemsBreadcrumb" class="font-weight-bold py-1">
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>

      <v-card
        outlined
        elevation="0"
        width="auto"
        style="border-radius: 10px; overflow: hidden; min-height: 93vh"
        class="mx-3 mb-3 d-flex align-center"
      >
        <dialog-cancelar-proposta
          @closeDialog="objCancelarProposta.flDialogCancelarProposta = $event"
          v-bind:objCancelarProposta="objCancelarProposta"
        />

        <v-container class="h-100">
          <div class="w-100 h-100 d-flex align-center flex-column">
            <header style="height: 44px" class="d-flex align-center mr-auto">
              <router-link :to="'/proposta'">
                <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
              </router-link>
            </header>

            <div
              class="w-100 d-flex justify-center flex-column"
              style="height: 88%"
            >
              <img
                src="@/assets/images/ocurrence-return.svg"
                alt="Homem olhando para caderno assinatura"
                width="240px"
                class="d-block mx-auto"
              />

              <h2
                class="font-weight-medium text-light my-5 mx-auto text-center w-xs-100"
                style="font-size: 1.3rem"
              >
                {{ viewmessage }}
              </h2>

              <div class="d-lg-flex d-block  justify-center flex-column flex-sm-row">
                <v-col cols="12" sm="6" class="d-lg-flex d-block justify-sm-end py-0">
                  <v-btn
                    large
                    rounded
                    color="primary"
                    class="w-xs-100 text-none"
                    @click="$router.push('/dados-inquilino')"
                  >
                    <span class="px-3"> Adicionar corresponsáveis </span>
                  </v-btn>
                </v-col>

                <v-col cols="12" sm="6" class="py-0">
                  <v-btn
                    large
                    rounded
                    color="primary"
                    class="w-xs-100 text-none"
                    @click="$router.push('/attachment')"
                  >
                    <span class="px-10"> Anexar documentos </span>
                  </v-btn>
                </v-col>
              </div>
            </div>

            <div style="height: 44px" class="d-flex align-center ml-auto mt-5">
              <v-btn
                large
                rounded
                color="red"
                class="ml-auto"
                outlined
                @click="cancelarProposta"
              >
                <span class="text-none"> Cancelar proposta </span>
              </v-btn>
            </div>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import DialogCancelarProposta from "./dialogs/DialogCancelarProposta.vue";
import { getMessage } from "@/core/service/velo-fianca/ocurrencereturn.service.js";

export default {
  mounted() {
    getMessage(this.$route.params.id).then(
      ({ data }) => (this.viewmessage = data.return[0].description)
    );
  },

  data() {
    return {
      objCancelarProposta: {
        id: null,
        flDialogCancelarProposta: false,
      },
      viewmessage: null,
      itemsBreadcrumb: [
        {
          text: "Propostas",
          disabled: false,
          to: "/proposta",
        },
        {
          text: "Ocorrência Retorno",
          disabled: true,
          to: "/",
        },
      ],
    };
  },

  components: {
    DialogCancelarProposta,
  },

  methods: {
    cancelarProposta() {
      this.objCancelarProposta.flDialogCancelarProposta = true;
      this.objCancelarProposta.id = Number(this.$route.params.id);
    },
  },
};
</script>
