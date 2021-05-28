<template>
  <v-app>
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
        <header class="w-100 mx-auto">
          <div class="py-3 d-flex align-center w-100">
            <router-link to="/proposta" class="ml-5">
              <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
            </router-link>

            <StepperPropose
              :items="[
                'las la-building',
                'las la-user',
                'las la-box',
                'las la-home',
                'las la-list-alt',
              ]"
            />
          </div>
        </header>

        <div class="h-100 d-flex align-center justify-center">
          <div class="d-flex justify-center align-center flex-column">
            <img
              src="@/assets/images/signing-contract.svg"
              alt="Homem olhando para caderno assinatura"
              width="350px"
              class="d-block mx-auto"
            />

            <span class="text-h5 font-weight-bold text-light my-5">
              Aguardando assinatura do contrato da fiança
            </span>

            <div class="d-flex justify-center">
              <v-col class="d-flex justify-end">
                <v-btn @click="redirectSignature" large rounded color="primary">
                  <span class="text-none px-10"> Ver assinaturas </span>
                </v-btn>
              </v-col>

              <v-col class="d-flex justify-start">
                <v-btn
                  @click="$router.push('/proposta')"
                  large
                  rounded
                  color="primary"
                  outlined
                >
                  <span class="text-none px-3"> Voltar para propostas </span>
                </v-btn>
              </v-col>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import StepperPropose from "./StepperPropose.vue";
import { GET_SIGN_LINK, GET_HANDLE_STEP } from "@/core/store/core.module.js";
import { mapGetters } from "vuex";
export default {
  components: { StepperPropose },
  data() {
    return {
      itemsBreadcrumb: [
        {
          text: "Propostas",
          disabled: false,
          to: "/proposta",
        },
        {
          text: "Assinatura",
          disabled: true,
          to: "/",
        },
      ],
    };
  },

  methods: {
    redirectSignature() {
      window.open(this.getDocumentLink[0].link, "_blank");
    },
  },

  computed: {
    ...mapGetters(["getDocumentLink"]),
  },

  mounted() {
    this.$store.dispatch(GET_HANDLE_STEP, 5);

    this.$store.dispatch(GET_SIGN_LINK, {
      propose: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
    });
  },
};
</script>

<style></style>
