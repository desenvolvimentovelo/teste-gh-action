<template>
  <div>
    <img
      src="@/assets/images/modal-people-background-total.svg"
      style="width: 90%"
    />
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      imageData: "",
    };
  },

  methods: {
    previewImage(event) {
      let input = event.target;

      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;

          $("#previewImage").removeClass("d-none");
          $("#tiazinha").addClass("d-none");
        };

        reader.readAsDataURL(input.files[0]);
      }
    },

    deleteImage() {
      $("#tiazinha").removeClass("d-none");

      $("#previewImage").addClass("d-none");

      this.imageData = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/main.scss";

div {
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    z-index: 2;
  }
}
</style>
