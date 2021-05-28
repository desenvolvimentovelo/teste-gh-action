<template>
  <div class="text-center">
    <v-dialog persistent v-model="objActivator.flDialogActivator" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"> Ativação </v-card-title>

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
            @click="objActivator.flDialogActivator = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            :loading="loading"
            color="primary"
            text
            @click="updateActivation"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  putActivator,
  getValueActivator,
} from "@/core/service/velo-imobiliaria/realEstateForm.service.js";

export default {
  props: {
    objActivator: Object,
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
    loading: false,
    idActivator: null,
  }),

  methods: {
    updateActivation() {
      this.loading = true;
      const params = { id: this.idActivator, percent: this.value };

      putActivator(params).then(() => {
        this.$toast.success("Ativação alterada com sucesso");
        this.objActivator.flDialogActivator = false;
        this.loading = false;
      });
    },
  },

  mounted() {
    getValueActivator(this.objActivator.id).then(({ data }) => {
      if (data.return.length > 0) {
        const { id, percent } = data.return[0];

        this.value = Number(percent);
        this.idActivator = id;
      }
    });
  },
};
</script>
