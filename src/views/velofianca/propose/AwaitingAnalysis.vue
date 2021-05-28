<template>
  <v-app style="background-color: #ececec">
    <div
      class="h-100 pb-3"
      style="background-color: #ececec; overflow: hidden !important"
    >
      <v-breadcrumbs :items="itemsBreadcrumb" class="font-weight-bold py-1">
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>

      <v-card
        outlined
        elevation="0"
        width="auto"
        style="
          border-radius: 10px;
          overflow: hidden;
          height: calc(100% - 29px) !important;
        "
        class="mx-3 px-14 d-flex align-center flex-column"
      >
        <v-container class="px-sm-10 py-6 h-100 d-flex flex-column">
          <div class="py-5 w-100 d-flex align-center">
            <StepperPropose
              :items="['las la-paperclip', 'las la-user-clock', 'las la-check']"
            />
          </div>

          <v-col
            class="d-flex align-center justify-center flex-column pa-0"
            style="height: 91%"
          >
            <img
              src="@/assets/images/awaitign-analyse.svg"
              alt="Mulher olhando para folha sendo analizada"
              class="d-block w-xs-100 mx-auto"
              width="25%"
            />

            <div class="my-5 d-flex flex-column text-center">
              <span class="text-h5 w-xs-100 w-sm-100">
                <span class="font-weight-medium">
                  Sua proposta está com a equipe de
                </span>
                <strong>Análise Humanizada.</strong>
              </span>

              <span class="text-light subtitle-1 mt-2">
                Estamos processando as informações e dentro de alguns minutos
                estaremos atualizando o seu status.
              </span>
            </div>

            <v-btn
              @click="redirect"
              color="primary"
              rounded
              large
              class="w-xs-100"
            >
              <span class="text-none px-3">Voltar para propostas</span>
            </v-btn>
          </v-col>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import StepperPropose from "./StepperPropose.vue";
import { GET_HANDLE_STEP } from "@/core/store/core.module.js";

export default {
  components: { StepperPropose },

  mounted() {
    this.$store.dispatch(GET_HANDLE_STEP, 2);
  },

  data() {
    return {
      itemsBreadcrumb: [
        {
          text: "Anexar Documentos",
          disabled: true,
          to: "/",
        },
        {
          text: "Aguardando Análise",
          disabled: true,
          to: "/",
        },
      ],
    };
  },

  methods: {
    redirect() {
      this.$router.push("/proposta");
      sessionStorage.clear();
    },
  },
};
</script>

<style></style>
