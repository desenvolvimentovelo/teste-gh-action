<template>
  <v-dialog
    id="failurepayment"
    v-model="successpayment"
    persistent
    max-width="1000"
  >
    <v-card class="pb-6 pt-6">
      <v-card-text>
        <v-row justify="start" class="mt-6">
          <v-col cols="12" align="center" md>
            <v-img
              src="@/assets/images/payment-miss-step.svg"
              width="30%"
              min-heigth="200px"
              min-width="180px"
            />
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-8">
          <v-col align="center">
            <h1>
              <strong> {{ this.responseTitle }} </strong>
            </h1>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          class="subtitle-1 font-weight-medium mt-1 subtitle-dialog"
        >
          <v-col align="center">
            <span> {{ this.responsePhrase }} </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      responsePhrase: "",
      responseTitle: "",
      responseImg: "",
    };
  },
  computed: {
    ...mapGetters(["getCompleteViewPropose"]),
  },
  props: {
    successpayment: Boolean,
    loading: Boolean,
  },
  mounted() {},

  methods: {
    openDialog() {
      this.initialized();
      this.successpayment = true;
    },
    closeDialog() {
      this.successpayment = false;
    },

    initialized() {
      let customerView = this.getCompleteViewPropose;
      if ([1, 2, 3, 4, 5, 6].includes(parseInt(customerView.status))) {
        this.responseImg = "@/assets/images/payment-miss-step.svg";
        this.responseTitle = "Oops, ainda não está na hora do pagamento!";
        this.responsePhrase =
          "A proposta deve ser aprovada e o contrato assinado para o pagamento ser realizado," +
          "em caso de dúvidas, entre em telefone com o corretor responsável pela mesma.";
      } else if ([8, 9].includes(parseInt(customerView.status))) {
        this.responseImg = "@/assets/images/payment-confirmed.svg";
        this.responseTitle = "Está tudo certo!";
        this.responsePhrase =
          "A proposta já foi paga e está afiançada, obrigado por usar a VELO Garantia Locatícia.";
      } else if ([10].includes(parseInt(customerView.status))) {
        this.responseImg = "@/assets/images/payment-canceled.svg";
        this.responseTitle = "Ops, parece que houve um cancelamento!";
        this.responsePhrase =
          "Esta proposta foi cancelada, portanto não há pagamento a ser feito no momento," +
          "em caso de dúvidas entre em telefone com o corretor responsável pela mesma.";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.subtitle-dialog {
  padding: 0% 15% 0% 15%;
}
</style>
