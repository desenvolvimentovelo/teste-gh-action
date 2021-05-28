<template>
  <div class="wrapper-rocket">
    <div class="roket-container" id="rocket">
      <img src="@/assets/images/rocket.png" width="200" alt="Rocket Part Up" />

      <img :src="avatar" id="profileUser" />

      <div class="fires">
        <div class="fire-1"></div>
        <div class="fire-2"></div>
        <div class="fire-3"></div>
        <div class="fire-4"></div>
      </div>

      <div class="spark-2"></div>
      <div class="spark-3"></div>
      <div class="spark-4"></div>

      <div class="star star-1"></div>
      <div class="star star-2"></div>
      <div class="star star-3"></div>
      <div class="star star-4"></div>
      <div class="star star-5"></div>
      <div class="star star-6"></div>
      <div class="star star-7"></div>
      <div class="star star-8"></div>
      <div class="star star-9"></div>
      <div class="star star-10"></div>
      <div class="star star-11"></div>
      <div class="star star-12"></div>
      <div class="star star-13"></div>
      <div class="star star-14"></div>
      <div class="star star-15"></div>
      <div class="star star-16"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/sass/main.scss";
@import "../../../assets/sass/components/_rocket.scss";
</style>
