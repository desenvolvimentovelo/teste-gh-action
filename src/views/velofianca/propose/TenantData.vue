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
        mobile-breakpoint="1024"
      >
        <loader />

        <v-container
          fluid
          class="w-100 h-100 px-5 px-lg-10"
          style="min-height: 93vh"
        >
          <div class="h-100 d-flex justify-space-between flex-column">
            <div class="d-flex align-center w-100 mx-auto">
              <div class="py-5 w-100 mx-auto d-flex align-center">
                <router-link to="/escolher-tipo-proposta">
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
            </div>

            <div style="height: 77%" class="w-100 mx-auto">
              <v-col cols="12" class="px-0 mb-2">
                <span style="color: #707070" class="font-weight-regular title1">
                  Locatarios
                </span>
              </v-col>

              <v-slide-group
                v-model="model"
                active-class="success"
                :show-arrows="false"
                center-active
                class="d-flex justify-center w-100"
              >
                <v-slide-item
                  v-for="(person, index) in getPersons"
                  :key="index"
                  class="my-1"
                >
                  <card-people :person="person" :index="index" />
                </v-slide-item>

                <v-slide-item class="my-1">
                  <CardDefault />
                </v-slide-item>
              </v-slide-group>
            </div>

            <v-row justify="end" class="mt-4 d-flex-column">
              <v-col align="end" cols="12" md="2" sm="5" class="ml-3 "> 
                <v-btn
                  @click="backStep"
                  class="pa-3 w-xs-100"
                  large
                  rounded
                  color="primary"
                  outlined
                >
                  <span class="text-capitalize px-10">Voltar</span>
                </v-btn>
              </v-col>

              <v-col align="end" cols="12" md="3" sm="5" class="mr-2 pb-md-2 ">
                <v-btn
                  @click="validations"
                  :loading="btnLoading"
                  class="w-xs-100"
                  large
                  rounded
                  color="primary"
                >
                  <span class="text-none">Ir para pacote de locação</span>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { GET_HANDLE_STEP } from "@/core/store/core.module.js";
import {
  GET_VERIFY_EXIST_RESPONSIBLE,
  GET_PERSON_TYPE,
} from "@/core/store/velo-fianca/tenant.module.js";
import { mapGetters } from "vuex";
import StepperPropose from "./StepperPropose.vue";
import CardDefault from "./cards/CardDefault.vue";
import CardPeople from "./cards/CardPeople.vue";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { updateStepPropose } from "@/core/service/core.service.js";

import Loader from "../../components/widgets/Loader.vue";
import { GET_KEEP_PROPOSE } from "@/core/store/velo-fianca/keepPropose.module.js";

export default {
  components: {
    StepperPropose,
    CardDefault,
    CardPeople,
    Loader,
  },
  data() {
    return {
      e1: 1,
      model: null,
      btnLoading: false,
      numberMask: createNumberMask({
        prefix: "$",
        allowDecimal: true,
        decimalLimit: 2,
        integerLimit: 1,
      }),
      itemsBreadcrumb: [
        {
          text: "Propostas",
          disabled: false,
          to: "/proposta",
        },
        {
          text: "Tipo da Proposta",
          disabled: false,
          to: "/escolher-tipo-proposta",
        },
        {
          text: "Dados do Locatario",
          disabled: true,
          to: "/",
        },
      ],
    };
  },
  methods: {
    validations() {
      this.btnLoading = true;
      let existCompany = this.getPersons.filter(
        ({ type }) => type === "Empresa"
      );

      let existPerson = this.getPersons.filter(
        ({ type }) => type === "Responsável"
      );

      if (this.getPersons.length === 0) {
        this.$toast.error("Você precisa adicionar um locatário!");
      } else if (existCompany.length > 0 && existPerson.length === 0) {
        this.$toast.error("Você precisa adicionar um responsável!");
      } else if (existPerson.length >= 2) {
        this.$toast.error("Não é possivel manter dois responsáveis!");
      } else if (existPerson.length === 0) {
        this.$toast.error("Você precisa adicionar um responsável!");
      } else {
        this.$router.push("/pacote-locacao");
      }

      this.btnLoading = false;
    },

    backStep() {
      this.$router.push("/escolher-tipo-proposta");
    },
  },
  mounted() {
    if (sessionStorage.getItem("redirect") !== null) {
      const self = this;

      this.$store.dispatch(GET_KEEP_PROPOSE, self);
    }

    updateStepPropose(2);
    this.$store.dispatch(GET_PERSON_TYPE);
    this.$store.dispatch(GET_VERIFY_EXIST_RESPONSIBLE);
    this.$store.dispatch(GET_HANDLE_STEP, 2);
  },
  computed: {
    ...mapGetters(["getPersons"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main.scss";
@import "@/assets/sass/pages/propose/_dataCollect.scss";
</style>
