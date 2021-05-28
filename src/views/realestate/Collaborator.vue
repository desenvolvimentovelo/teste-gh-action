<template>
  <v-app style="background-color: #ececec">
    <div
      class="d-flex flex-column justify-start"
      style="
        background-color: #ececec;
        overflow: hidden !important;
        min-height: 100vh;
      "
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
        class="mx-3 mb-3"
      >
        <v-container fluid class="h-100 px-13 py-5 pa-lg-10">
          <div class="mx-auto d-flex align-center">
            <router-link
              to="/imobiliarias"
              class="mr-5 d-flex align-center text-decoration-none"
            >
              <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
            </router-link>

            <div
              class="
                mr-auto
                my-auto
                grey--text
                text--darken-2
                font-weight-regular
              "
            >
              <h2>Colaboradores</h2>
            </div>

            <div class="ml-auto">
              <v-btn
                color="primary"
                class="text-capitalize"
                elevation="2"
                large
                rounded
                disabled
              >
                Exportar
                <v-icon class="ml-2">mdi-export</v-icon>
              </v-btn>

              <v-btn
                color="primary"
                class="text-capitalize ml-2"
                elevation="2"
                large
                rounded
                @click="
                  $router.push(
                    `/imobiliaria/${$route.params.idRealEstate}/colaborador/detalhes-colaborador/novo`
                  )
                "
              >
                Adicionar Colaborador
                <v-icon class="ml-2">mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>

          <v-divider class="mt-5"></v-divider>

          <div class="d-flex align-center w-100 mx-auto my-5">
            <v-col md="4" xs="12" class="pa-0">
              <v-text-field
                placeholder="Busca"
                clearable
                v-model="search"
                class="pt-0 mt-0 inputSearch"
              ></v-text-field>
            </v-col>
          </div>

          <div class="w-100 mx-auto">
            <v-data-table
              :headers="headers"
              :items="getCollaborator"
              :items-per-page="5"
              :hide-default-footer="true"
              class="elevation-0 w-100 table-collaborator"
              :page.sync="page"
              :search="search"
              item-key="id"
              @page-count="pageCount = $event"
            >
              <template v-slot:[`item.id_colaborador`]="{ item }">
                <div class="d-flex justify-center">
                  <span class="grey--text text--darken-1 font-weight-bold">
                    {{ item.id_colaborador }}
                  </span>
                </div>
              </template>

              <template v-slot:[`item.name`]="{ item }">
                <div class="d-flex align-center">
                  <v-avatar size="40" class="mr-3">
                    <img :src="getAvatarDefault(item.name)" />
                  </v-avatar>

                  <span
                    class="
                      text-capitalize
                      font-weight-bold
                      subtitle-1
                      grey--text
                      text--darken-1 text-sm-body-2
                      cols-ui
                    "
                  >
                    {{ item.name }}
                  </span>
                </div>
              </template>

              <template v-slot:[`item.colaboradortype`]="{ item }">
                <span
                  class="
                    font-weight-regular
                    subtitle-1
                    grey--text
                    text--darken-1 text-sm-body-2
                  "
                  >{{ item.colaboradortype }}</span
                >
              </template>

              <template v-slot:[`item.document`]="{ item }">
                <span
                  class="
                    font-weight-regular
                    subtitle-1
                    grey--text
                    text--darken-1 text-sm-body-2
                  "
                  >{{ item.document | formatDocument }}</span
                >
              </template>

              <template v-slot:[`item.birth`]="{ item }">
                <span
                  class="
                    font-weight-regular
                    subtitle-1
                    grey--text
                    text--darken-1 text-sm-body-2
                  "
                  >{{ item.birth | formatBirth }}</span
                >
              </template>

              <template v-slot:[`item.item`]="{ item }">
                <action-table :infosPerson="item" />
              </template>

              <template slot="no-data">
                <img
                  src="@/assets/images/undraw_empty_xct9.svg"
                  alt="Nenhum dado disponível"
                  width="150"
                  class="pt-10"
                />

                <h1 class="mb-0">Nenhum dado disponível</h1>
              </template>

              <template slot="no-results">
                <img
                  src="@/assets/images/undraw_void_3ggu.svg"
                  alt="Nenhum dado disponível"
                  width="150"
                  class="pt-10"
                />

                <h1 class="mb-0">Nenhum resultado encontrado</h1>
              </template>
            </v-data-table>

            <div class="text-center d-flex justify-end w-100 py-3">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
          </div>
        </v-container>
      </v-card>
    </div>

    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          outlined
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          OK
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { getCollaboratorRealestate } from "@/core/service/realestate/collaborator.service.js";
import { GET_COLLABORATOR } from "@/core/store/velo-imobiliaria/collaborator.module.js";
import { mapGetters } from "vuex";
import { cpf } from "cpf-cnpj-validator";
import { getListColaboradores } from "@/core/service/velo-imobiliaria/realEstateForm.service.js";
import { unformatBirth, getAvatarDefault } from "@/utils/utils";
import ActionTable from "./ActionTable.vue";

export default {
  components: { ActionTable },
  data() {
    return {
      page: 1,
      pageCount: 0,
      search: "",
      snackbar: false,
      text: `Funcionalidade ainda em desenvolvimento.`,
      itemsBreadcrumb: [
        {
          text: "Imobiliarias",
          disabled: false,
          to: "/imobiliarias",
        },
        {
          text: "Colaboradores",
          disabled: true,
          to: "/",
        },
      ],
      headers: [
        {
          text: "Id",
          value: "id_colaborador",
          class: " grey--text subtitle-1 font-weight-medium",
          align: "center",
          width: 50,
        },
        {
          text: "Nome",
          value: "name",
          class: "grey--text subtitle-1 font-weight-medium",
          width: 150,
        },
        {
          text: "Perfil de usuário",
          value: "colaboradortype",
          class: "text-left grey--text subtitle-1 font-weight-medium",
          width: 150,
        },
        {
          text: "Documento",
          value: "document",
          class: "text-left grey--text subtitle-1 font-weight-medium",
          width: 150,
        },
        {
          text: "Nascimento",
          value: "birth",
          class: "text-left grey--text subtitle-1 font-weight-medium",
          width: 150,
        },
        {
          text: "",
          value: "item",
          sortable: false,
          width: 50,
        },
      ],
    };
  },

  filters: {
    formatDocument(value) {
      if (value) {
        return cpf.format(value);
      }
    },

    formatBirth(value) {
      if (value) {
        return unformatBirth(value);
      }
    },
  },

  created() {
    getListColaboradores(this.$route.params.idRealEstate)
      .then(({ data }) => {
        if (data.result) {
          this.$store.dispatch(GET_COLLABORATOR, data.return);
        } else {
          this.$toast.error(
            "Ocorreu um erro e não foi possivel trazer a lista de colaboradores"
          );
        }
      })
      .catch(() => {
        this.$toast.error(
          "Ocorreu um erro e não foi possivel trazer a lista de colaboradores"
        );
      });

    this.getAvatarDefault();
  },

  computed: {
    ...mapGetters(["getCollaborator"]),
  },

  methods: {
    getAvatarDefault,

    verifyRouteToRedirect(item) {
      this.$router.push(
        `/imobiliaria/${this.$route.params.idRealEstate}/colaborador/detalhes-colaborador/${item.id_colaborador}`
      );
    },
  },
};
</script>

<style>
.inputSearch .v-text-field__details {
  display: none !important;
}

.inputSearch .v-input__slot {
  margin-bottom: 0 !important;
}

.table-collaborator .text-start:nth-child(7) {
  display: none;
}
</style>
