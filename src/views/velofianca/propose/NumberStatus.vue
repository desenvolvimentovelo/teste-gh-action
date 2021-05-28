<template>
  <div class="text-center d-flex flex-column justify-center align-center">
    <v-progress-circular
      :rotate="270"
      :size="60"
      :width="5"
      :value="percentage"
      :color="color"
      class="mb-2 mt-0 mx-0"
    >
      <span
        style="color: rgb(16 16 16 / 51%) !important"
        v-bind:class="{ longNumbers: getAllProposesState >= 1000 }"
        >{{ value }}</span
      >
    </v-progress-circular>

    <span
      class="subtitle-1 font-weight-regular grey--text text--darken-1 text-sm-body-2"
      >{{ status | formatLongStatus() }}</span
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    value: {
      required: false,
    },
    status: String,
    percentage: Number,
    color: String,
  },

  computed: {
    ...mapGetters(["getAllProposesState"]),
  },

  filters: {
    formatLongStatus(value) {
      if (value === "Aguardando Documentos") {
        const parts = value.split(" ");
        const fisrtPart = parts[0].substring(0, 2);

        return `${fisrtPart}. ${parts[parts.length - 1]}`;
      } else {
        return value;
      }
    },
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.v-progress-circular:hover {
  width: 100px;
  height: 100px;
  border-radius: 60px;
  border-style: solid;
  border-color: #bdbdbdc0;
  border-bottom-width: 2px;
  border-top-width: 2px;
  border-right-width: 2px;
  border-left-width: 2px;
}

.longNumbers {
  font-size: 68%;
}
</style>
