<template>
  <div>
    <v-menu offset-y transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on" style="color: #adadad">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense min-width="50" style="padding: 0px 0">
        <v-list-item-group>
        
          <v-list-item v-if="viewItems.view" @click="detailsActionRealestate">
            <v-list-item-icon class="mr-1">
              <v-icon color="red" small> mdi-block-helper </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="black--text text-capitalize font-weight-bold"
              >
                Desativar
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    infosCompany: {},
  },

  mounted() {
    this.verifyActions();
  },

  data() {
    return {
      viewItems: {
        open: false,
        view: false,
        cancel: false,
      },
    };
  },

  methods: {
    detailsActionRealestate() {},

    verifyActions() {
      this.viewItems = {
        open: true,
        view: true,
        cancel: true,
      };
    },
  },
};
</script>

<style></style>
