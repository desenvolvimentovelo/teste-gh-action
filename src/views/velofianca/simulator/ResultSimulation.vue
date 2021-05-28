<template>
  <v-app style="background-color: #ececec">
    <div
      class="d-flex flex-column justify-start"
      style="
        background-color: #ececec;
        overflow: hidden !important;
        height: 100vh;
      "
    >
      <v-breadcrumbs :items="itemsBreadcrumb" class="font-weight-bold py-1">
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>

      <v-card
        width="auto"
        elevation="0"
        style="overflow: hidden; border: none"
        class="ma-3 mt-0 h-100 rounded-lg"
      >
        <v-container
          class="h-100 d-flex justify-center align-center flex-column"
        >
          <div class="d-flex w-100">
            <router-link class="mt-10" to="/simulador-locacao">
              <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
            </router-link>

            <img
              src="@/assets/images/house-simulation.svg"
              class="w-xs-100 d-block mx-auto"
              style="width: 350px"
            />
          </div>

          <span style="width: 100%" class="my-5 d-block mx-auto" v-if="loading">
            <v-skeleton-loader type="heading"></v-skeleton-loader>
          </span>

          <span
            style="width: 60%"
            class="
              font-weight-medium
              text-h6 text-light
              my-5
              text-center
              w-xs-100
            "
            v-else
          >
            <div
              style="width: 560px"
              class="d-block mx-auto"
              v-if="infos.approved == 0"
            >
              Para esta locação sugerimos uma análise humanizada.
            </div>

            <div
              style="width: 560px"
              class="d-block mx-auto"
              v-else-if="infos.approved == 1"
            >
              <span>
                O locatario
                <strong class="grey--text text--darken-2 text-capitalize">
                  {{ infos.name }}
                </strong>
                com CPF
                <strong class="grey--text text--darken-2">
                  {{ infos.document | formatDocument() }}
                </strong>
                está
                <strong class="grey--text text--darken-2">PRÉ APROVADO</strong>
                para uma locação com a garantia
                <strong class="grey--text text--darken-2">VELO</strong>
              </span>
            </div>
          </span>

          <div class="d-flex flex-column flex-md-row align-center w-md-100">
            <v-col class="d-flex justify-md-end pt-0 pt-md-3">
              <v-btn
                @click="$router.push('/simulador-locacao')"
                class="text-capitalize"
                large
                rounded
                color="primary"
              >
                <span class="mx-12 text-none">Nova simulação</span>
              </v-btn>
            </v-col>

            <v-col>
              <v-btn
                :loading="loadingBtn"
                class="text-capitalize pb-0"
                large
                rounded
                color="primary"
                @click="newPropose"
              >
                <span class="ml-12 mr-12 text-none"> Realizar proposta </span>
              </v-btn>
            </v-col>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { getInfosSimulator } from "@/core/service/velo-fianca/simulator.service.js";
import { cpf } from "cpf-cnpj-validator";
import { addPropose } from "@/core/service/velo-fianca/tenant.service.js";
import { ADD_PROPOSE } from "@/core/store/velo-fianca/propose.module";
import { personActions } from "@/core/service/core.service.js";
import { GET_UPDATE_SESSION_STORAGE } from "@/core/store/velo-fianca/keepPropose.module.js";
import { resetStateVuex } from "@/utils/utils";

export default {
  data() {
    return {
      infos: {},
      message: null,
      loading: true,
      loadingBtn: false,
      itemsBreadcrumb: [
        {
          text: "Simulador",
          disabled: false,
          to: "/simulador-locacao",
        },
        {
          text: "Resultado simulação",
          disabled: true,
          to: "/",
        },
      ],
    };
  },

  filters: {
    formatDocument(value) {
      if (value) cpf.format(value);
    },
  },

  methods: {
    newPropose() {
      this.loadingBtn = true;

      const self = this;

      resetStateVuex(self);

      const raw = {
        type: this.infos.type,
        status: 2,
        step: 2,
        hash: "",
      };

      addPropose(raw).then((propose) => {
        const { id } = propose.data.return[0];

        const raw = JSON.stringify({
          propose: id,
          person: this.infos.person,
          type: 1,
        });

        personActions.createPropose(raw).then(() => {
          this.$store.dispatch(ADD_PROPOSE, propose[0]);

          this.$store.dispatch(GET_UPDATE_SESSION_STORAGE, {
            key: "objectPropose",
            data: {
              id,
            },
          });

          sessionStorage.setItem("redirect", true);

          this.loadingBtn = false;

          this.$router.push("/dados-inquilino");
        });
      });
    },
  },

  mounted() {
    getInfosSimulator(this.$route.params.id).then(({ data }) => {
      this.infos = data.return[0];

      this.loading = false;
    });
  },
};
</script>

<style>
.v-skeleton-loader {
  display: flex;
  justify-content: center;
}
</style>
