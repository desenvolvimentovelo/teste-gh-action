<template>
  <div
    class="steps-progress-bar"
    aria-valuemin="0"
    aria-valuemax="100"
    role="progressbar"
  >
    <span
      class="steps-progress"
      v-bind:style="{ width: `${this.getProgressWidth}%` }"
    ></span>

    <div v-for="(item, index) in items" :key="index" class="steps-timeline">
      <i :class="item"></i>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters } from "vuex";
import { GET_TOT_STEPS } from "@/core/store/core.module.js";

export default {
  props: {
    items: Array,
  },

  data() {
    return {
      progress: `${this.getProgressWidth}%`,
    };
  },

  computed: {
    ...mapGetters(["getProgressWidth", "getTotSteps", "getCurrentStep"]),
  },

  mounted() {
    let stepsArray = $(".steps-timeline");
    let steps = stepsArray.length + 1;

    this.$store.dispatch(GET_TOT_STEPS, steps);

    var isolatedPercent = 100 / steps;

    $.each(stepsArray, (index, val) => {
      val.setAttribute("id", Math.round(isolatedPercent * (index + 1)));
    });

    this.handleClass();
  },

  methods: {
    handleClass() {
      var stepInterval = setInterval(() => {
        for (let i = 1; i < this.getCurrentStep + 1; i++) {
          $(`#${Math.round((100 / this.getTotSteps) * i)}`).addClass("reached");
        }

        clearInterval(stepInterval);
      }, 1);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main.scss";
@import "@/assets/sass/components/_stepper.scss";
</style>
