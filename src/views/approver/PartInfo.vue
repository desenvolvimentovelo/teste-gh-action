<template>
  <div>
    <p class="grey--text text--darken-2 font-weight-medium">
      <strong>{{ title }}</strong>
    </p>

    <div class="mx-0">
      <p class="font-weight-regular text-left mx-0">
        {{ data || "-" }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    data: String || Number,
  },
};
</script>

<style></style>
