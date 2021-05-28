<template>
  <div class="ui-button">
    <v-btn
      color="primary"
      class="ml-sm-3 mt-3 mt-sm-0 text-capitalize"
      elevation="2"
      large
      rounded
      @click="verifyExistPropose"
    >
      Nova Proposta
      <i class="las la-plus ml-1 sizeIcons"></i>
    </v-btn>

    <v-dialog v-model="dialog" max-width="450">
      <v-card>
        <v-card-title class="headline">
          Deseja terminar a proposta?
        </v-card-title>
        <v-card-text
          >Vi aqui que você tem uma proposta que não foi terminada anteriormente
          deseja continuar.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="newPropose">
            Nova Proposta
          </v-btn>
          <v-btn color="green darken-1" text @click="keepPropose">
            continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { RESET_VALUES_ATTACHMENT_CHECKOUT_END } from "@/core/store/velo-fianca/checkout.module.js";
import { RESET_VALUES_ATTACHMENT } from "@/core/store/velo-fianca/attachment.module.js";
import { RESET_VALUES_DETAIL } from "@/core/store/velo-fianca/propertyDetails.module.js";
import { RESET_VALUES_LOCATION } from "@/core/store/velo-fianca/packLocation.module.js";
import { RESET_VALUES_TENANT } from "@/core/store/velo-fianca/tenant.module.js";
import { RESET_OBJECT_PROPOSE } from "@/core/store/core.module.js";
import { HANDLE_ACTIVATOR } from "@/core/store/velo-fianca/propose.module.js";
import mockSteps from "@/core/mocks/steps.json";

export default {
  props: {
    item: Object,
  },

  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    verifyExistPropose() {
      let sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

      if (
        sessionStorageItem !== null &&
        sessionStorageItem.objectPropose !== undefined &&
        sessionStorageItem.objectPropose.status === "Iniciada"
      ) {
        this.dialog = true;
      } else {
        sessionStorage.clear();

        this.resetVuexState();

        this.$router.push("/escolher-tipo-proposta");
      }
    },

    newPropose() {
      sessionStorage.clear();

      this.resetVuexState();

      this.$router.push("/escolher-tipo-proposta");
    },

    resetVuexState() {
      this.$store.dispatch(RESET_OBJECT_PROPOSE);
      this.$store.dispatch(RESET_VALUES_ATTACHMENT_CHECKOUT_END);
      this.$store.dispatch(RESET_VALUES_ATTACHMENT);
      this.$store.dispatch(RESET_VALUES_DETAIL);
      this.$store.dispatch(RESET_VALUES_LOCATION);
      this.$store.dispatch(RESET_VALUES_TENANT);
    },

    keepPropose() {
      let { step, id } = JSON.parse(
        sessionStorage.getItem("data")
      ).objectPropose;

      let result = mockSteps.filter(({ id }) => Number(step) === id);

      if (result[0].route === "/checkout") {
        this.$router.push(`${result[0].route}/${id}?end=false`);
      } else {
        this.$router.push(result[0].route);
      }
    },
  },
};
</script>
