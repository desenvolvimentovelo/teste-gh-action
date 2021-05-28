<template>
  <v-app class="fianca" style="background-color: #ececec">
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
        class="mx-3 mb-3"
      >
        <v-container fluid class="h-100 pa-10" style="min-heigth: 93vh">
          <div class="w-100 mx-auto d-flex align-center">
            <span class="text-h5 grey--text text--darken-2 font-weight-bold">
              Fianças
            </span>

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
            </header>
          </div>

          <v-divider class="mt-8"></v-divider>

          <div class="d-flex align-center w-100 mx-auto mb-3">
            <v-col md="4" xs="12" class="pa-0">
              <v-text-field
                placeholder="Busca"
                clearable
                v-model="search"
              ></v-text-field>
            </v-col>

            <v-col class="d-flex justify-end pr-0" xs="12" md="8">
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

              <FilterDate typefianca="fianca" />
            </v-col>
          </div>

          <v-slide-group multiple show-arrows class="mt-2 mb-5">
            <v-slide-item>
              <div
                v-if="getLoadingInfosFianca"
                class="w-100 mx-auto mx-lg-0 d-flex"
              >
                <v-col
                  @click="changeTab(item.statusName)"
                  v-for="(item, index) of getFiancaStatus"
                  :key="index"
                  style="cursor: pointer"
                  class="py-0"
                >
                  <number-status
                    :value="0"
                    :percentage="0"
                    :status="item"
                    color="primary"
                  />
                </v-col>
              </div>

              <div v-else class="w-100 mx-auto mx-lg-0 d-flex">
                <v-col
                  @click="changeTab(item.statusname)"
                  v-for="(item, index) of getInfoFianca"
                  :key="index"
                  style="cursor: pointer"
                  class="py-0"
                >
                  <number-status
                    :value="item.total"
                    :status="item.statusname"
                    :percentage="item.percentage"
                    :color="item.color"
                  />
                </v-col>
              </div>
            </v-slide-item>
          </v-slide-group>

          <v-data-table
            :headers="headers"
            :items="getViewProposeactive"
            :items-per-page="itemsPerPage"
            class="elevation-0 w-100"
            :hide-default-footer="true"
            :page.sync="page"
            :search="search"
            item-key="id"
            @page-count="pageCount = $event"
            id="table-fianca"
          >
            <template v-slot:[`item.id`]="{ item }">
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
            </template>

            <template v-slot:[`item.responsiblename`]="{ item }">
              <v-avatar size="40" class="mr-3">
                <img :src="getAvatarDefault(item.realtorname)" />
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
                {{ item.responsiblename }}
              </span>
            </template>

            <template v-slot:[`item.realtorname`]="{ item }">
              <span
                class="
                  font-weight-regular
                  grey--text
                  text--darken-1 text-sm-body-2
                "
                style="font-size: 0.95rem"
              >
                {{ item.realtorname }}
              </span>
            </template>

            <template v-slot:[`item.begin`]="{ item }">
              <span
                class="
                  font-weight-regular
                  subtitle-1
                  grey--text
                  text--darken-1 text-sm-body-2
                "
                >{{ item.begin | formatDate() }}
              </span>
            </template>

            <template v-slot:[`item.statusname`]="{ item }">
              <div class="d-flex align-center">
                <div>
                  <div
                    class="ballColorStatus mr-3"
                    v-bind:style="{
                      'background-color': statusBorder(item.statusname),
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
                  {{ item.statusname }}
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
            <v-pagination
              v-model="page"
              :length="pageCount"
              :total-visible="6"
            ></v-pagination>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import {
  GET_FILTER_FIANCA_DATE,
  GET_STATE_FILTER_FIANCA,
  GET_VIEW_PROPOSE_ACTIVE,
  GET_FIANCA_STATUS,
  GET_INFO_FIANCA,
} from "@/core/store/velo-fianca/fianca.module.js";

import dayjs from "dayjs";
import { mapGetters } from "vuex";
import FilterDate from "@/views/velofianca/propose/dialogs/DialogFilterData";
import NumberStatus from "../../velofianca/propose/NumberStatus.vue";
import { getAvatarDefault } from "@/utils/utils.js";
import ActionTable from "./Actiontable";
export default {
  components: {
    FilterDate,
    ActionTable,
    NumberStatus,
  },
  data() {
    return {
      loadingPropose: false,
      page: 1,
      itemsPerPage: 6,
      pageCount: 0,
      tabActive: 0,

      search: "",
      text: "",
      value: "",
      headers: [
        {
          text: "Id",
          value: "id",
          class: "text-left grey--text subtitle-1 font-weight-medium",
          align: "center",
        },
        {
          text: "Responsável",
          value: "responsiblename",
          class: "text-left grey--text subtitle-1 font-weight-medium",
        },
        {
          text: "Corretor",
          value: "realtorname",
          class: "text-left grey--text subtitle-1 font-weight-medium",
        },
        {
          text: "Início",
          value: "begin",
          class: "text-left grey--text subtitle-1 font-weight-medium",
        },
        {
          text: "Status",
          value: "statusname",
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
          text: "Fiança",
          disabled: true,
          to: "/",
        },
      ],
    };
  },

  mounted() {
    this.$store.dispatch(GET_VIEW_PROPOSE_ACTIVE);
    this.$store.dispatch(GET_FIANCA_STATUS);
    this.$store.dispatch(GET_INFO_FIANCA, true);
    this.getAvatarDefault();
  },

  computed: {
    ...mapGetters([
      "getViewProposeactive",
      "getFilter",
      "getFilteredFianca",
      "getLoadingInfosFianca",
      "getFiancaStatus",
      "getInfoFianca",
    ]),
  },

  filters: {
    formatDate(value) {
      return dayjs(value).format("DD/MM/YYYY");
    },
  },

  methods: {
    getAvatarDefault,

    statusBorder(statusname) {
      switch (statusname.toUpperCase()) {
        case "REGULAR":
          return "#40b540";

        case "CONFERÊNCIA":
          return "#12a0f3";

        case "OCORRÊNCIA":
          return "#567e0c8f";

        case "CANCELADA":
          return "#f30000";
        case "TODOS":
          return "#666";
        default:
          throw new TypeError(
            `O status ${statusname} não existe como uma opção no switch!`,
            "fianca.vue"
          );
      }
    },

    removeFilter() {
      this.$store.dispatch(GET_FILTER_FIANCA_DATE, this.getFilteredFianca);
      this.$store.dispatch(GET_STATE_FILTER_FIANCA, false);
      this.search = "";
      this.tabActive = 0;
    },
    changeTab(item) {
      if (item) {
        if (item === "Todos") {
          this.$store.dispatch(GET_FILTER_FIANCA_DATE, this.getFilteredFianca);
        } else {
          let result = this.getFilteredFianca.filter(
            (fianca) => fianca.statusname.toLowerCase() === item.toLowerCase()
          );

          this.$store.dispatch(GET_FILTER_FIANCA_DATE, result);
        }
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
</style>
