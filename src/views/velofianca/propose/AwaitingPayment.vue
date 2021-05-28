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
        style="border-radius: 10px; min-height: 93vh"
        class="mx-3 mb-3"
      >
        <v-container class="h-100">
          <v-row class="d-flex align-center">
            <div class="py-10 mx-auto w-100 d-flex align-center">
              <router-link
                to="/proposta"
                class="d-flex align-center text-decoration-none"
              >
                <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
              </router-link>

              <StepperPropose
                :items="['las la-user', 'las la-home', 'las la-list-alt']"
              />
            </div>
          </v-row>

          <v-row class="part-down d-flex flex-sm-row-reverse">
            <v-col cols="12" sm="6" class="d-flex justify-center align-center">
              <img
                src="@/assets/images/awaiting-payment.svg"
                alt="Homem olhando para caderno assinatura"
                width="95%"
                class="d-block mx-auto"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
              class="d-flex align-center justify-center flex-column"
            >
              <h3
                class="text-esq w-xs-100 w-sm-100 text-light font-weight-medium my-7 text-center"
              >
                Aguardando pagamento do Afiançamento VELO
              </h3>

              <v-btn
                x-large
                rounded
                color="primary"
                class="d-block mx-auto"
                @click="getLink"
                id="btnPayment"
              >
                <span class="text-capitalize"> Copiar link de pagamento </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import StepperPropose from "./StepperPropose.vue";
import { GET_HANDLE_STEP } from "@/core/store/core.module.js";
import { getPaymentLink } from "@/core/service/velo-pagamento/velopayment.service.js";
import swal from "sweetalert";

export default {
  components: { StepperPropose },

  async mounted() {
    this.$store.dispatch(GET_HANDLE_STEP, 3);
  },

  data() {
    return {
      itemsBreadcrumb: [
        {
          text: "Propostas",
          disabled: false,
          to: "/proposta",
        },
        {
          text: "Aguardando pagamento",
          disabled: true,
          to: "/",
        },
      ],
    };
  },
  methods: {
    async getLink() {
      await getPaymentLink({
        propose: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
      }).then(() => {
        swal(
          "Copiado com sucesso",
          "Link de pagamento copiado para a área de transferência"
        );
      });
    },
  },
};
</script>

<style scoped lang="scss">
.part-down {
  height: 88%;
}

.text-esq {
  width: 60%;
}
</style>
