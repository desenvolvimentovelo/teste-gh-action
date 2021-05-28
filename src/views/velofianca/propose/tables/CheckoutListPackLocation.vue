<template>
  <div>
    <v-sheet
      elevation="1"
      outlined
      class="py-5 px-lg-10 px-4 border-radius-checkout"
    >
      <header class="d-flex justify-space-between text-center text-sm-left">
        <v-col
          cols="6"
          sm="9"
          class="
            px-0
            pl-sm-5
            text-light
            title2
            font-weight-medium
            pt-0-important
          "
        >
          <span>Descrição</span>
        </v-col>

        <v-col
          cols="6"
          sm="3"
          class="
            px-0
            text-light
            title2
            font-weight-medium
            pt-0-important
            pr-5
            text-right
          "
        >
          <span>Valor</span>
        </v-col>
      </header>

      <v-divider class="mb-2 mt-1"></v-divider>

      <div v-if="getPackageLocations.length !== 0">
        <div
          v-for="(item, index) in getPackageLocations"
          :key="index"
          class="d-flex justify-space-between text-center text-sm-left"
        >
          <v-col cols="6" sm="190" class="pa-0 text-light pl-sm-5">
            <h5 class="font-weight-regular" v-if="item.description !== null">
              {{ item.description }}
            </h5>
            <h5 class="font-weight-regular" v-else>{{ item.type.name }}</h5>
          </v-col>

          <v-col cols="6" sm="3" class="pa-0 text-light text-right pr-5">
            <h5 class="font-weight-regular">
              {{ item.value }}
            </h5>
          </v-col>
        </div>
      </div>

      <div v-else>
        <v-col cols="12" class="text-center">
          <h5>Nenhum item adicional encontrado</h5>
        </v-col>
      </div>

      <v-divider class="mb-1 mt-2"></v-divider>

      <div class="mt-2 d-flex justify-space-between text-center text-sm-left">
        <v-col
          cols="6"
          sm="9"
          class="
            px-0
            text-light
            pl-sm-5
            title2
            font-weight-medium
            pb-0-important
          "
        >
          <span>Total</span>
        </v-col>

        <v-col
          cols="6"
          sm="3"
          class="
            px-0
            text-light
            title2
            font-weight-medium
            text-right
            pr-5
            pb-0-important
          "
        >
          <span>
            {{ getVlTotal }}
          </span>
        </v-col>
      </div>
    </v-sheet>

    <v-sheet
      elevation="1"
      outlined
      class="py-5 px-lg-10 px-4 border-radius-checkout mt-3"
    >
      <header class="d-flex justify-space-between text-center text-sm-left">
        <v-col
          cols="6"
          sm="9"
          class="
            px-0
            pl-sm-5
            text-light
            title2
            font-weight-medium
            pt-0-important
          "
        >
          <span>Valores VELO</span>
        </v-col>

        <v-col
          cols="6"
          sm="3"
          class="
            px-0
            text-light
            title2
            font-weight-medium
            pt-0-important
            pr-5
            text-right
          "
        >
          <span>Valor</span>
        </v-col>
      </header>

      <v-divider class="mb-2 mt-1"></v-divider>

      <div>
        <div class="d-flex justify-space-between text-center text-sm-left">
          <v-col cols="6" sm="190" class="pa-0 text-light pl-sm-5">
            <h5 class="font-weight-regular">
              Afiançamento VELO (Valor mensal)
            </h5>
          </v-col>

          <v-col cols="6" sm="3" class="pa-0 text-light text-right pr-5">
            <h5 class="font-weight-regular">
              {{ getVlTotalAfiancamento }}
            </h5>
          </v-col>
        </div>

        <div class="d-flex justify-space-between text-center text-sm-left">
          <v-col cols="6" sm="190" class="pa-0 text-light pl-sm-5">
            <h5 class="font-weight-regular">
              Ativação da plataforma (Valor único)
            </h5>
          </v-col>

          <v-col cols="6" sm="3" class="pa-0 text-light text-right pr-5">
            <h5 class="font-weight-regular">
              {{ getValueActivator | formatCurrency() }}
            </h5>
          </v-col>
        </div>
      </div>
    </v-sheet>

    <div class="d-flex justify-space-between">
      <h4
        class="
          text-light
          subtitle-2
          font-weight-regular
          px-0
          pl-5 pl-sm-6
          text-left
          pt-0-important
          mt-2
        "
      >
        * O valor do afiançamento VELO é calculado com base no seu plano
        escolhido
      </h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_TOTAL_VALUE } from "@/core/store/velo-fianca/packLocation.module.js";

export default {
  computed: {
    ...mapGetters([
      "getPackageLocations",
      "getVlTotal",
      "getVlTotalAfiancamento",
      "getValueActivator",
    ]),
  },

  mounted() {
    this.$store.dispatch(GET_TOTAL_VALUE);
  },
};
</script>

<style></style>
