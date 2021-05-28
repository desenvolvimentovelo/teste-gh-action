<template>
  <div class="text-center">
    <v-dialog v-model="objComissao.flDialogComissao" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"> Comissão </v-card-title>

        <v-card-text class="pt-6">
          <v-slider
            :tick-labels="seasons"
            v-model="value"
            step="10"
            thumb-label
            ticks
          ></v-slider>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey"
            text
            @click="objComissao.flDialogComissao = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="objComissao.flDialogComissao = false"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    objComissao: Object,
  },
  data: () => ({
    seasons: [
      "",
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
      "60%",
      "70%",
      "80%",
      "90%",
    ],
    value: 0,
  }),

  methods: {
    season(val) {
      return this.icons[val];
    },
  },
};
</script>
