<template>
  <v-dialog id="successpayment" v-model="successpayment" persistent max-width="1000">
    <v-card class="pb-6 pt-6">
      <v-card-text>
        <v-row justify="start" class="mt-6">
          <v-col cols="12" align="center" md>
            <v-img
              src="@/assets/images/subscribe_success.svg"
              width="45%"
              min-heigth="200px"
              min-width="180px"
            />
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-8">
          <v-col align="center">
            <h1>
              <strong> Seu pagamento foi aprovado e sua fiança foi ativada </strong>
            </h1>
          </v-col>
        </v-row>
        <v-row justify="center" class="subtitle-1 font-weight-medium mt-1">
          <v-col align="center">
            <span> Obrigado por assinar com a VELO Garantia Locatícia </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    successpayment: Boolean,
    loading: Boolean,
  },

  methods: {
    openDialog() {
      this.successpayment = true;
    },
    closeDialog() {
      this.successpayment = false;
    },
  },
};
</script>

<style scoped></style>
