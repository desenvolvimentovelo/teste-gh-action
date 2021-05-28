<template>
  <v-app class="propose" style="background-color: #ececec">
    <div style="background-color: #ececec" class="h-100">
      <v-breadcrumbs :items="itemsBreadcrumb" class="font-weight-bold py-1">
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>

      <v-card
        outlined
        elevation="0"
        width="auto"
        style="border-radius: 10px; height: calc(98vh - 29px)"
        class="mx-3 mb-3 h-100 d-flex justify-center align-center"
      >
        <v-container
          class="d-flex align-center justify-center flex-column h-100"
        >
          <img
            src="@/assets/images/register-realestate-sign.svg"
            alt="Pessoa assinando folha"
            width="350"
          />

          <div class="my-5 text-center text-light d-flex flex-column">
            <span class="text-h6 font-weight-bold text-light">
              Imobiliária {{ dsImobiliaria }} foi enviada para aprovação.
            </span>

            <span class="subtitle-1 text--secondary">
              Aguarde até que seja concluído processo de aprovação.
            </span>
          </div>

          <v-btn
            @click="$router.push('/imobiliarias')"
            color="primary"
            rounded
            class="text-capitalize"
            large
          >
            <span class="text-center px-10"> Voltar minhas imobiliarias </span>
          </v-btn>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dsImobiliaria: null,
      itemsBreadcrumb: [
        {
          text: "Imobiliárias",
          disabled: false,
          to: "/imobiliarias",
        },
        {
          text: "Aguardando aprovação",
          disabled: true,
          to: "",
        },
      ],
    };
  },

  mounted() {
    this.dsImobiliaria = this.$route.query.dsImobiliaria;
  },
};
</script>

<style></style>
