<template>
  <v-app style="background-color: #ececec">
    <div class="d-flex h-100" style="background-color: #ececec">
      <div class="h-100 bg-sidebar">
        <div
          class="d-flex justify-center align-center"
          style="width: 80px; height: 57px"
        >
          <img
            src="../../assets/images/velo-justlogo-negative.svg"
            width="45px"
            style="z-index: 2"
          />
        </div>
      </div>

      <div class="w-100 h-100">
        <v-app-bar
          dense
          class="d-flex justify-center"
          elevation="0"
          color="white"
        >
          <img
            width="120px"
            class="mx-auto"
            src="@/assets/images/velo-written.svg"
          />
        </v-app-bar>

        <div style="height: calc(100% - 48px)" class="pb-3">
          <v-breadcrumbs
            :items="getItemsBreadcrumbRegisterGestor"
            class="font-weight-bold py-1"
          >
            <template v-slot:divider>
              <v-icon> mdi-chevron-right </v-icon>
            </template>
          </v-breadcrumbs>

          <v-card
            outlined
            elevation="0"
            style="border-radius: 10px; height: calc(100% - 29px)"
            class="d-flex align-center justify-center mx-3"
          >
            <transition name="slide1">
              <div v-if="getActiveCard === 1" class="w-100">
                <register-gestor-form />
              </div>
            </transition>

            <transition name="slide2">
              <div v-if="getActiveCard === 2" class="w-100">
                <confirmation-email />
              </div>
            </transition>
          </v-card>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import RegisterGestorForm from "./RegisterGestorForm.vue";
import ConfirmationEmail from "./ConfirmationEmail.vue";

export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
    };
  },

  components: { RegisterGestorForm, ConfirmationEmail },

  computed: {
    ...mapGetters(["getActiveCard", "getItemsBreadcrumbRegisterGestor"]),
  },

  mounted() {
    localStorage.removeItem("token");
  },
};
</script>

<style>
.slide1-enter-active,
.slide1-leave-active {
  transition: ease-in-out 0.4s;
  transform: translateX(0%);
}

.slide1-enter,
.slide1-leave-to {
  transform: translateX(-100%);
  transition: ease-in-out 0.4s;
}

.slide2-enter-active,
.slide2-leave-active {
  transition: ease-in-out 0.4s;
  transform: translateX(0%);
}

.slide2-enter,
.slide2-leave-to {
  transform: translateX(100%);
  transition: ease-in-out 0.4s;
}
</style>

<style lang="scss" scoped>
.bg-sidebar {
  background-image: url("../../assets/images/background-aside.svg");
  z-index: 1;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: linear-gradient(
      164deg,
      rgba(8, 185, 20, 0.4066001400560224) 0%,
      rgba(3, 119, 6, 0.4066001400560224) 100%
    );
  }
}
</style>

<style>
.v-text-field__details {
  margin-bottom: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
