<template>
  <v-app style="background-color: #ececec">
    <div style="background-color: #ececec; overflow: hidden !important">
      <v-breadcrumbs :items="getItemsBreadcrumb" class="font-weight-bold py-1">
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>

      <v-card
        outlined
        elevation="0"
        width="auto"
        style="border-radius: 10px; min-height: 93vh; overflow: hidden"
        class="d-flex align-center justify-center mx-3"
      >
        <transition name="slide1">
          <div v-if="getViewPage === 1" class="w-100">
            <real-estate-form />
          </div>
        </transition>

        <transition name="slide2">
          <div v-if="getViewPage === 2" class="w-100">
            <localization-details />
          </div>
        </transition>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import LocalizationDetails from "./LocalizationDetails.vue";
import RealEstateForm from "./RealEstateForm.vue";
import { GET_ITENS_BREADCRUMB } from "@/core/store/velo-imobiliaria/register.module.js";

export default {
  components: { RealEstateForm, LocalizationDetails },
  computed: {
    ...mapGetters(["getViewPage", "getItemsBreadcrumb", "getRedirect"]),
  },

  mounted() {
    if (this.getRedirect) {
      if (this.getViewPage === 1) {
        this.$store.dispatch(GET_ITENS_BREADCRUMB, []);
        this.$store.dispatch(GET_ITENS_BREADCRUMB, [
          {
            text: "Imobiliárias",
            disabled: false,
            to: "/imobiliarias",
          },
          {
            text: "Dados da imobiliária",
            disabled: true,
            to: "/",
          },
        ]);
      } else {
        this.$store.dispatch(GET_ITENS_BREADCRUMB, []);
        this.$store.dispatch(GET_ITENS_BREADCRUMB, [
          {
            text: "Imobiliárias",
            disabled: false,
            to: "/imobiliarias",
          },
          {
            text: "Dados da imobiliária",
            disabled: false,
            to: "/registro-imobiliaria",
          },
          {
            text: "Detalhes da localização",
            disabled: true,
            to: "/",
          },
        ]);
      }
    } else {
      if (this.getViewPage === 1) {
        this.$store.dispatch(GET_ITENS_BREADCRUMB, []);
        this.$store.dispatch(GET_ITENS_BREADCRUMB, [
          {
            text: "Dados da imobiliária",
            disabled: true,
            to: "/",
          },
        ]);
      } else {
        this.$store.dispatch(GET_ITENS_BREADCRUMB, []);
        this.$store.dispatch(GET_ITENS_BREADCRUMB, [
          {
            text: "Dados da imobiliária",
            disabled: false,
            to: "/registro-imobiliaria",
          },
          {
            text: "Detalhes da localização",
            disabled: true,
            to: "/",
          },
        ]);
      }
    }
  },
};
</script>

<style>
.slide1-enter-active,
.slide1-leave-active {
  transition: ease-in-out 0.4s;
  transform: translateX(0%);
}

.slide1-enter,
.slide1-leave-to {
  transform: translateX(-100%);
  transition: ease-in-out 0.4s;
}

.slide2-enter-active,
.slide2-leave-active {
  transition: ease-in-out 0.4s;
  transform: translateX(0%);
}

.slide2-enter,
.slide2-leave-to {
  transform: translateX(100%);
  transition: ease-in-out 0.4s;
}
</style>
