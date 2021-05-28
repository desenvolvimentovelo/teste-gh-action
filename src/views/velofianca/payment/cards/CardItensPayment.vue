<template>
  <v-tooltip top v-if="verifyItensToDisabled(text)">
    <template v-slot:activator="{ on, attrs }">
      <div
        class="pa-2 mx-2 my-5 text-center d-flex justify-space-around flex-column card-disabled elevation-3"
        v-bind="attrs"
        v-on="on"
        v-bind:class="{
          'ml-0': index === 0,
          'mr-0': index === payments.length - 1,
        }"
      >
        <img v-bind:width="text === 'PIX' ? '100%' : 60" class="mx-auto" :src="img" />

        <span class="font-weight-bold subtitle-2">{{ text }}</span>
      </div>
    </template>
    <span>Forma de pagamento não disponível no momento</span>
  </v-tooltip>

  <div
    v-on:click="selectionCard(text.replace(/\s/g, ''))"
    class="pa-2 mx-2 my-5 text-center d-flex justify-space-around flex-column hover-effect elevation-3 card-payment"
    v-bind:id="text.replace(/\s/g, '')"
    v-bind:class="{
      'ml-0': index === 0,
      'mr-0': index === payments.length - 1,
      'active-card': text === 'Assinatura',
    }"
    v-else
  >
    <img v-bind:width="text === 'PIX' ? '100%' : 60" class="mx-auto" :src="img" />

    <span class="font-weight-bold subtitle-2">{{ text }}</span>
  </div>
</template>

<script>
import $ from "jquery";
import {
  GET_VALUE_TOTAL,
  GET_SUBTEXT,
  GET_AFIANCAMENTO,
  GET_PAYMENT_SELECTED,
  GET_TOTAL_VALUE_PROPOSE,
} from "@/core/store/velo-fianca/payment.module.js";
import { mapGetters } from "vuex";

export default {
  props: {
    img: String,
    text: String,
    index: Number,
    payments: Array,
    packValue: Number,
  },

  computed: {
    ...mapGetters([
      "getValueTotal",
      "getActivatedPlatformValue",
      "getAfiancamento",
      "getOldValues",
      "getParcela",
      "getPercentage",
      "getPackValuePropose",
    ]),
  },
  mounted() {
    this.$store.dispatch(
      GET_AFIANCAMENTO,
      this.packValue * (this.getPercentage / 100) * this.getParcela
    );
  },

  methods: {
    selectionCard(nameEl) {
      if ($(`#${nameEl}`).hasClass("active-card")) {
        $(`#${nameEl}`).removeClass("active-card");

        this.$store.dispatch(GET_SUBTEXT, "Valor Mensal");
        this.$store.dispatch(
          GET_AFIANCAMENTO,
          (this.packValue / 100) * this.getPercentage * 1
        );
        this.$store.dispatch(GET_VALUE_TOTAL);
        this.$store.dispatch(GET_PAYMENT_SELECTED, "");
      } else {
        $(".active-card").removeClass("active-card");
        $(`#${nameEl}`).addClass("active-card");

        this.updateValueTot(nameEl);
        this.$store.dispatch(GET_PAYMENT_SELECTED, nameEl);
      }
    },

    updateValueTot(formPayment) {
      switch (formPayment) {
        case "Boleto":
          this.$store.dispatch(GET_SUBTEXT, "Valor único");
          this.$store.dispatch(
            GET_AFIANCAMENTO,
            this.packValue * (this.getPercentage / 100) * this.getParcela
          );
          this.$store.dispatch(GET_VALUE_TOTAL);
          break;

        case "Assinatura":
          this.$store.dispatch(GET_SUBTEXT, "Valor mensal");
          this.$store.dispatch(
            GET_AFIANCAMENTO,
            (this.packValue / 100) * this.getPercentage * 1
          );
          this.$store.dispatch(GET_VALUE_TOTAL);
          break;

        case "CartãodeCrédito":
          this.$store.dispatch(GET_SUBTEXT, "Valor único parcelado");
          this.$store.dispatch(
            GET_AFIANCAMENTO,
            this.packValue * (this.getPercentage / 100) * this.getParcela
          );
          this.$store.dispatch(GET_VALUE_TOTAL);
          break;
        default:
          break;
      }
    },

    verifyItensToDisabled(nameItem) {
      switch (nameItem) {
        case "PIX":
          return true;

        case "Rateio":
          return true;

        default:
          return false;
      }
    },

    getProposeValues() {
      this.getPackValuePropose.forEach((element) => {
        this.packValue += parseFloat(element.value);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../../assets/sass/main.scss";

.hover-effect {
  transition: ease-in-out 0.3s;
  cursor: pointer;
  border-radius: 15px !important;
  width: 150px;
  height: 150px;
  background-color: #f6f6f6;

  @media (min-width: 960px) {
    &:hover {
      transform: translateY(-15px);
      border-color: $primary !important;
      border: 3px solid;
      background: #41b84126 !important;
    }
  }
}

.card-disabled {
  transition: ease-in-out 0.3s;
  cursor: pointer;
  border-radius: 15px !important;
  width: 150px;
  height: 150px;
  background-color: #dfdfdf;
}

.active-card {
  transform: translateY(-15px);
  border-color: $primary !important;
  border: 3px solid;
  background: #41b84126 !important;
}
</style>
