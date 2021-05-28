<template>
  <div class="p-card-price rounded-lg" @click="handleActive(item.value)">
    <div class="p-card-heading">
      <div class="p-card__price">
        <span class="currency"> R$ </span> {{ parseInt(item.value) }}
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { GET_ACTIVATOR_ITEM_ACTIVE } from "@/core/store/velo-fianca/packLocation.module.js";
import { GET_VALUE_ACTIVATOR } from "@/core/store/velo-fianca/packLocation.module";
import { editPropose } from "@/core/service/velo-fianca/packLocation.service.js";

export default {
  props: {
    item: Object,
  },
  methods: {
    handleActive(value) {
      if ($(`#${this.item.id}`).hasClass("active")) {
        $(`#${this.item.id}`).removeClass("active");

        let item = JSON.parse(sessionStorage.getItem("data")).objectPropose;

        const { activator, ...rest } = item;

        sessionStorage.setItem(
          "data",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("data")),
            objectPropose: rest,
          })
        );

        this.$store.dispatch(GET_VALUE_ACTIVATOR, "0");
        this.$store.dispatch(GET_ACTIVATOR_ITEM_ACTIVE, null);
        editPropose(
          JSON.stringify({
            id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
            activator: 0,
          })
        );
      } else {
        $(".active").removeClass("active");
        $(`#${this.item.id}`).addClass("active");

        sessionStorage.setItem(
          "data",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("data")),
            objectPropose: {
              ...JSON.parse(sessionStorage.getItem("data")).objectPropose,
              activator: this.item.id,
              activatorValue: value,
            },
          })
        );

        this.$store.dispatch(GET_VALUE_ACTIVATOR, value);
        this.$store.dispatch(GET_ACTIVATOR_ITEM_ACTIVE, this.item.id);
        editPropose(
          JSON.stringify({
            id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
            activator: this.item.id,
          })
        );
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main.scss";
@import "@/assets/sass/components/_cardPrice.scss";
</style>
