<template>
  <v-app style="background-color: #ececec">
    <div style="overflow: hidden !important">
      <v-breadcrumbs
        :items="itemsBreadcrumb"
        class="font-weight-bold py-1 text-xl-h4"
      >
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>

      <v-card
        outlined
        elevation="0"
        width="auto"
        style="border-radius: 10px; min-height: 93vh"
        class="mx-3 mb-3 d-flex align-start justify-center"
      >
        <v-container
          fluid
          class="h-100 px-13 py-5 pa-lg-10"
          style="min-heigth: 93vh"
        >
          <div class="mx-auto d-flex">
            <div
              class="
                d-flex
                align-center
                justify-start
                ma-0
                grey--text
                text--darken-2
                font-weight-regular
              "
            >
              <h2>Imobiliárias</h2>
            </div>

            <div class="ml-auto my-auto">
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
                @click="addRealestate"
              >
                Adicionar imobiliária
                <v-icon class="ml-2">mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>

          <v-divider class="mt-5"></v-divider>

          <div class="d-flex align-center w-100 my-5 mx-auto">
            <v-col md="4" xs="12" class="pa-0">
              <v-text-field
                placeholder="Busca"
                clearable
                v-model="search"
                class="inputSearchRealEstate"
              ></v-text-field>
            </v-col>
          </div>

          <div class="w-100 mx-auto">
            <v-data-table
              :headers="headers"
              :items="getListRealestates"
              :items-per-page="itemsPerPage"
              class="elevation-0 w-100"
              style="overflow: hidden !important"
              :hide-default-footer="true"
              :page.sync="page"
              :search="search"
              item-key="id"
              @page-count="pageCount = $event"
            >
              <template v-slot:[`item.idrealestate`]="{ item }">
                <div class="d-flex justify-center">
                  <span class="grey--text text--darken-1 font-weight-bold">
                    {{ item.idrealestate }}
                  </span>
                </div>
              </template>

              <template v-slot:[`item.comercialname`]="{ item }">
                <div class="d-flex">
                  <v-avatar size="40">
                    <img :src="getAvatarDefault(item.name)" />
                  </v-avatar>
                  <div class="d-flex flex-column ml-2">
                    <span
                      class="
                        font-weight-bold
                        subtitle-1
                        grey--text
                        text--darken-1 text-sm-body-2
                        cols-ui
                      "
                    >
                      {{ item.name }}
                    </span>
                    <div class="d-flex flex-column">
                      <span class="text--secondary text-body-2">{{
                        item.comercialname
                      }}</span>
                    </div>
                  </div>
                </div>
              </template>
              <template v-slot:[`item.name`]="{}"> </template>

              <template v-slot:[`item.realestateadmin`]="{ item }">
                <span
                  class="
                    font-weight-regular
                    subtitle-1
                    grey--text
                    text--darken-1 text-sm-body-2
                  "
                  >{{ item.realestateadmin }}</span
                >
              </template>

              <template v-slot:[`item.city`]="{ item }">
                <span
                  class="
                    font-weight-regular
                    subtitle-1
                    grey--text
                    text--darken-1 text-sm-body-2
                  "
                  >{{ item.city }}</span
                >
              </template>

              <template v-slot:[`item.phone`]="{ item }">
                <span
                  class="
                    font-weight-regular
                    subtitle-1
                    grey--text
                    text--darken-1 text-sm-body-2
                  "
                  >{{ item.phone | formatPhone }}</span
                >
              </template>

              <template v-slot:[`item.id`]="{}"></template>

              <template v-slot:[`item.action`]="{ item }">
                <action-table-real-estate :infosCompany="item" />
              </template>

              <template slot="no-data">
                <img
                  src="@/assets/images/undraw_empty_xct9.svg"
                  alt="Nenhum dado disponível"
                  width="250"
                  class="pt-10"
                />

                <h1 class="mb-0">Nenhum dado disponível</h1>
              </template>

              <template slot="no-results">
                <img
                  src="@/assets/images/undraw_void_3ggu.svg"
                  alt="Nenhum dado disponível"
                  width="250"
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
  </v-app>
</template>

<script>
import { getAvatarDefault, formatPhone } from "@/utils/utils.js";
import { GET_REDIRECT } from "@/core/store/velo-imobiliaria/register.module.js";
import { GET_LIST_REALESTATE } from "@/core/store/velo-imobiliaria/realEstate.module.js";
import { mapGetters } from "vuex";
import { getListRealestate } from "@/core/service/velo-imobiliaria/realEstateForm.service.js";
import { getSessionUser, personActions } from "@/core/service/core.service.js";
import ActionTableRealEstate from "@/views/realestate/ActionTableRealEstate.vue";

export default {
  components: { ActionTableRealEstate },
  data() {
    return {
      itemsPerPage: 5,
      page: 1,
      pageCount: 0,
      search: "",
      headers: [
        {
          text: "Id",
          value: "idrealestate",
          align: "center",
          class: "data-table-head grey--text subtitle-1 font-weight-medium",
        },
        {
          text: "Nome/Razão Social",
          value: "comercialname",
          class: "data-table-head grey--text subtitle-1 font-weight-medium",
          width: "30%",
        },

        {
          text: "Administrador",
          value: "realestateadmin",
          class: "text-left grey--text subtitle-1 font-weight-medium",
          width: "20%",
        },
        {
          text: "Cidade",
          value: "city",
          class: "text-left grey--text subtitle-1 font-weight-medium",
        },
        {
          text: "Telefone",
          value: "phone",
          class: "text-left grey--text subtitle-1 font-weight-medium",
        },

        {
          text: "",
          value: "name",
          sortable: false,
        },
        {
          text: "",
          value: "action",
          sortable: false,
        },
      ],
      items: [{ title: "Detalhes", icon: "mdi-open-in-new" }],
      itemsBreadcrumb: [
        {
          text: "Imobiliárias",
          disabled: true,
          to: "/",
        },
      ],
      idPerson: null,
      cpf: null,
      clientperson: null,
      nome: null,
      endereco: null,
      bairro: null,
      estado: null,
      numero: null,
      cep: null,
    };
  },
  filters: {
    formatPhone(value) {
      return formatPhone(value);
    },
  },
  mounted() {
    this.getSession();
  },
  created() {
    getListRealestate()
      .then(({ data }) => {
        if (data.result) {
          this.$store.dispatch(GET_LIST_REALESTATE, data.return);
        } else {
          this.$toast.error(
            "Ocorreu um erro e não foi possivel trazer a lista de imobiliarias"
          );
        }
      })
      .catch(() => {
        this.$toast.error(
          "Ocorreu um erro e não foi possivel trazer a lista de imobiliarias"
        );
      });

    this.getAvatarDefault();
  },
  computed: {
    ...mapGetters(["getListRealestates"]),
  },
  methods: {
    getAvatarDefault,

    addRealestate() {
      this.$store.dispatch(GET_REDIRECT, true);
      this.$router.push("/registro-imobiliaria");
    },

    getSession() {
      getSessionUser().then((sessionUser) => {
        const { idperson, name } = sessionUser.data.return[0];

        this.idPerson = idperson;
        this.nome = name;

        this.getPerson(idperson).then((response) => {
          const { id, document } = response.data.return[0];

          this.cpf = document;
          this.clientperson = id;
        });
      });
    },

    async getPerson(id) {
      personActions.getId(id).then((person) => {
        return person.data.return[0];
      });
    },
  },
};
</script>

<style>
.text-start:nth-child(6) {
  display: none;
}

.inputSearchRealEstate {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

.inputSearchRealEstate .v-text-field__details {
  display: none !important;
}

.inputSearchRealEstate .v-input__slot {
  margin-bottom: 0 !important;
}
</style>
