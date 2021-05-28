<template>
  <v-dialog v-model="dialog" persistent max-width="550">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon small>
        <v-icon style="color: #ff5252">mdi-delete</v-icon>
      </v-btn>
    </template>

    <v-card class="py-5 text-center">
      <i
        class="las la-exclamation-circle mx-auto"
        style="font-size: 8rem; color: #ff5252"
      ></i>

      <v-btn
        :disabled="loadingBtn"
        icon
        @click="dialog = false"
        class="btnClose"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <div class="d-flex flex-column py-3">
        <h3 class="mx-auto">Excluir este locatario?</h3>
      </div>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          :disabled="loadingBtn"
          rounded
          color="grey"
          class="white--text"
          large
          @click="dialog = false"
        >
          <span class="px-14 text-capitalize font-weight-regular">Voltar</span>
        </v-btn>

        <v-btn
          :loading="loadingBtn"
          color="error"
          rounded
          large
          @click="removerPessoa"
        >
          <span class="px-6 text-none font-weight-regular white--text">
            Excluir locatario
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  REMOVE_PERSONS,
  GET_VERIFY_EXIST_RESPONSIBLE,
} from "@/core/store/velo-fianca/tenant.module.js";
import {
  companyActions,
  personActions,
  deletePropose,
} from "@/core/service/core.service.js";
import { mapGetters } from "vuex";

export default {
  props: {
    person: {
      type: Object,
    },
    index: Number,
  },

  data() {
    return {
      dialog: false,
      loadingBtn: false,
    };
  },

  computed: {
    ...mapGetters(["getPersons"]),
  },

  methods: {
    async removerPessoa() {
      if (this.getPersons.length === 0) {
        await this.flowDeletePropose();

        sessionStorage.setItem(
          "data",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("data")),
            persons: [],
            objectPropose: {
              step: JSON.parse(sessionStorage.getItem("data")).objectPropose
                .step,
              type: JSON.parse(sessionStorage.getItem("data")).objectPropose
                .type,
            },
          })
        );
      } else {
        if (this.person.type === "Empresa") {
          await this.deleteCompany();
        } else {
          await this.deletePerson();
        }

        sessionStorage.setItem(
          "data",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("data")),
            persons: this.getPersons,
          })
        );
      }

      this.$store.dispatch(REMOVE_PERSONS, this.person.id);
      this.$store.dispatch(GET_VERIFY_EXIST_RESPONSIBLE);
    },

    async flowDeletePropose() {
      const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

      if (this.person.type === "Empresa") {
        await this.deleteCompany();
      } else {
        await this.deletePerson();
      }

      await deletePropose(sessionStorageItem.objectPropose.id);
    },

    async deletePerson() {
      this.loadingBtn = true;

      let idProposePerson = this.getPersons[this.index].idProposePerson;

      await personActions.deletePropose(idProposePerson);

      this.loadingBtn = false;
      this.dialog = false;
      this.$toast.success("Inquilo excluído com sucesso!", { duration: 1000 });
    },

    async deleteCompany() {
      this.loadingBtn = true;

      let idProposeCompany = this.getPersons[this.index].idProposeCompany;

      await companyActions.deletePropose(idProposeCompany);

      this.loadingBtn = false;
      this.dialog = false;
      this.$toast.success("Inquilo excluído com sucesso!", { duration: 1000 });
    },
  },
};
</script>

<style></style>
