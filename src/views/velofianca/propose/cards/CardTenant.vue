<template>
  <v-card
    class="w-100"
    height="100%"
    elevation="1"
    outlined
    v-bind:class="statusBorder(person.type)"
  >
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          md="2"
          sm="3"
          align="center"
          class="d-flex justify-center pl-lg-10"
        >
          <v-avatar size="100">
            <img :src="person.img || getAvatarDefault(person.name)" />
          </v-avatar>
        </v-col>

        <v-col cols="12" sm="6" md="7" class="d-flex flex-column">
          <span class="person-name my-1 text-light text-middle super-title1">
            {{ person.name }}
          </span>
          <span class="text-h6 font-font-weight-light text-middle">{{
            person.type
          }}</span>
          <span class="subtitle-1 text-middle">
            <span class="grey--text font-weight-regular text--darken-2">
              Renda:
            </span>
            {{ person.rental | format() }}
          </span>
        </v-col>

        <v-col
          cols="12"
          xs="12"
          sm="3"
          md="3"
          class="d-flex align-center justify-center"
          v-if="
            $route.query.checkout === 'end' ||
            $route.query.checkout === 'redirect'
          "
        >
          <DialogResponsavel
            :isEditModal="true"
            :person="person"
            :index="index"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import DialogResponsavel from "../dialogs/DialogResponsavel";
import { getAvatarDefault } from "@/utils/utils.js";
import { mapGetters } from "vuex";

export default {
  props: {
    person: {},
    index: {},
  },

  components: { DialogResponsavel },

  filters: {
    format(value) {
      if (isNaN(value)) {
        return value;
      } else {
        return Number(value).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      }
    },
  },

  computed: {
    ...mapGetters(["getPersons"]),
  },

  methods: {
    getAvatarDefault,

    statusBorder(type) {
      let newType = this.verifyExistCompany(type);

      switch (newType) {
        case "Responsável":
          return "responsible";

        case "Empresa":
          return "responsible";

        case "Corresponsável":
          return "co-responsible";

        default:
          return "co-responsible";
      }
    },

    verifyExistCompany(type) {
      if (this.getPersons.length > 0) {
        let result = this.getPersons.filter(({ type }) => type === "Empresa");

        if (result.length > 0) {
          if (result.length >= 2 && type === "Responsável") {
            let newType = "Corresponsável";
            return newType;
          } else {
            return type;
          }
        } else {
          return type;
        }
      } else {
        return type;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/components/_cardTenant.scss";
</style>
