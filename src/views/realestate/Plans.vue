<template>
  <v-app style="background-color: #ececec">
    <div
      class="d-flex flex-column justify-start"
      style="background-color: #ececec; overflow: hidden !important"
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
        class="mx-3 mb-3 h-100"
      >
        <v-container class="h-100">
          <v-row class="d-flex align-center">
            <v-col>
              <v-card-title class="px-0">
                <v-row class="w-100 mx-auto" no-gutters>
                  <router-link
                    to="/proposta"
                    class="d-flex align-center text-decoration-none mr-5"
                  >
                    <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
                  </router-link>

                  <div v-for="({ name }, index) in allTypes" :key="index">
                    <span v-if="filters[name]">{{ name }}</span>
                  </div>
                </v-row>
              </v-card-title>
            </v-col>

            <v-col>
              <div class="w-100">
                <v-chip
                  v-for="(item, index) in allTypes"
                  :key="index"
                  @click="changeFilter(item.name)"
                  @click:close="closeFilter"
                  close-icon="mdi-close"
                  class="mx-1"
                  :close="filters[item.name]"
                  :color="filters[item.name] ? 'primary' : ''"
                  >{{ item.name }}</v-chip
                >
              </div>
            </v-col>
          </v-row>

          <v-col
            v-if="filters.Residencial"
            class="d-flex flex-column mx-auto"
            cols="6"
          >
            <div class="d-flex">
              <v-col
                class="d-flex justify-center"
                v-for="(item, index) in itemsresidencial"
                :key="index"
              >
                <img
                  :src="require(`@/assets/images/${item.image}`)"
                  :alt="`Card ${item.name}`"
                  width="230"
                  class="imageEffect"
                  v-bind:class="{
                    imageEffectActive: item.partner,
                  }"
                  @click="activeEffect(index, 'itemsresidencial')"
                />
              </v-col>
            </div>
          </v-col>

          <v-col v-else class="d-flex flex-column mx-auto" cols="6">
            <div class="d-flex">
              <v-col
                class="d-flex justify-center"
                v-for="(item, index) in itemscomercial"
                :key="index"
              >
                <img
                  :src="require(`@/assets/images/${item.image}`)"
                  :alt="`Card ${item.name}`"
                  width="230"
                  class="imageEffect"
                  v-bind:class="{
                    imageEffectActive: item.partner,
                  }"
                  @click="activeEffect(index, 'itemscomercial')"
                />
              </v-col>
            </div>
          </v-col>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { getSessionUser } from "@/core/service/core.service.js";
import {
  getPlansRealestate,
  getAllProposeType,
  changePlan,
} from "@/core/service/realestate/plans.service.js";

export default {
  data() {
    return {
      allTypes: [],
      itemsresidencial: [],
      itemscomercial: [],
      filters: {},
      itemsBreadcrumb: [
        {
          text: "Propostas",
          disabled: false,
          to: "/proposta",
        },
        {
          text: "Tipo Proposta",
          disabled: true,
          to: "/",
        },
      ],
    };
  },

  methods: {
    activeEffect(indexItem, dataName) {
      if (this[dataName].length > 1) {
        const result = this[dataName].map((item, index) => ({
          ...item,
          partner: index === indexItem,
        }));

        changePlan(result);

        this[dataName] = result;
      }
    },

    changeFilter(nameFilter) {
      Object.keys(this.filters).map((item) => {
        this.filters[item] = item === nameFilter;
      });
    },

    closeFilter() {
      Object.keys(this.filters).map((item, index) => {
        this.filters[item] = index === 0;
      });
    },
  },

  mounted() {
    getSessionUser().then(({ data }) => {
      const idrealetateuser = data.return[0].realestate_user;

      Promise.all([
        getAllProposeType(),
        getPlansRealestate(idrealetateuser),
      ]).then((responses) => {
        this.allTypes = responses[0].data.return;

        const result = responses[1].data.return.map((item) => ({
          ...item,
          name: item.name.toLowerCase(),
          partner: item.partner == 1,
        }));

        result.forEach((element) => {
          const typePlan =
            element.type == 1 ? "itemsresidencial" : "itemscomercial";

          this[typePlan].push(element);
        });

        let tmp = {};

        this.filters = responses[0].data.return.forEach(({ name }, index) => {
          if (index === 0) {
            tmp = {
              ...tmp,
              [name]: true,
            };
          } else {
            tmp = {
              ...tmp,
              [name]: false,
            };
          }
        });

        this.filters = tmp;
      });
    });
  },
};
</script>

<style>
.imageEffect {
  transition: ease-in-out 0.3s;
}

.imageEffect:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.imageEffectActive {
  transform: scale(1.1);
}
</style>
