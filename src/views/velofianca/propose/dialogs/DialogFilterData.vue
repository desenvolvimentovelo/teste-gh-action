<template>
  <v-dialog v-model="stateModal" max-width="330">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="grey darken-1 white--text"
        elevation="2"
        class="elevation-0 mr-2"
        v-bind="attrs"
        v-on="on"
      >
        <i class="las la-calendar mr-2 sizeIcons"></i>
        {{ new Date() | formatDate() }}
      </v-btn>
    </template>

    <v-card class="white" elevation="0">
      <v-card-title class="d-flex justify-space-between green">
        <span class="white--text font-weight-regular">Filtro de data</span>

        <v-btn
          elevation="0"
          fab
          small
          style="
            background-color: Transparent;
            background-repeat: no-repeat;
            overflow: hidden;
          "
          v-on:click="
            stateModal = !stateModal;
            disableCustomFilter = true;
          "
        >
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row class="mt-0">
          <v-col cols="6" v-on:click="filterDays(7)" class="pr-2">
            <v-btn
              style="width: 100%; height: 80px; border-top: 3px solid #4abc42"
              elevation="1"
            >
              <div class="d-flex flex-column">
                <h4
                  class="grey--text text-capitalize subtitle-1 font-weight-regular"
                >
                  Últimos
                </h4>
                <h5
                  class="green--text text-capitalize text-h6 font-weight-bold"
                >
                  7 Dias
                </h5>
              </div>
            </v-btn>
          </v-col>

          <v-col cols="6" v-on:click="filterDays(15)" class="pl-2">
            <v-btn
              style="width: 100%; height: 80px; border-top: 3px solid #4abc42"
              elevation="1"
            >
              <div class="d-flex flex-column">
                <h4
                  class="grey--text text-capitalize subtitle-1 font-weight-regular"
                >
                  Últimos
                </h4>
                <h5
                  class="green--text text-capitalize text-h6 font-weight-bold"
                >
                  15 Dias
                </h5>
              </div>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6" v-on:click="filterDays(30)" class="pr-2">
            <v-btn
              style="width: 100%; height: 80px; border-top: 3px solid #4abc42"
              elevation="1"
            >
              <div class="d-flex flex-column">
                <h4
                  class="grey--text text-capitalize subtitle-1 font-weight-regular"
                >
                  Últimos
                </h4>
                <h5
                  class="green--text text-capitalize text-h6 font-weight-bold"
                >
                  30 Dias
                </h5>
              </div>
            </v-btn>
          </v-col>

          <v-col cols="6" v-on:click="filterDays(60)" class="pl-2">
            <v-btn
              style="width: 100%; height: 80px; border-top: 3px solid #4abc42"
              elevation="1"
            >
              <div class="d-flex flex-column">
                <h4
                  class="grey--text text-capitalize subtitle-1 font-weight-regular"
                >
                  Últimos
                </h4>
                <h5
                  class="green--text text-capitalize text-h6 font-weight-bold"
                >
                  60 Dias
                </h5>
              </div>
            </v-btn>
          </v-col>
        </v-row>

        <h4 class="font-weight-medium text-capitalize mt-4">Período mensal</h4>

        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              prepend-inner-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              color="primary"
              v-model="monthlyFormatted"
              class="mb-0"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="date"
            type="month"
            no-title
            scrollable
            locale="pt"
            color="primary"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancelar </v-btn>
            <v-btn @click="filterMonthly" text color="primary text-capitalize">
              Filtrar
            </v-btn>
          </v-date-picker>
        </v-menu>

        <span class="font-weight-medium text-capitalize"
          >Período Personalizado</span
        >

        <v-row>
          <v-col class="mt-1 pb-0" cols="6">
            <v-menu
              ref="menuDtDe"
              min-width="auto"
              v-model="menuDtDe"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-model="dtDeFormatted"
                  label="De"
                  readonly
                  v-on="on"
                  @click="isCustomPeriod($event)"
                ></v-text-field>
              </template>
              <v-date-picker
                color="primary"
                v-model="dtDe"
                no-title
                scrollable
                locale="pt"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6" class="mt-1 pb-0">
            <v-menu
              ref="menuDtAte"
              min-width="auto"
              v-model="menuDtAte"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-model="dtAteFormatted"
                  label="Até"
                  readonly
                  v-on="on"
                  @click="isCustomPeriod($event)"
                ></v-text-field>
              </template>
              <v-date-picker
                color="primary"
                v-model="dtAte"
                no-title
                scrollable
                locale="pt"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-btn
            @click="filterCustom"
            block
            medium
            rounded
            color="primary text-none mb-2"
            :disabled="disableCustomFilter"
            class="mb-2"
            >Filtro personalizado</v-btn
          >
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_FILTER_DATE,
  GET_STATE_FILTER,
} from "@/core/store/velo-fianca/propose.module.js";
import {
  GET_FILTER_FIANCA_DATE,
  GET_STATE_FILTER_FIANCA,
} from "@/core/store/velo-fianca/fianca.module.js";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

export default {
  data() {
    return {
      stateModal: false,
      disableCustomFilter: true,
      dtDe: new Date().toISOString().substr(0, 10),
      dtAte: new Date().toISOString().substr(0, 10),
      dtDeFormatted: this.$date(new Date().toISOString().substr(0, 10))
        .locale("pt-br")
        .format("DD/MM/YYYY"),
      dtAteFormatted: this.$date(new Date().toISOString().substr(0, 10))
        .locale("pt-br")
        .format("DD/MM/YYYY"),
      menuDtDe: false,
      menuDtAte: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      proposes: this.getViewPropose,
      fianca: this.getViewProposeactive,
      monthly: this.$date(new Date().toISOString().substr(0, 10))
        .locale("pt-br")
        .format("MMMM/YYYY"),
      monthlyFormatted: this.$date(new Date().toISOString().substr(0, 10))
        .locale("pt-br")
        .format("MMMM/YYYY"),
    };
  },

  props: {
    typefianca: String,
  },
  computed: {
    ...mapGetters([
      "getViewPropose",
      "getFilteredProposes",
      "getViewProposeactive",
      "getFilteredFianca",
    ]),
  },
  created() {
    if (this.typefianca === "propose") {
      this.proposes = this.getViewPropose;
      dayjs.extend(isBetween);
    } else {
      this.fianca = this.getViewProposeactive;
      dayjs.extend(isBetween);
    }
  },
  watch: {
    date(val) {
      this.monthlyFormatted = this.formatDateMonthly(this.date);
    },

    dtDe(val) {
      this.dtDeFormatted = this.formatDtDe(this.dtDe);
    },

    dtAte(val) {
      this.dtAteFormatted = this.formatDtAte(this.dtAte);
    },
  },
  methods: {
    filterDays(day) {
      let data =
        this.typefianca === "propose"
          ? this.getViewPropose
          : this.getViewProposeactive.map((item) => ({
              ...item,
              date: item.begin,
            }));
      let result = data.filter(({ date }) =>
        this.$date(date.split(" ")[0]).isBetween(
          dayjs().subtract(day, "day"),
          dayjs(),
          null,
          "[]"
        )
      );

      this.stateModal = false;

      this.$store.dispatch(GET_STATE_FILTER, true);
      this.$store.dispatch(GET_STATE_FILTER_FIANCA, true);
      this.$store.dispatch(GET_FILTER_DATE, result);
      this.$store.dispatch(GET_FILTER_FIANCA_DATE, result);
    },

    filterMonthly() {
      this.$refs.menu.save(this.date);
      let data =
        this.typefianca === "propose"
          ? this.getViewPropose
          : this.getViewProposeactive.map((item) => ({
              ...item,
              date: item.begin,
            }));
      let result = data.filter(
        (propose) =>
          this.$date(propose.date).format("MM/YYYY") ===
          this.$date(this.date).format("MM/YYYY")
      );

      this.stateModal = false;

      this.$store.dispatch(GET_STATE_FILTER, true);
      this.$store.dispatch(GET_STATE_FILTER_FIANCA, true);
      this.$store.dispatch(GET_FILTER_DATE, result);
      this.$store.dispatch(GET_FILTER_FIANCA_DATE, result);
    },

    filterCustom() {
      this.$refs.menuDtDe.save(this.dtDe);
      this.$refs.menuDtAte.save(this.dtAte);
      let data =
        this.typefianca === "propose"
          ? this.getViewPropose
          : this.getViewProposeactive.map((item) => ({
              ...item,
              date: item.begin,
            }));
      let result = data.filter(({ date }) =>
        this.$date(date.split(" ")[0]).isBetween(
          this.dtDe,
          this.dtAte,
          null,
          "[]"
        )
      );

      this.$store.dispatch(GET_STATE_FILTER, true);
      this.$store.dispatch(GET_STATE_FILTER_FIANCA, true);
      this.$store.dispatch(GET_FILTER_DATE, result);
      this.$store.dispatch(GET_FILTER_FIANCA_DATE, result);
      this.stateModal = !this.stateModal;
      this.disableCustomFilter = true;
    },

    formatDateMonthly(date) {
      if (!date) return null;

      return this.$date(date).locale("pt-br").format("MMMM/YYYY");
    },

    formatDtDe(dtDe) {
      if (!dtDe) return null;

      return this.$date(dtDe).locale("pt-br").format("DD/MM/YYYY");
    },

    formatDtAte(dtAte) {
      if (!dtAte) return null;

      return this.$date(dtAte).locale("pt-br").format("DD/MM/YYYY");
    },

    isCustomPeriod(event) {
      this.disableCustomFilter = !event.isTrusted;
    },
  },
};
</script>

<style scoped>
.v-dialog > .v-card > .v-card__title {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  padding: 8px 18px 8px;
}
</style>
