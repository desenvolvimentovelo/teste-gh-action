<template>
  <v-app class="fianca" style="background-color: #ececec">
    <div style="background-color: #ececec; overflow: hidden !important">
      <v-breadcrumbs :items="itemsBreadcrumb" class="font-weight-bold py-1">
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>

      <v-card
        outlined
        elevation="0"
        width="auto"
        style="border-radius: 10px; min-height: 93vh"
        class="mx-3 mb-3 d-flex align-start justify-center"
      >
        <v-container fluid class="px-10 pb-2" style="min-heigth: 93vh">
          <v-tabs v-model="active" dense>
            <v-tab key="a" ripple class=""> Propostas </v-tab>
            <v-tab-item key="a">
              <v-divider class="mt-8"></v-divider>
              <tab-a />
            </v-tab-item>

            <v-tab key="b" ripple> Imobiliárias </v-tab>
            <v-tab-item key="b"
              ><v-divider class="mt-8"></v-divider> <tab-b />
            </v-tab-item>
          </v-tabs>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import TabB from "./ApproverRealEstate.vue";
import TabA from "./ProposeApprover.vue";
export default {
  components: {
    TabA,
    TabB,
  },
  data() {
    return {
      search: "",

      active: null,
      itemsBreadcrumb: [
        {
          text: "Aprovador",
          disabled: true,
          to: "/",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/sass/main.scss";
@import "../../assets/sass/pages/proposes.scss";
.v-list {
  padding: 0px 0;
}

@media (max-width: 1085px) {
  img {
    margin-top: 0px;
    height: 32px;
    margin-left: -12px;
  }
}
</style>
