<template>
  <v-chip class="ma-2" color="primary" label text-color="white">
    <v-icon left> mdi-label </v-icon>
    <div>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
            style="text-overflow: ellipsis; overflow: hidden; cursor: pointer"
            class="font-weight-bold mr-2"
          >
            {{ persondetailpropose.proposeexist }}
            {{ formatText(1) }}
          </span>
        </template>

        <span
          >{{ persondetailpropose.proposeexist }} {{ formatText() }} a essa
          pessoa</span
        >
      </v-tooltip>
    </div>
  </v-chip>
</template>

<script>
export default {
  props: {
    persondetailpropose: {},
  },

  methods: {
    formatText(idText) {
      switch (idText) {
        case 1:
          return Number(this.persondetailpropose.proposeexist) > 1
            ? "Propostas"
            : "Proposta";

        default:
          return Number(this.persondetailpropose.proposeexist) > 1
            ? "Propostas existentes vinculadas"
            : "Proposta existente vinculada";
      }
    },
  },
};
</script>
