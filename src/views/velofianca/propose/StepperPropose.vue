<template>
  <Stepper :items="items" />
</template>

<script>
import Stepper from "@/views/components/widgets/Stepper.vue";
export default {
  props: {
    items: Array,
  },
  components: { Stepper },
};
</script>

<style></style>
