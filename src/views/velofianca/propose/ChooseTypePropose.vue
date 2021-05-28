<template>
  <v-app style="background-color: #ececec">
    <div
      class="h-100 d-flex flex-column justify-start"
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
        style="border-radius: 10px; min-height: 93vh"
        class="mx-3 mb-3 h-100"
      >
        <v-container
          fluid
          class="w-100 h-100 px-5 px-lg-10"
          id="style-ui-container-card"
          style="min-height: 93vh"
        >
          <div class="w-100 h-100">
            <v-row class="w-100 mx-auto" no-gutters>
              <div class="py-5 w-100 mx-auto d-flex align-center">
                <router-link to="/proposta">
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
            </v-row>

            <div
              class="align-center justify-center w-100 mx-auto mt-0 custom-display"
              style="height: calc(100% - 70px)"
            >
              <CardProposeType
                v-for="(item, index) in ['Residencial', 'Comercial']"
                :key="index"
                :index="index"
                :item="item"
              />
            </div>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import StepperPropose from "../../components/widgets/Stepper";
import CardProposeType from "./cards/CardProposeType.vue";
import { GET_PROPOSE_TYPE, GET_HANDLE_STEP } from "@/core/store/core.module.js";

export default {
  components: {
    StepperPropose,
    CardProposeType,
  },
  computed: {
    ...mapGetters(["getProposeType"]),
  },
  data() {
    return {
      itemActiveDefault: 0,
      itemsBreadcrumb: [
        {
          text: "Propostas",
          disabled: false,
          to: "/proposta",
        },
        {
          text: "Tipo Proposta",
          disabled: true,
          to: "/",
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch(GET_HANDLE_STEP, 1);
    this.$store.dispatch(GET_PROPOSE_TYPE);
  },
};
</script>

<style></style>
