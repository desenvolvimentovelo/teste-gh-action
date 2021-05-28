<template>
  <v-app style="background-color: #ececec">
    <div
      class="d-flex flex-column justify-start"
      style="background-color: #ececec; overflow: hidden !important"
    >
      <v-card
        outlined
        elevation="0"
        width="auto"
        style="border-radius: 10px; min-height: 92vh"
        class="mx-3 my-3"
      >
        <v-row class="my-0">
          <v-col align="center">
            <img src="@/assets/images/velo-composed-logo.svg" width="75" />
            <br />
            <h5
              style="
                color: #40b540;
                font-size: 24px;
                font-family: Gill Sans Extrabold, sans-serif;
                text-shadow: 0 0 0.07em #87f, 0 0 0.01em #87f, 0 0 0.05em #dedede;
              "
              class="font-weight-regular"
            >
              Segue abaixo os primeiros passos para fazer uma proposta
            </h5>
          </v-col>
        </v-row>

        <v-row class="my-0">
          <v-col cols="12" align="center">
            <v-carousel
              v-model="model"
              class="px-4 py-4 v-image__image--cover v-window-item"
              style="width: 100%"
              height="92vh"
              hide-delimiters
            >
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                reverse-transition="scroll-x-reverse-transition"
                transition="scroll-x-transition"
              >
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    model: 0,
    colors: ["green", "secondary", "yellow darken-4", "red lighten-2", "orange darken-1"],
    items: [
      { src: require("@/assets/propose-prints/propose.jpg") },
      { src: require("@/assets/propose-prints/tipo_imovel.jpg") },
      { src: require("@/assets/propose-prints/locatario.jpg") },
      { src: require("@/assets/propose-prints/dados_locatario.jpg") },
      { src: require("@/assets/propose-prints/pacote_locacao.jpg") },
      { src: require("@/assets/propose-prints/dados_imovel.jpg") },
      { src: require("@/assets/propose-prints/checkout.jpg") },
    ],
  }),
};
</script>

<style>
.v-image__image--cover {
  background-size: contain !important;
}
.v-window-item {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>
