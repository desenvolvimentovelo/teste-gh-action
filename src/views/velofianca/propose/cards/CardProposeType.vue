<template>
  <!-- <v-app style="background-color: #ececec"></v-app> -->
  <v-card
    class="pa-4 rounded-lg d-flex align-center mx-5 style-ui"
    min-width="100"
    max-width="300"
    style="height: 380px !important"
    id=""
  >
    <div class="p-card-heading">
      <v-card-text class="pt-0" elevation="6">
        <img :src="imageURL" style="width: 192px; height: 140px" class="px-5" />

        <div
          class="p-card__title mb-4 d-flex justify-center align-center"
          style="
            text-decoration: underline;
            text-underline-offset: 10px;
            display: contents;
          "
        >
          {{ item }}
        </div>

        <v-container>
          <v-row class="d-flex flex-column">
            <v-col
              class="font-weight-regular py-0 subtitle-1 grey--text text--darken-1 center text-caption"
              v-for="(item, index) in items"
              :key="index"
            >
              <span style="justify-content: center; display: table-footer-group">
                <i
                  aria-hidden="true"
                  class="v-icon v-icon--right mdi mdi-checkbox-marked-circle green--text mr-1"
                  style="font-size: 17px"
                ></i>
                {{ item.name }}
              </span>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <div
        style="align-items: center; justify-content: center; display: flex"
        class="p-card_subtitle text-center body-2 text-right"
      ></div>

      <div class="d-flex align-center justify-center">
        <v-btn class="pa-3 w-xs-100" large rounded color="primary" @click="nextStep()">
          <span class="text-none px-10">Selecionar</span>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { updateTypePropose } from "@/core/service/core.service.js";
import { GET_TYPES_PROPERTY } from "@/core/store/velo-fianca/propertyDetails.module.js";

export default {
  props: {
    index: Number,
    item: String,
  },

  data() {
    return {
      items: [],
      imageURL: null,
    };
  },

  methods: {
    nextStep() {
      const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

      if (!sessionStorageItem || !sessionStorageItem.objectPropose) {
        sessionStorage.setItem(
          "data",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("data")),
            objectPropose: {
              idtype: this.index + 1,
            },
          })
        );
      } else {
        updateTypePropose(this.index + 1);
      }

      this.$store.dispatch(GET_TYPES_PROPERTY, this.items);

      sessionStorage.setItem(
        "data",
        JSON.stringify({
          ...JSON.parse(sessionStorage.getItem("data")),
          listTypePropose: this.items,
        })
      );

      this.$router.push("/dados-inquilino");
    },
  },

  mounted() {
    let tmp = null;

    if (this.item === "Residencial") {
      tmp = [
        { id: 1, name: "Casa" },
        { id: 2, name: "Apartamento" },
        { id: 3, name: "Kitnet" },
      ];
      this.imageURL = require("@/assets/images/card-propose-type.svg");
    } else {
      tmp = [
        { id: 5, name: "Sala" },
        { id: 6, name: "Loja" },
        { id: 7, name: "Galpão" },
      ];
      this.imageURL = require("@/assets/images/card-type-propose.svg");
    }

    this.items = tmp.map(({ id, name }) => ({
      id,
      name,
    }));
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main.scss";
@import "@/assets/sass/components/_cardProposeType.scss";

.style-ui {
  background-image: url("https://i.pinimg.com/originals/5d/06/17/5d06177eb7c29e9167204b9a337c0665.jpg");
  background-size: 104%;
}

@media only screen and (max-width: 667px) {
  .style-card {
    min-height: 94vh;
  }
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
}

@media only screen and (min-width: 1264px) {
}

@media screen and (max-width: 747px) {
  .custom-display {
    display: block !important;
  }
  .v-card {
    margin-bottom: 10px;
  }
}

.custom-display {
  display: flex;
}
</style>
