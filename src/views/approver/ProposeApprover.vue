<template>
  <v-row class="w-100 mx-auto">
    <v-data-table
      :headers="headers"
      :items="getViewAprovespending"
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
                  <span class="grey--text text--darken-1  mr-4 font-weight-bold">{{
                    item.id
                  }}</span>
                </div>
              </template>
      <template v-slot:[`item.name`]="{ item }">
        <div
          class="d-flex pa-0 pl-0 justify-center justify-md-start align-center flex-column flex-md-row text-center text-md-left"
        >


          <v-avatar size="40">
            <img :src="getAvatarDefault(item.name)" />
          </v-avatar>

          <div class="ml-md-5 d-flex justify-space-around flex-column py-2">
            <span
              class="font-weight-bold subtitle-1 grey--text text--darken-1 text-sm-body-2 cols-ui"
              > {{ item.name | capitalizeName() }}</span
            >
          </div>
        </div>
      </template>

      <template v-slot:[`item.proposetype`]="{ item }">
        <div class="d-flex align-start pa-0 pl-0 ">
        <span
          class="font-weight-regular subtitle-1 grey--text text--darken-1 text-sm-body-2"
          >{{ item.proposetype }}</span
        >
        </div>
      </template>

      <template v-slot:[`item.aprovation`]="{ item }">
        <span
          class="font-weight-regular  subtitle-1 grey--text text--darken-1 text-sm-body-2 teste"
        >
          {{ item.aprovation }}%
        </span>
      </template>

      <template v-slot:[`item.score`]="{ item }">
        <div class="d-flex align-start pa-0 pl-0 ">
          <img style="width: 50px" :src="getImageScore(item.score)" />

          <span
            class="font-weight-regular subtitle-1 grey--text text--darken-1 text-sm-body-2 ml-2 d-flex align-start"
            >{{ item.score }} Pts</span
          >
        </div>
      </template>

      <!-- <template v-slot:[`item.id`]=""></template> -->


      <template v-slot:[`item.risk`]="{ item }">
        <v-row class="d-flex pa-0 pl-0">
          <v-col>
            <span
              class="font-weight-regular subtitle-1 grey--text text--darken-1 text-sm-body-2"
            >
              {{ item.risk }}</span
            >
          </v-col>
        </v-row>
      </template>

      <template v-slot:[`item.item`]="{ item }">
        <div class="d-flex justify-center">
          <actiontableproposta :infosaprover="item" />
        </div>
      </template>

      <template slot="no-data">
        <img
          src="@/assets/images/undraw_empty_xct9.svg"
          alt="Nenhum dado disponível"
          width="200"
          class="my-3"
        />

        <h2 class="my-0">Nenhuma proposta para aprovação!</h2>
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
import { mapGetters } from "vuex";
import { getAvatarDefault, CapitalizeString } from "@/utils/utils.js";
import { GET_VIEW_APPROVER } from "@/core/store/velo-fianca/approver.module.js";
import Actiontableproposta from "./Actiontableproposta.vue";
export default {
  name: "tab-propose",
  props: {
    item: String,
  },
  components: {
    Actiontableproposta,
  },
  data() {
    return {
      img: "@/assets/images/REGULAR_3.png",
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
          class:"px-md-0 text-left grey--text subtitle-1 font-weight-medium ",
        
        },
        {
          text: "Nome",
          value: "name",
          class:
            "data-table-head  text-left grey--text subtitle-1 font-weight-medium",
            width: "40%",
        },
        {
          text: "Tipo",
          value: "proposetype",
          class: " grey--text subtitle-1 font-weight-medium",
           width: "18%",
        },
        {
          text: "Aprovação",
          value: "aprovation",
          class: "px-md-0 text-left-0 grey--text subtitle-1 text-centerap font-weight-medium",
          width: "18%",
        },
        {
          text: "Pontuação",
          value: "score",
          class: "text-left  px-md-0 grey--text subtitle-1 font-weight-medium",
            // width: "18%",
          },
      
        {
          text: "Risco",
          value: "risk",
          class: "px-md-0 text-left grey--text subtitle-1 font-weight-medium",
         width: "18%",
          
        },
      
        {
          text: "",
          value: "item",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch(GET_VIEW_APPROVER);
    this.getAvatarDefault();
  },
  filters: {
    capitalizeName(name) {
      if (name) {
        return CapitalizeString(name);
      }
    },
  },
  computed: {
    ...mapGetters(["getViewAprovespending"]),
  },
  methods: {
    getAvatarDefault,

    getImageScore(score) {
      let imageName = "BAIXO_1.png";

      if (!score) {
        return;
      }

      if (score > 200) {
        imageName = "BAIXO_2.png";
      }

      if (score > 300) {
        imageName = "BAIXO_3.png";
      }

      if (score > 400) {
        imageName = "REGULAR_1.png";
      }

      if (score > 500) {
        imageName = "REGULAR_2.png";
      }

      if (score > 600) {
        imageName = "REGULAR_3.png";
      }

      if (score > 700) {
        imageName = "BOM_1.png";
      }

      if (score > 800) {
        imageName = "BOM_2.png";
      }

      if (score > 900) {
        imageName = "BOM_3.png";
      }

      return require(`@/assets/images/${imageName}`);
    },
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
.teste{
  margin-left: 20px;
}
// .text-start:nth-child(7) {
//   display: none;
// }
</style>
