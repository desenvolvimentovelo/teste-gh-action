<template>
  <v-app>
    <v-card elevation="0">
      <v-container class="d-flex align-center h-100 py-0">
        <v-row class="h-100 d-flex align-center">
          <v-col
            cols="12"
            lg="6"
            class="pb-0 d-none d-lg-flex row-esq-desktop flex-column py-0 pt-5"
          >
            <v-col>
              <card-desktop :flag="flag" :cardInfos="inputsValue" />
            </v-col>

            <v-col class="d-flex align-end">
              <img
                src="@/assets/images/payment-guy-right.svg"
                alt="Guy Payment"
                width="167px"
                id="guy-payment"
              />
            </v-col>
          </v-col>

          <v-col
            cols="12"
            lg="6"
            class="d-flex align-center justify-center py-0"
          >
            <v-col style="height: auto" class="pa-0">
              <v-row class="w-100 mx-auto">
                <v-col class="pa-0">
                  <h2
                    class="grey--text text--darken-2 text-lg-center mb-10 mb-lg-0 text-h6 text-left font-weight-regular"
                  >
                    Olá
                    <span class="font-weight-bold grey--text text--darken-3">
                      Hannah,
                    </span>
                    realize o pagamento dos valores previamente apresentados
                  </h2>
                </v-col>
              </v-row>

              <v-row class="mx-auto">
                <v-col align="start" class="pa-0">
                  <h3 class="mt-4">Dados de pagamento</h3>
                </v-col>
              </v-row>

              <v-form ref="formCC" v-model="valid" lazy-validation>
                <v-row class="mt-6 w-100 mx-auto">
                  <v-col align="start" class="pa-0 mb-3">
                    <h5 class="input-label">Nome do titular</h5>
                    <v-text-field
                      v-model="inputsValue.name"
                      :rules="rules.holderRules"
                      dense
                      placeholder="Nome"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="w-100 mx-auto">
                  <v-col align="start" class="pa-0">
                    <h5 class="input-label">Número do cartão</h5>
                    <v-text-field
                      v-mask="['#### #### #### ####', '#### #### #### ####']"
                      v-model="inputsValue.numberCard"
                      :rules="rules.numberRules"
                      dense
                      placeholder="Número"
                      outlined
                      @change="changeNumberCard"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="w-100 mx-auto">
                  <v-col cols="4" class="pl-0">
                    <h5 class="input-label">Mês de expiração</h5>
                    <v-text-field
                      v-model="inputsValue.month"
                      :rules="rules.monthRules"
                      dense
                      placeholder="Mês"
                      outlined
                      v-mask="['##', '##']"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="4" align="start">
                    <h5 class="input-label">Ano de expiração</h5>
                    <v-text-field
                      v-model="inputsValue.year"
                      :rules="rules.yearRules"
                      dense
                      placeholder="Ano"
                      outlined
                      v-mask="['##', '##']"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="4" align="start" class="pr-0">
                    <h5 class="input-label">CVV</h5>
                    <v-text-field
                      v-model="inputsValue.cvv"
                      :rules="rules.cvvRules"
                      dense
                      placeholder="CVV"
                      outlined
                      v-mask="['###', '###']"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="w-100 mx-auto">
                  <v-col align="center" class="px-0">
                    <v-btn
                      class="mb-7 text-capitalize"
                      large
                      rounded
                      color="primary"
                      @click="completePayment"
                    >
                      <span class="px-14">Realizar Pagamento</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

              <v-row class="w-100 mx-auto" justify="space-between">
                <v-col class="pa-lg-0">
                  <v-card
                    class="d-flex align-center justify-center rounded-lg box-shadow-card"
                    width="75"
                    height="40"
                    elevation="0"
                  >
                    <img
                      src="@/assets/images/payment-flag-visa.svg"
                      width="65"
                      class="pa-2"
                    />
                  </v-card>
                </v-col>

                <v-col class="pa-lg-0">
                  <v-card
                    class="d-flex align-center justify-center rounded-lg box-shadow-card"
                    width="75"
                    height="40"
                    elevation="0"
                  >
                    <img
                      src="@/assets/images/payment-flag-master.svg"
                      width="65"
                      class="pa-2"
                    />
                  </v-card>
                </v-col>

                <v-col class="pa-lg-0">
                  <v-card
                    class="d-flex align-center justify-center rounded-lg box-shadow-card"
                    width="75"
                    height="40"
                    elevation="0"
                  >
                    <img
                      src="@/assets/images/payment-flag-elo.svg"
                      width="65"
                      class="pa-2"
                    />
                  </v-card>
                </v-col>

                <v-col class="pa-lg-0">
                  <v-card
                    class="d-flex align-center justify-center rounded-lg box-shadow-card"
                    width="75"
                    height="40"
                    elevation="0"
                  >
                    <img
                      src="@/assets/images/payment-flag-amex.svg"
                      width="65"
                      class="pa-2"
                    />
                  </v-card>
                </v-col>

                <v-col class="pa-lg-0">
                  <v-card
                    class="d-flex align-center justify-center rounded-lg box-shadow-card"
                    width="75"
                    height="40"
                    elevation="0"
                  >
                    <img
                      src="@/assets/images/payment-flag-hiper.svg"
                      width="65"
                      class="pa-2"
                    />
                  </v-card>
                </v-col>

                <v-col class="pa-lg-0">
                  <v-card
                    class="d-flex align-center justify-center rounded-lg box-shadow-card"
                    width="75"
                    height="40"
                    elevation="0"
                  >
                    <img
                      src="@/assets/images/payment-flag-discover.svg"
                      width="65"
                      class="pa-2"
                    />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import CardDesktop from "./vectors/CardDesktop.vue";
export default {
  components: { CardDesktop },
  data() {
    return {
      valid: false,
      flag: "Mastercard",
      inputsValue: {
        name: null,
        numberCard: null,
        year: null,
        month: null,
        cvv: null,
      },
      rules: {
        holderRules: [(v) => !!v || "Nome do titular precisa ser informado."],
        numberRules: [
          (v) => !!v || "O número do cartão precisa ser informado.",
        ],
        yearRules: [(v) => !!v || "O ano de expiração precisa ser informado."],
        monthRules: [
          (v) => !!v || "O mês de expiração precisa ser informado",
          (v) => (!!v && Number(v) >= 1 && Number(v) <= 12) || "Mês inválido",
        ],
        cvvRules: [(v) => !!v || "CVV precisa ser informado."],
      },
      itemsBreadcrumb: [
        {
          text: "Pagamento",
          disabled: false,
          to: "/payment",
        },
        {
          text: "Cartão de Crédito",
          disabled: true,
          to: "/",
        },
      ],
    };
  },

  filters: {
    transformText(value) {
      return value.toUpperCase();
    },
  },

  methods: {
    changeNumberCard(event) {
      let type = this.verifyTypeCC(event.replace(/\s/g, ""));

      this.handleFlagCard(type);
    },

    handleFlagCard(type) {
      switch (type) {
        case "Mastercard":
          this.flag = "Mastercard";
          break;

        case "Visa":
          this.flag = "Visa";
          break;

        case "Elo":
          this.flag = "Elo";
          break;

        case "Amex":
          this.flag = "Amex";
          break;

        case "Hipercard":
          this.flag = "Hipercard";
          break;

        case "Discover":
          this.flag = "Discover";
          break;

        default:
          break;
      }
    },

    verifyTypeCC(number) {
      let cartoes = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})/,
        Mastercard: /^5[1-5][0-9]{14}/,
        Amex: /^3[47][0-9]{13}/,
        Discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
        Hipercard: /^606282|^637095|^637599|^637568/,
        Elo: /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^504175|^627780|^63(6297|6368|6369)|(65003[5-9]|65004[0-9]|65005[01])|(65040[5-9]|6504[1-3][0-9])|(65048[5-9]|65049[0-9]|6505[0-2][0-9]|65053[0-8])|(65054[11111-9]|6505[5-8][0-9]|65059[0-8])|(65070[0-9]|65071[0-8])|(65072[0-7])|(65090[1-9]|6509[1-6][0-9]|65097[0-8])|(65165[2-9]|6516[67][0-9])|(65500[0-9]|65501[0-9])|(65502[1-9]|6550[34][0-9]|65505[0-8])|^(506699|5067[0-6][0-9]|50677[0-8])|^(509[0-8][0-9]{2}|5099[0-8][0-9]|50999[0-9])|^65003[1-3]|^(65003[5-9]|65004\d|65005[0-1])|^(65040[5-9]|6504[1-3]\d)|^(65048[5-9]|65049\d|6505[0-2]\d|65053[0-8])|^(65054[1-9]|6505[5-8]\d|65059[0-8])|^(65070\d|65071[0-8])|^65072[0-7]|^(65090[1-9]|65091\d|650920)|^(65165[2-9]|6516[6-7]\d)|^(65500\d|65501\d)|^(65502[1-9]|6550[3-4]\d|65505[0-8])/,
      };

      for (var cartao in cartoes)
        if (number.match(cartoes[cartao])) return cartao;
    },

    validationExpiration(value) {
      if (!!value && value.length < 5) {
        return "Por favor digite uma data válida";
      } else if (!!value && this.verifyTypeCC(value)) {
        return "Por favor digite um cartão válido";
      } else {
        return true;
      }
    },

    completePayment() {
      if (this.$refs.formCC.validate()) {
        // Next route here
        console.log("Form is valid to payment!");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box-shadow-card {
  box-shadow: 2px 2px 7px #0003 !important;
}

.col-name {
  overflow: hidden;

  .container-text {
    overflow: hidden;
    white-space: pre;
    height: 40px;
  }
}
</style>

<style>
.v-text-field__details {
  padding-left: 0 !important;
}
</style>
