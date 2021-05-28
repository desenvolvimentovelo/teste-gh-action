<template>
  <div>
    <div
      class="
        mx-3
        mb-3
        my-auto
        mt-lg-3
        grey--text
        text--darken-2
        font-weight-regular
      "
    >
      <span class="text-h6 font-weight-bold">
        {{ persondetailpropose.persontype }}
      </span>
    </div>

    <v-card class="w-100" height="100%" elevation="1" outlined rounded="lg">
      <v-card-text>
        <div class="d-sm-flex px-3">
          <v-col class="d-flex align-center justify-center pt-0" cols="1">
            <img
              :src="getAvatarDefault(persondetailpropose.name)"
              alt="Profile"
              class="rounded-circle"
              style="width: 104px; height: 104px"
            />
          </v-col>

          <div class="d-flex flex-column w-100 pl-6">
            <div class="pl-0 grey--text text--darken-2 font-weight-regular">
              <span class="text-h6 grey--text text--darken-2 font-weight-bold">
                {{ persondetailpropose.name || "-" | capitalizeName() }}
              </span>
            </div>

            <div class="d-flex">
              <v-col class="d-flex pb-0 pl-0">
                <part-info
                  title="Renda"
                  :data="persondetailpropose.rental | formatCurrency()"
                />
              </v-col>

              <v-col class="d-flex pb-0">
                <part-info title="Idade" :data="persondetailpropose.birth" />
              </v-col>

              <v-col class="d-flex pb-0">
                <part-info title="Email" :data="persondetailpropose.email" />
              </v-col>

              <v-col class="d-flex pb-0">
                <part-info
                  title="Filiação"
                  :data="persondetailpropose.mother"
                />
              </v-col>
              <v-col class="col-3 d-flex">
                <Historicpropose :persondetailpropose="persondetailpropose" />

                <ocurrence />
              </v-col>
            </div>
          </div>
        </div>

        <div class="d-flex">
          <v-col cols="2">
            <p class="grey--text text--darken-2 font-weight-regular">
              <strong>Pontuação</strong>
            </p>
            <v-row class="d-flex" no-gutters>
              <v-col class="mt-auto">
                <v-row class="pb-3 ml-0"> </v-row>

                <img
                  :src="
                    require(`@/assets/images/${getScoreImage(
                      persondetailpropose.veloscore
                    )}`)
                  "
                  alt="score"
                  style="width: 54px"
                />

                <p class="grey--text text--darken-2 font-weight-regular">
                  <strong>
                    {{ persondetailpropose.veloscore || 0 | verifyScore() }}
                    pontos
                  </strong>

                  <v-row class="mt-0 ml-0"
                    >{{
                      persondetailpropose.rentaldeclared ||
                      "R$ 0,00" | formatCurrency()
                    }}
                  </v-row>
                </p>
              </v-col>
            </v-row>
          </v-col>

          <v-col style="overflow-x: auto">
            <div class="justify-space-between">
              <p class="grey--text text--darken-2 font-weight-regular">
                <strong>Anexos</strong>
              </p>

              <div class="d-flex flex-column">
                <div v-if="dadosanexo.length > 0">
                  <v-slide-group show-arrows>
                    <v-slide-item
                      v-for="(item, index) in dadosanexo"
                      class="mx-3"
                      v-bind:class="{ 'ml-2': index === 0 }"
                      :key="index"
                    >
                      <CardAnexo :anexo="item" :index="index" />
                    </v-slide-item>
                  </v-slide-group>
                </div>

                <div v-else>
                  <v-col class="pl-0">
                    <span class="subtitle-2">
                      Essa pessoa não possui anexos
                    </span>
                  </v-col>
                </div>
              </div>
            </div>
          </v-col>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CardAnexo from "../velofianca/propose/cards/CardAnexo.vue";
import { CapitalizeString } from "@/utils/utils.js";
import { getPersondocument } from "../../core/service/velo-fianca/proposedetail.service";
import PartInfo from "./PartInfo.vue";
import Historicpropose from "./Historicpropose.vue";
import { getAvatarDefault } from "@/utils/utils.js";
import ocurrence from "./Occurrence";
export default {
  components: { CardAnexo, PartInfo, Historicpropose, ocurrence },

  props: {
    persondetailpropose: {},
    persondocument: {
      type: Array,
    },
  },

  data() {
    return {
      selection: 0,
      dadosanexo: [],
    };
  },

  filters: {
    verifyScore(value) {
      if (value) {
        return value;
      } else {
        return 0;
      }
    },

    capitalizeName(name) {
      if (name) {
        return CapitalizeString(name);
      }
    },
  },

  methods: {
    getAvatarDefault,

    getScoreImage(score) {
      if (score < 200) return "BAIXO_2.png";
      if (score > 300) return "BAIXO_3.png";
      if (score > 400) return "REGULAR_1.png";
      if (score > 500) return "REGULAR_2.png";
      if (score > 600) return "REGULAR_3.png";
      if (score > 700) return "BOM_1.png";
      if (score > 800) return "BOM_2.png";
      if (score > 900) return "BOM_3.png";
      else return "BAIXO_1.png";
    },
  },

  mounted() {
    const datainfos = this.$route.params.id;

    getPersondocument(datainfos).then((item) => {
      this.dadosanexo = item.data.return.map((item) => ({
        ...item,
        responsible: this.persondetailpropose.name,
      }));
    });
  },
};
</script>
