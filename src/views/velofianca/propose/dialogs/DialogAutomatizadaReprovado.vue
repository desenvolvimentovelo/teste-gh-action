<template>
  <div>
    <v-dialog
      v-if="renderDialog"
      v-model="flDialog"
      persistent
      max-width="1000"
    >
      <v-card>
        <v-card-text
          class="pt-15 pb-0 d-flex align-center justify-center flex-column"
        >
          <div>
            <v-img
              src="@/assets/images/automatizada-reprovado.svg"
              width="300px"
              min-heigth="250px"
            />
          </div>

          <div class="text-center my-6" style="width: 753px">
            <h1 class="font-weight-bold my-0 mb-4">
              Sua proposta não foi aprovada automaticamente
            </h1>

            <span class="subtitle-1 text-light">
              Você pode adicionar um corresponsável para incluir na proposta ou
              ainda, ir para a análise humanizada.
            </span>
          </div>

          <div class="d-flex">
            <v-col
              cols="12"
              md="6"
              class="d-flex justify-md-end py-0 justify-center"
            >
              <v-btn
                @click="addPeople"
                color="primary"
                rounded
                large
                min-width="272px"
                class="mx-auto mx-md-0"
              >
                <span class="mx-4 text-none" style="color: #ffffff">
                  Adicionar corresponsáveis
                </span>
              </v-btn>
            </v-col>

            <v-col
              cols="12"
              md="6"
              class="d-flex justify-md-start justify-center py-0"
            >
              <v-btn
                @click="redirect('/attachment')"
                color="primary"
                rounded
                large
                min-width="272px"
                class="mx-auto mx-md-0"
              >
                <span class="mx-4 text-none" style="color: #ffffff"
                  >Análise humanizada</span
                >
              </v-btn>
            </v-col>
          </div>
        </v-card-text>

        <v-card-actions class="pt-5">
          <v-btn
            @click="objCancelarProposta.flDialogCancelarProposta = true"
            class="btn-error ml-auto"
            rounded
            large
            text
            color="error"
            :loading="loadingBtn"
          >
            <span class="ml-4 mr-4 text-none">Cancelar proposta</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-app v-else>
      <div class="py-5">
        <StepperPropose
          :items="['las la-user', 'las la-home', 'las la-list-alt']"
        />
      </div>

      <div>
        <v-row justify="start">
          <v-col cols="12" align="center" md>
            <v-img
              src="@/assets/images/automatizada-reprovado.svg"
              width="30%"
              class="w-xs-100"
            />
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col align="center" class="my-6">
            <span class="text-h5 font-weight-medium text-light">
              Sua proposta não foi aprovada automaticamente
            </span>
          </v-col>
        </v-row>

        <v-row class="d-lg-flex d-block flex-column flex-md-row">
          <v-col cols="12" md="6" class="d-flex justify-md-end justify-center">
            <v-btn
              @click="addPeople"
              color="primary"
              rounded
              large
              min-width="272px"
              class="mx-auto mx-md-0"
            >
              <span class="mx-4 text-none" style="color: #ffffff">
                Adicionar corresponsáveis
              </span>
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            md="6"
            class="d-flex justify-md-start justify-center"
          >
            <v-btn
              @click="redirect('/attachment')"
              color="primary"
              rounded
              large
              min-width="272px"
              class="mx-auto mx-md-0"
            >
              <span class="mx-4 text-none" style="color: #ffffff"
                >Análise humanizada</span
              >
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-9 pb-0">
          <v-btn
            @click="objCancelarProposta.flDialogCancelarProposta = true"
            class="btn-error ml-auto"
            rounded
            large
            text
            color="error"
            :loading="loadingBtn"
          >
            <span class="ml-4 mr-4 text-none">Cancelar proposta</span>
          </v-btn>
        </v-row>
      </div>
    </v-app>

    <dialog-cancelar-proposta
      @closeDialog="objCancelarProposta.flDialogCancelarProposta = $event"
      v-bind:objCancelarProposta="objCancelarProposta"
    />
  </div>
</template>

<script>
import StepperPropose from "../StepperPropose.vue";
import DialogCancelarProposta from "./DialogCancelarProposta.vue";
import { editPropose } from "@/core/service/velo-fianca/packLocation.service.js";

export default {
  props: {
    id: String,
    flDialog: Boolean,
    renderDialog: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    StepperPropose,
    DialogCancelarProposta,
  },

  data() {
    return {
      objCancelarProposta: { id: null, flDialogCancelarProposta: false },
      loadingBtn: false,
    };
  },

  mounted() {
    this.objCancelarProposta.id =
      this.$route.params.id === undefined
        ? JSON.parse(sessionStorage.getItem("data")).objectPropose.id
        : this.$route.params.id;
  },

  methods: {
    addPeople() {
      editPropose(
        JSON.stringify({
          id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
          status: 2,
        })
      ).then(() => this.redirect("/dados-inquilino"));
    },

    redirect(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped></style>
