<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ attrs }">
      <v-btn
        @click="verifyIsValidToNext"
        rounded
        large
        class="primary px-8 mt-5 btnTextTransform"
        v-bind="attrs"
        >Ir para o pagamento</v-btn
      >
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        Privacy Policy
      </v-card-title>

      <v-card-text>
        <img
          src="@/assets/images/payment_billet.svg"
          alt="Vetor"
          width="100%"
        />

        <v-row>
          <v-col>
            <v-btn color="primary" rounded large>Copiar Link</v-btn>
          </v-col>

          <v-col>
            <v-btn color="primary" rounded large>Ver Boleto</v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    ...mapGetters(["getPaymentSelected"]),
  },

  methods: {
    verifyIsValidToNext() {
      if (this.getPaymentSelected.length === 0) {
        this.$toast.error("Por favor selecione uma forma de pagamento!");
      } else if (this.getPaymentSelected === "Boleto") {
        this.dialog = true;
      } else if (
        this.getPaymentSelected === "Assinatura" ||
        this.getPaymentSelected === "CartãodeCrédito"
      ) {
        this.$router.push("/payment-card");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btnTextTransform {
  text-transform: none;
}
</style>
