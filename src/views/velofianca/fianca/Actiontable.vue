<template>
  <div>
    <!-- <dialog-cancelar-proposta
      @closeDialog="objCancelarProposta.flDialogCancelarProposta = $event"
      v-bind:objCancelarProposta="objCancelarProposta"
    /> -->

    <v-menu offset-y transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on" style="color: #adadad">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense min-width="50" style="padding: 0px 0">
        <v-list-item-group>
          <v-list-item v-if="viewItems.view" @click="viewFianca()">
            <v-list-item-icon class="mr-1">
              <v-icon color="black" small @click="snackbar = true">
                mdi-eye
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="black--text text-capitalize font-weight-bold"
                @click="snackbar = true"
              >
                Visualizar
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="viewItems.view" @click="viewFianca()">
            <v-list-item-icon class="mr-1">
              <v-icon color="black" small @click="snackbar = true">
                mdi-border-color
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="black--text text-capitalize font-weight-bold"
                @click="snackbar = true"
              >
                Ocorrência
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <v-snackbar v-model="snackbar">
      {{ texto }}

      <template v-slot:action="{ attrs }">
        <v-btn
          outlined
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          OK
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
// import DialogCancelarProposta from "../dialogs/DialogCancelarProposta.vue";

export default {
  //   components: { DialogCancelarProposta },
  props: {
    infosPropose: {},
  },

  data() {
    return {
      snackbar: false,
      texto: "Funcionalidade de visualizar está em desenvolvimento.",
      objCancelarProposta: { id: null, flDialogCancelarProposta: false },
      viewItems: {
        open: false,
        view: false,
        cancel: false,
      },
    };
  },

  mounted() {
    this.verifyActions();
  },

  methods: {
    viewFianca() {},

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
