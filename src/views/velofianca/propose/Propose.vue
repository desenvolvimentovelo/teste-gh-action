<template>
  <v-app id="app" class="propose" style="background-color: #ececec">
    <div style="background-color: #ececec; overflow: hidden !important">
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
        class="mx-3 mb-3 h-100 d-flex align-center"
      >
        <v-container
          fluid
          class="pa-10"
          style="overflow: auto; min-height: 93vh"
        >
          <loader-propose :view="loadingPropose" />

          <div class="w-100 mx-auto d-flex align-center">
            <div class="d-flex align-center justify-start ma-0">
              <span class="text-h5 grey--text text--darken-2 font-weight-bold">
                Propostas
              </span>
            </div>

            <header
              class="
                d-flex
                justify-end
                flex-column flex-sm-row
                w-100
                h-auto
                px-3 px-sm-0
              "
            >
              <v-btn
                disabled
                color="primary"
                class="text-capitalize"
                elevation="2"
                large
                rounded
              >
                Exportar
                <i class="las la-file-export ml-1 sizeIcons"></i>
              </v-btn>

              <dialog-new-propose />
            </header>
          </div>

          <v-divider class="mt-5"></v-divider>

          <div class="d-flex align-center w-100 mx-auto my-5">
            <v-col md="4" xs="12" class="pa-0">
              <v-text-field
                placeholder="Busca"
                clearable
                v-model="search"
                class="inputSearch"
              ></v-text-field>
            </v-col>

            <v-col class="d-flex justify-end pa-0" xs="12" md="8">
              <v-btn
                v-on:click="removeFilter"
                outlined
                color="red "
                elevation="2"
                class="mr-3 elevation-0"
                v-if="getFilter"
              >
                LIMPAR FILTROS
              </v-btn>

              <FilterDate typefianca="propose" />
            </v-col>
          </div>

          <v-slide-group multiple show-arrows>
            <v-slide-item>
              <div
                v-if="getLoadingInfos"
                class="w-100 mb-5 mx-auto mx-lg-0 d-flex"
              >
                <v-col
                  @click="changeTab(item.statusName)"
                  v-for="(item, index) of getProposeStatus"
                  :key="index"
                  style="cursor: pointer"
                  class="py-0 px-2"
                  v-bind:class="{
                    'pl-0': index === 0,
                    'pr-0': index === getInfoPropose.length - 1,
                  }"
                >
                  <number-status
                    :value="0"
                    :percentage="0"
                    :status="item"
                    color="primary"
                  />
                </v-col>
              </div>

              <div v-else class="w-100 mb-5 mx-auto mx-lg-0 d-flex">
                <v-col
                  @click="changeTab(item.statusName)"
                  v-for="(item, index) of getInfoPropose"
                  :key="index"
                  style="cursor: pointer"
                  class="py-0 px-2"
                  v-bind:class="{
                    'pl-0': index === 0,
                    'pr-0': index === getInfoPropose.length - 1,
                  }"
                >
                  <number-status
                    :value="item.total"
                    :status="item.statusName"
                    :percentage="item.percentage"
                    :color="item.color"
                  />
                </v-col>
              </div>
            </v-slide-item>
          </v-slide-group>

          <div class="w-100 mx-auto">
            <v-data-table
              :headers="headers"
              :items="getViewPropose"
              :items-per-page="itemsPerPage"
              class="elevation-0 w-100"
              :hide-default-footer="true"
              :page.sync="page"
              :search="search"
              item-key="id"
              @page-count="pageCount = $event"
              id="table-propose"
            >
              <template v-slot:[`item.id`]="{ item }">
                <div class="d-flex pa-1 pl-5 cols-ui">
                  <div
                    class="ml-md-5 d-flex justify-space-around flex-column py-2"
                  >
                    <span
                      class="
                        font-weight-bold
                        subtitle-1
                        grey--text
                        text--darken-1 text-sm-body-2
                        cols-ui
                      "
                    >
                      {{ item.id }}
                    </span>
                  </div>
                </div>
              </template>

              <template v-slot:[`item.name`]="{ item }">
                <div class="d-flex align-center">
                  <v-avatar size="40" class="mr-3">
                    <img :src="getAvatarDefault(item.name)" />
                  </v-avatar>
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
                </div>
              </template>

              <template
                v-slot:[`item.realtorname`]="{ item }"
                class="v-data-table__mobile-row-custom"
              >
                <v-row>
                  <v-col>
                    <span
                      class="
                        font-weight-regular
                        subtitle-1
                        grey--text
                        text--darken-1 text-sm-body-2
                      "
                      >{{ item.realtorname }}</span
                    >
                  </v-col>
                </v-row>
              </template>

              <template
                v-slot:[`item.nametype`]="{ item }"
                class="v-data-table__mobile-row-custom"
              >
                <v-row>
                  <v-col>
                    <span
                      class="
                        font-weight-regular
                        subtitle-1
                        grey--text
                        text--darken-1 text-sm-body-2
                      "
                      >{{ item.nametype }}</span
                    >
                  </v-col>
                </v-row>
              </template>

              <template
                v-slot:[`item.date`]="{ item }"
                class="v-data-table__mobile-row-custom"
              >
                <v-row>
                  <v-col>
                    <span
                      class="
                        font-weight-regular
                        subtitle-1
                        grey--text
                        text--darken-1 text-sm-body-2
                      "
                      >{{ item.date }}</span
                    >
                  </v-col>
                </v-row>
              </template>

              <template
                v-slot:[`item.status`]="{ item }"
                class="v-data-table__mobile-row-custom"
              >
                <div class="d-flex align-center">
                  <div>
                    <div
                      class="ballColorStatus mr-3"
                      v-bind:style="{
                        'background-color': statusBorder(item.status),
                      }"
                    ></div>
                  </div>

                  <span
                    class="
                      font-weight-regular
                      subtitle-1
                      grey--text
                      text--darken-1 text-sm-body-2
                    "
                  >
                    {{ item.status }}
                  </span>
                </div>
              </template>

              <template v-slot:[`item.item`]="{ item }">
                <action-table :infosPropose="item" />
              </template>

              <template slot="no-data">
                <img
                  src="@/assets/images/undraw_empty_xct9.svg"
                  alt="Nenhum dado disponível"
                  width="200"
                  class="my-3"
                />

                <h2 class="my-0">Nenhuma proposta encontrada</h2>
              </template>

              <template slot="no-results">
                <img
                  src="@/assets/images/undraw_void_3ggu.svg"
                  alt="Nenhum dado disponível"
                  width="200"
                  class="my-3"
                />

                <h2 class="my-0">Nenhum resultado encontrado</h2>
              </template>
            </v-data-table>

            <div class="text-center d-flex justify-end w-100">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="6"
              ></v-pagination>
            </div>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import {
  GET_FILTER_DATE,
  GET_STATE_FILTER,
  GET_VIEW_PROPOSE,
} from "@/core/store/velo-fianca/propose.module.js";
import { mapGetters } from "vuex";
import NumberStatus from "./NumberStatus.vue";
import FilterDate from "@/views/velofianca/propose/dialogs/DialogFilterData";
import DialogNewPropose from "./dialogs/DialogNewPropose.vue";
import { getAvatarDefault } from "@/utils/utils.js";
import LoaderPropose from "../../components/widgets/LoaderPropose.vue";
import ActionTable from "./ActionTable.vue";
import $ from "jquery";
import { getAllProposes } from "@/core/service/core.service.js";
import dayjs from "dayjs";

export default {
  components: {
    FilterDate,
    DialogNewPropose,
    NumberStatus,
    LoaderPropose,
    ActionTable,
  },
  data() {
    return {
      loadingPropose: false,
      page: 1,
      itemsPerPage: 10,
      pageCount: 0,
      tabActive: 0,
      search: "",
      text: "",
      value: "",
      headers: [
        {
          text: "Id",
          value: "id",
          class: "grey--text subtitle-1 font-weight-medium",
          align: "center",
        },
        {
          text: "Locatario",
          value: "name",
          class: "text-left grey--text subtitle-1 font-weight-medium",
        },
        {
          text: "Corretor",
          value: "realtorname",
          class: "text-left grey--text subtitle-1 font-weight-medium",
        },
        {
          text: "Tipo",
          value: "nametype",
          class: "text-left grey--text subtitle-1 font-weight-medium",
        },
        {
          text: "Data",
          value: "date",
          class: "text-left grey--text subtitle-1 font-weight-medium",
        },
        {
          text: "Status",
          value: "status",
          class: "text-left grey--text subtitle-1 font-weight-medium",
        },
        {
          text: "",
          value: "item",
          sortable: false,
        },
      ],
      itemsBreadcrumb: [
        {
          text: "Propostas",
          disabled: true,
          to: "/",
        },
      ],
    };
  },

  mounted() {
    this.getAvatarDefault();

    getAllProposes().then(({ data }) => {
      const result = data.return.map((item) => ({
        ...item,
        date: dayjs(item.date).format("DD/MM/YYYY"),
      }));

      this.$store.dispatch(GET_VIEW_PROPOSE, result);
    });
  },

  computed: {
    ...mapGetters([
      "getViewPropose",
      "getFilteredProposes",
      "getFilter",
      "getInfoPropose",
      "getProposeStatus",
      "getLoadingInfos",
    ]),
  },

  methods: {
    getAvatarDefault,

    statusBorder(status) {
      switch (status.toUpperCase()) {
        case "EM AVALIAÇÃO":
          return "#c2ce1b";

        case "PAGAMENTO":
          return "#9b3ee7";

        case "REPROVADO":
          return "#f36c33";

        case "ATIVADA":
          return "#36a2eb";

        case "EM ASSINATURA":
          return "#bb840e";

        case "INICIADA":
          return "#ff00c3";

        case "AFIANÇADO":
          return "#40b540";

        case "CANCELADA":
          return "#f30000";

        case "AGUARDANDO DOCUMENTOS":
          return "#172e96";

        case "EM ANÁLISE":
          return "#0d8e69";

        default:
          throw new TypeError(
            `O status ${status} não existe como uma opção no switch!`,
            "propose.vue"
          );
      }
    },

    removeFilter() {
      this.$store.dispatch(GET_FILTER_DATE, this.getFilteredProposes);
      this.$store.dispatch(GET_STATE_FILTER, false);
      this.search = "";
      this.tabActive = 0;
    },

    changeTab(item) {
      if (item === "Todos") {
        this.$store.dispatch(GET_FILTER_DATE, this.getFilteredProposes);
      } else {
        let result = this.getFilteredProposes.filter(
          (propose) => propose.status.toLowerCase() === item.toLowerCase()
        );
        this.$store.dispatch(GET_FILTER_DATE, result);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/sass/main.scss";
@import "../../../assets/sass/pages/proposes.scss";
.v-list {
  padding: 0px 0;
}

.v-input__slot {
  margin-bottom: 0;
}

.v-input {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.inputSearch .v-text-field__details {
  display: none !important;
}

.v-data-table .v-data-table__wrapper .v-data-table__mobile-row {
  min-height: 0px !important;
}
.v-data-table__mobile-row {
  display: flex !important;
}
.v-data-table__mobile-table-row .v-data-table__mobile-row:nth-child(1) {
  display: block !important;
}
</style>
