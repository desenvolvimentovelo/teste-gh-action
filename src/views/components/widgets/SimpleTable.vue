<template>
  <v-sheet rounded color="grey lighten-2" class="py-5 px-10">
    <header class="d-flex justify-space-between">
      <v-col cols="10" class="px-0">
        <h4>Descrição</h4>
      </v-col>

      <v-col cols="2" class="px-0">
        <h4>Valor</h4>
      </v-col>
    </header>

    <v-divider class="mb-2 mt-1"></v-divider>

    <div v-if="getPackageLocations.length !== 0">
      <div
        v-for="(item, index) in getPackageLocations"
        :key="index"
        class="d-flex justify-space-between"
      >
        <v-col cols="10" class="pa-0">
          <h5 class="font-weight-regular" v-if="item.description !== null">
            {{ item.description }}
          </h5>
          <h5 class="font-weight-regular" v-else>{{ item.type }}</h5>
        </v-col>

        <v-col cols="2" class="pa-0">
          <h5 class="font-weight-regular">{{ item.value }}</h5>
        </v-col>
      </div>
    </div>

    <div v-else>
      <v-col cols="12" class="text-center">
        <h3>Nenhum item encontrado</h3>
      </v-col>
    </div>

    <v-divider class="mb-1 mt-2"></v-divider>

    <div class="mt-2 d-flex justify-space-between">
      <v-col cols="10" class="px-0">
        <h4>Total</h4>
      </v-col>

      <v-col cols="2" class="px-0">
        <h4>
          {{ getVlTotal }}
        </h4>
      </v-col>
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getPackageLocations", "getVlTotal"]),
  },
};
</script>

<style></style>
