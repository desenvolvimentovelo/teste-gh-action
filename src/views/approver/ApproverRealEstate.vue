<template>
  <v-row class="w-100 mx-auto">
    <v-data-table
      :headers="headers"
      :items="getRealEstateAll"
      :items-per-page="itemsPerPage"
      class="elevation-0 w-100"
      :hide-default-footer="true"
      :page.sync="page"
      :search="search"
      item-key="id"
      @page-count="pageCount = $event"
    >
      <template v-slot:[`item.id`]="{ item }">
        <div class="d-flex">
          <span class="grey--text text--darken-1 mr-4 font-weight-bold">{{
            item.id
          }}</span>
        </div>
      </template>

      <template v-slot:[`item.name`]="{ item }">
        <div class="d-flex">
          <v-avatar size="40">
            <img :src="getAvatarDefault(item.name)" />
          </v-avatar>
          <div class="d-flex flex-column ml-2">
            <span
              class="font-weight-bold subtitle-1 grey--text text--darken-1 text-sm-body-2 cols-ui"
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
      <template v-slot:[`item.comercialname`]="{}"> </template>
      <template v-slot:[`item.document`]="{ item }">
        <span
          class="font-weight-regular subtitle-1 grey--text text--darken-1 text-sm-body-2 text-left"
          >{{ item.document | formatCNPJ() }}</span
        >
      </template>

      <template v-slot:[`item.city`]="{ item }">
        <span
          class="font-weight-regular subtitle-1 grey--text text--darken-1 text-sm-body-2"
          >{{ item.city }}</span
        >
      </template>

      <template v-slot:[`item.phone`]="{ item }">
        <span
          class="font-weight-regular subtitle-1 grey--text text--darken-1 text-sm-body-2"
        >
          {{ item.phone | formatContact() }}</span
        >
      </template>

      <template v-slot:[`item.item`]="{ item }">
        <ActionTable :infosaproverRealtEstate="item" />
      </template>

      <template slot="no-data">
        <img
          src="@/assets/images/undraw_empty_xct9.svg"
          alt="Nenhum dado disponível"
          width="200"
          class="my-3"
        />

        <h2 class="my-0">Nenhuma imobiliária para aprovação!</h2>
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
    <div class="text-center d-flex justify-end w-100 py-3">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="6"
      ></v-pagination>
    </div>
  </v-row>
</template>

<script>
import { cnpj } from "cpf-cnpj-validator";
import { mapGetters } from "vuex";
import { getAvatarDefault, formatPhone } from "@/utils/utils.js";
import ActionTable from "./Actiontable";
import { GET_VIEW_APPROVER_ESTATE } from "@/core/store/velo-fianca/RealEstate.module.js";

export default {
  name: "tab-imobiliaria",
  props: {
    item: String,
  },

  components: {
    ActionTable,
  },

  filters: {
    formatCNPJ(value) {
      if (value) {
        return cnpj.format(value);
      }
    },

    formatContact(value) {
      if (value) {
        return formatPhone(value);
      }
    },
  },

  data() {
    return {
      loadingPropose: false,
      page: 1,
      itemsPerPage: 6,
      pageCount: 0,
      tabActive: 0,
      active: null,
      search: "",
      text: "",
      value: "",
      headers: [
        {
          text: "Id",
          value: "id",
          class: " px-md-0 text-left grey--text subtitle-1 font-weight-medium",
        },
        {
          text: "Nome/Razão Social",
          value: "name",
          class: "text-left grey--text subtitle-1 font-weight-medium",
          width: "50%",
        },
        {
          text: "CNPJ",
          value: "document",
          class: "text-left grey--text subtitle-1 font-weight-medium",
          width: "18%",
        },
        {
          text: "Cidade",
          value: "city",
          class: "text-left grey--text subtitle-1 font-weight-medium",
          width: "17%",
        },

        {
          text: "Telefone",
          value: "phone",
          class: "text-left grey--text subtitle-1 font-weight-medium",
          width: "20%",
        },

        {
          text: "",
          value: "item",
          sortable: false,
          width: "5%",
        },
      ],
      itemsBreadcrumb: [
        {
          text: "Imobiliaria",
          disabled: true,
          to: "/",
        },
      ],
    };
  },

  mounted() {
    this.$store.dispatch(GET_VIEW_APPROVER_ESTATE);
    this.getAvatarDefault();
  },

  computed: {
    ...mapGetters(["getRealEstateAll"]),
  },

  methods: {
    getAvatarDefault,
  },
};
</script>

<style lang="scss">
@import "../../assets/sass/main.scss";
@import "../../assets/sass/pages/proposes.scss";
.v-list {
  padding: 0px 0;
}

@media (max-width: 1085px) {
  img {
    margin-top: 0px;
    height: 32px;
    margin-left: -12px;
  }
}

// .text-start:nth-child(5) {
//   display: none;
// }
</style>
