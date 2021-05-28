<template>
  <v-dialog eager v-model="dialog" width="900px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="d-flex align-center justify-center"
        v-bind="attrs"
        v-on="on"
        small
        icon
      >
        <v-icon style="color: #333" v-bind="attrs" v-on="on">mdi-eye</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">Visualização do Anexo</span>
      </v-card-title>

      <v-card-text class="pt-5">
        <div class="sizeContainer">
          <a href="" :id="`dropbox-embed-${index}`"></a>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Embbeder from "@/utils/embbeder.js";
import { mapGetters } from "vuex";

export default {
  props: {
    anexo: Object,
    index: Number,
  },

  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    ...mapGetters(["getAttachments"]),
  },

  mounted() {
    Embbeder(
      this.getAttachments[this.index].link,
      document.getElementById(`dropbox-embed-${this.index}`)
    );
  },
};
</script>

<style>
.view {
  opacity: 1;
}

.view iframe {
  width: 100% !important;
  height: 100% !important;
}

.notView {
  opacity: 0;
}

.notView iframe {
  width: 0 !important;
  height: 0 !important;
}

.sizeContainer {
  width: 100%;
  height: 400px;
}
</style>
