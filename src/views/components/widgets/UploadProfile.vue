<template>
  <div id="app">
    <v-card>
      <v-card-title class="headline headerDefault">
        <span>Upload de Arquivos</span>
      </v-card-title>

      <v-card-text class="pa-0">
        <dashboard
          class="rounded-circle"
          :uppy="uppy"
          :props="options"
          :plugins="['Webcam']"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Dashboard } from "@uppy/vue";

import Uppy from "@uppy/core";
import Webcam from "@uppy/webcam";
const Portugues = require("@uppy/locales/lib/pt_BR");
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/webcam/dist/style.css";
export default {
  data() {
    return {
      dialog: false,
      options: {
        height: 400,
        margin: 10,
      },
    };
  },

  components: {
    Dashboard,
  },

  computed: {
    uppy: () =>
      new Uppy({
        locale: Portugues,
        restrictions: {
          maxNumberOfFiles: 1,
          minNumberOfFiles: 1,
          allowedFileTypes: ["image/*", "video/*"],
        },
      }).use(Webcam),
  },
};
</script>

<style>
.v-application .headerDefault {
  background-color: #40b540 !important;
  color: white;
}

.uppy-Dashboard-browse {
  color: #1ab109 !important;
  border-color: #1ab109 !important;
}

.uppy-DashboardContent-back,
.uppy-DashboardContent-addMore {
  color: #1ab109 !important;
}

.uppy-StatusBar-actions button {
  border-radius: 50px;
}

.uppy-Dashboard-browse {
  cursor: pointer;
  color: #40b540;
}

.uppy-Dashboard-browse:hover,
.uppy-Dashboard-browse:focus {
  border-bottom: 1px solid #40b540 !important;
}

.uppy-Dashboard-browse {
  cursor: pointer !important;
  color: #40b540 !important;
}

.uppy-Dashboard-AddFiles-title {
  font-family: "Roboto";
}

.uppy-Dashboard:not(.uppy-size--md) .uppy-Dashboard-Item-action {
  color: orangered;
}

.uppy-DashboardContent-back,
.uppy-DashboardContent-addMore {
  color: grey !important;
}
</style>
