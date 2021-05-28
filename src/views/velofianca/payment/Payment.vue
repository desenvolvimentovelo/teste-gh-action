<template>
  <v-app>
    <v-row class="my-0">
      <div class="left-menu">
        <img
          src="../../../assets/images/velo-justlogo-negative.svg"
          width="45px"
          style="position: fixed; z-index: 999"
          class="mt-2 ml-6"
        />
      </div>
      <div class="main w-100">
        <header class="align-self-center">
          <v-card
            elevation="0"
            width="auto"
            style="border-radius: 0px"
            class="mb-3 py-1 mx-auto text-center"
          >
            <img
              width="120px"
              class="mx-auto align-self-center"
              src="@/assets/images/velo-written.svg"
            />
          </v-card>
        </header>

        <v-card
          elevation="0"
          style="border-radius: 10px"
          class="h-100 ml-3 mr-5"
        >
          <loader />

          <v-container class="d-flex align-lg-center px-lg-2">
            <dialog-payment-card ref="DialogPaymentCard" />
            <v-row class="w-100">
              <v-col class="pa-0 d-lg-flex pb-0">
                <v-col cols="12" lg="8" class="pb-0">
                  <h2
                    class="mt-lg-6 grey--text text--darken-2 font-weight-regular"
                  >
                    Olá
                    <span
                      ><b class="black--text text-capitalize">{{
                        getCompleteViewPropose.name.split(" ")[0]
                      }}</b
                      >,
                    </span>
                    confira os valores da sua fiança
                  </h2>

                  <h3
                    class="mt-6 grey--text text--darken-2 font-weight-regular"
                  >
                    Selecione a forma de pagamento:
                  </h3>

                  <v-slide-group
                    v-model="model"
                    class="py-4"
                    :show-arrows="false"
                  >
                    <v-slide-item
                      v-for="(item, index) in payments"
                      :key="index"
                    >
                      <CardItensPayment
                        :img="item.img"
                        :index="index"
                        :text="item.text"
                        :payments="payments"
                        :packValue="packValue"
                      />
                    </v-slide-item>
                  </v-slide-group>

                  <v-card
                    class="mt-lg-7 mt-xs-5 px-md-6"
                    elevation="0"
                    height="auto"
                    color="#e8e8e8"
                    style="border-radius: 8px"
                  >
                    <v-card-text>
                      <header class="d-flex justify-space-between">
                        <v-col
                          cols="6"
                          sm="10"
                          class="px-0 header-list text-ligth text-center text-sm-left"
                        >
                          <h4>Descrição</h4>
                        </v-col>

                        <v-col
                          sm="2"
                          cols="6"
                          class="px-0 header-list text-ligth text-center text-sm-left"
                        >
                          <h4>Valor</h4>
                        </v-col>
                      </header>

                      <v-divider class="mb-2 mt-1"></v-divider>

                      <div class="my-5 my-sm-0">
                        <div class="d-flex justify-space-between flex-row">
                          <v-col sm="10" cols="6" class="pa-0">
                            <h5
                              class="font-weight-medium grey--text text--darken-2 text-center text-sm-left item-list"
                            >
                              Ativação na plataforma VELO
                              <br class="d-sm-none" />
                              <span
                                class="font-weight-bold grey--text text--darken-3"
                                >(Valor Único)</span
                              >
                            </h5>
                          </v-col>

                          <v-col
                            sm="2"
                            cols="6"
                            class="pa-0 d-flex align-center justify-center justify-sm-start"
                          >
                            <h5
                              class="font-weight-medium grey--text text--darken-2 item-list"
                            >
                              {{ getActivatedPlatformValue | formatCurrency }}
                            </h5>
                          </v-col>
                        </div>

                        <div class="my-5 my-sm-0">
                          <div class="d-flex justify-space-between flex-row">
                            <v-col sm="10" cols="6" class="pa-0">
                              <h5
                                class="font-weight-medium grey--text text--darken-2 text-center text-sm-left item-list"
                              >
                                Afiançamento VELO <br class="d-sm-none" />
                                <span
                                  class="font-weight-bold grey--text text--darken-3"
                                  >({{ getSubtext }})</span
                                >
                              </h5>
                            </v-col>

                            <v-col
                              sm="2"
                              cols="6"
                              class="pa-0 d-flex align-center justify-center justify-sm-start"
                            >
                              <h5
                                class="font-weight-medium grey--text text--darken-2 item-list"
                              >
                                {{ getAfiancamento | formatCurrency }}
                              </h5>
                            </v-col>
                          </div>
                        </div>
                      </div>

                      <v-divider class="mb-1 mt-2"></v-divider>

                      <div class="d-flex justify-space-between">
                        <v-col
                          sm="10"
                          cols="6"
                          class="px-0 text-ligth text-center text-sm-left"
                        >
                          <h4 class="footer-list">Total</h4>
                        </v-col>

                        <v-col
                          sm="2"
                          cols="6"
                          class="px-0 text-ligth text-center text-sm-left"
                        >
                          <h4 class="footer-list">
                            {{ getValueTotal | formatCurrency }}
                          </h4>
                        </v-col>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" lg="4" class="pb-0">
                  <v-row class="h-100 d-flex">
                    <v-col align="center" class="d-none d-lg-flex mt-8">
                      <img
                        width="450px"
                        class="mx-auto"
                        src="@/assets/images/payment-background-right.svg"
                      />
                    </v-col>

                    <v-col
                      class="d-flex justify-center justify-sm-end justify-lg-center align-end pr-0 pr-sm-3 py-0 pl-0"
                    >
                      <v-btn
                        rounded
                        large
                        class="primary px-8 mt-5 btnTextTransform text-none mb-8"
                        @click="verifyIsValidToNext"
                      >
                        Ir para o pagamento
                      </v-btn>
                      <dialog-redirect ref="DialogRedirect" />
                      <dialog-failure-payment-card ref="DialogFailureCard" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import CardItensPayment from "./cards/CardItensPayment.vue";
import {
  GET_VALUE_TOTAL,
  GET_AFIANCAMENTO,
  GET_TOTAL_VALUE_PROPOSE,
  GET_ACTIVATION_VALUE,
  GET_VIEW_PROPOSE_COMPLETE,
} from "@/core/store/velo-fianca/payment.module.js";
import { GET_LOADING } from "@/core/store/core.module.js";
import DialogRedirect from "@/views/velofianca/payment/dialogs/DialogRedirect.vue";
import DialogPaymentCard from "@/views/velofianca/payment/dialogs/DialogPaymentCard.vue";
import {
  postAsaasPayment,
  getTokenDefault,
} from "@/core/service/velo-pagamento/velopayment.service.js";
import Loader from "@/views/components/widgets/Loader.vue";
import DialogFailurePaymentCard from "./dialogs/DialogFailurePaymentCard.vue";

export default {
  components: {
    CardItensPayment,
    DialogRedirect,
    DialogPaymentCard,
    DialogFailurePaymentCard,
    Loader,
  },
  data() {
    return {
      packValue: 0,
      model: null,
      propose: this.$route.query.id,
      payments: [
        {
          text: "Assinatura",
          img: require("@/assets/images/payment-creditcard-1.svg"),
        },
        {
          text: "Boleto",
          img: require("@/assets/images/payment-barcode.svg"),
        },
        {
          text: "Cartão de Crédito",
          img: require("@/assets/images/payment-creditcard-1.svg"),
        },
        {
          text: "PIX",
          img: require("@/assets/images/payment-pix.svg"),
        },
        {
          text: "Rateio",
          img: require("@/assets/images/payment-creditcard-2.svg"),
        },
      ],
    };
  },

  filters: {
    formatCurrency: function (value) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },

  computed: {
    ...mapGetters([
      "getPackValuePropose",
      "getValueTotal",
      "getSubtext",
      "getAfiancamento",
      "getPercentage",
      "getActivatedPlatformValue",
      "getCompleteViewPropose",
      "getPaymentSelected",
    ]),
  },

  mounted() {
    this.$store.dispatch(GET_LOADING, true);
    this.$store
      .dispatch(GET_VIEW_PROPOSE_COMPLETE, {
        propose: `'${this.$route.query.id}'`,
      })
      .then(() => {
        let customerView = this.getCompleteViewPropose;

        if ([7, 6].includes(parseInt(customerView.status))) {
          this.$store
            .dispatch(GET_ACTIVATION_VALUE, {
              propose: customerView.id,
            })
            .then(() => {
              this.$store
                .dispatch(GET_TOTAL_VALUE_PROPOSE, {
                  propose: customerView.id,
                })
                .then(() => {
                  this.getProposeValues();
                  this.$store
                    .dispatch(
                      GET_AFIANCAMENTO,
                      this.packValue * (this.getPercentage / 100)
                    )
                    .then(() => {
                      this.$store.dispatch(GET_VALUE_TOTAL);
                      this.$store.dispatch(GET_LOADING, false);
                    });
                });
            });
        } else {
          this.$refs.DialogFailureCard.openDialog();
        }
      });
  },

  methods: {
    getTokenDefault() {
      getTokenDefault().then((res) => {
        const token = res.return[0].session;
      });
    },

    selectionCard(index) {
      this.payments[index].value = !this.payments[index].value;
    },

    async verifyIsValidToNext() {
      if ([7, 6].includes(parseInt(this.getCompleteViewPropose.status))) {
        if (this.getPaymentSelected.length === 0) {
          this.$toast.error("Por favor selecione uma forma de pagamento!");
        } else if (this.getPaymentSelected === "Assinatura") {
          this.$refs.DialogPaymentCard.creditCard(false);
          this.$refs.DialogPaymentCard.openDialog();
        } else if (this.getPaymentSelected === "CartãodeCrédito") {
          this.$refs.DialogPaymentCard.getInstallments(
            parseFloat(this.getValueTotal)
          );
          this.$refs.DialogPaymentCard.creditCard(true);
          this.$refs.DialogPaymentCard.openDialog();
        } else if (this.getPaymentSelected === "Boleto") {
          await this.goPayment();
        }
      } else {
        this.$refs.DialogFailureCard.openDialog();
      }
    },

    getProposeValues() {
      this.getPackValuePropose.forEach((element) => {
        this.packValue += parseFloat(element.value);
      });
    },

    async goPayment() {
      this.$refs.DialogRedirect.openAwaiting();

      let customerView = this.getCompleteViewPropose;

      let billing = {
        people: {
          customerid: "",
          email: customerView.email,
          document: customerView.document,
          phone: customerView.phone,
          name: customerView.name,
          personid: customerView.personid,
        },
        propose: {
          id: customerView.id,
          paymenttype: this.getPaymentSelected,
          value: String(this.getValueTotal),
          zipcode: customerView.zipcode,
          addressNumber: customerView.number,
          addressComplement: customerView.complement,
          externalreference: customerView.id,
          activation: String(this.getActivatedPlatformValue),
          financeValue: String(this.getAfiancamento),
        },
      };

      await postAsaasPayment(billing)
        .then((response) => {
          window.open(response.data.return.invoiceUrl, "_self", "noopener");
        })
        .error((error) => {
          this.$refs.error("Erro ao gerar boleto");
        });
      // this.$store.dispatch(GET_PAYMENT_BILLET, billing).then((data) => {
      //   let response = this.getProposeBilling;
      //   this.$refs.DialogRedirect.closeAwaiting();
      //   window.open(response.return.invoiceUrl, "_self", "noopener");
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.header-list,
.footer-list {
  font-size: 1rem;
}

.item-list {
  font-size: 0.88rem;
}

.btnTextTransform {
  text-transform: none;
}

.v-slide-group__content {
  justify-content: space-between !important;
}

.left-menu {
  float: left;
  width: 80px;
  position: absolute;
  z-index: 999;
  height: 100%;
  background-image: url("../../../assets/images/background-aside.svg");

  &::before {
    content: "";

    position: absolute;
    top: 0;

    width: 80px;
    height: 100%;

    background: linear-gradient(
      164deg,
      rgba(8, 185, 20, 0.4066001400560224) 0%,
      rgba(3, 119, 6, 0.4066001400560224) 100%
    );
  }
}

@media (max-width: 1263px) {
  .left-menu {
    display: none;
  }
}

.main {
  padding-left: 80px;
  background-color: #ececec;
  overflow: hidden !important;
}
</style>
