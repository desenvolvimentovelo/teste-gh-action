<template>
  <v-dialog id="modalApproved" v-model="flDialog" persistent max-width="1000">
    <v-card class="pt-6">
      <v-card-text>
        <v-row justify="start">
          <v-col cols="12" align="center" md>
            <v-img
              src="@/assets/images/automatizada-aprovado.svg"
              width="30%"
              min-heigth="200px"
            />
          </v-col>
        </v-row>

        <v-row justify="center" class="mt-3">
          <v-col align="center">
            <h1>
              <strong> Sua proposta foi aprovada. </strong>
            </h1>
          </v-col>
        </v-row>

        <v-card-actions class="mt-3">
          <v-row class="d-flex justify-center">
            <div class="pa-3 pl-sm-0 w-xs-100">
              <v-btn
                @click="redirect('/aguardando-assinatura')"
                class="w-xs-100"
                color="primary"
                rounded
                large
                min-width="272px"
                :loading="loading"
              >
                <span class="ml-4 mr-4 text-none" style="color: #ffffff">
                  Ir para assinaturas
                </span>
              </v-btn>
            </div>
          </v-row>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    flDialog: Boolean,
    loading: Boolean,
  },
  components: {},
  data() {
    return {
      dialogData: true,
      tipos: [
        { id: "01", ds: "Tipo 1" },
        { id: "02", ds: "Tipo 2" },
        { id: "03", ds: "Tipo 3" },
      ],
      pessoas: [
        { id: "01", ds: "Pessoa 1" },
        { id: "02", ds: "Pessoa 2" },
        { id: "03", ds: "Pessoa 3" },
      ],
    };
  },

  methods: {
    redirect(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped></style>
