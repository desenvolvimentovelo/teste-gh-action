<template>
  <v-card class="rounded-lg" width="400" outlined>
    <v-list-item three-line>
      <v-list-item-avatar tile size="60" height="100%">
        <v-img :src="verifyIcon()" />
      </v-list-item-avatar>

      <v-divider vertical></v-divider>

      <v-list-item-content class="ml-4 py-4">
        <v-list-item-title class="subtitle-1 h-100">
          <div class="d-flex justify-space-between h-100">
            <v-col
              class="pa-0 d-flex align-start flex-column"
              style="overflow: hidden; text-overflow: ellipsis"
            >
              <div class="d-flex align-center justify-center w-100">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span
                      v-bind="attrs"
                      v-on="on"
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        cursor: pointer;
                      "
                      class="font-weight-bold text-h6 mr-2"
                    >
                      {{ anexo.name }}
                    </span>
                  </template>
                  <span>{{ anexo.name }}</span>
                </v-tooltip>

                <div class="d-flex align-center justify-center ml-auto">
                  <v-btn
                    v-if="viewDownload"
                    class="d-flex align-center justify-center"
                    small
                    icon
                  >
                    <a
                      :href="downloadLink"
                      :download="anexo.name"
                      class="mr-1 text-decoration-none"
                    >
                      <v-icon style="color: #333">mdi-download</v-icon>
                    </a>
                  </v-btn>

                  <div v-if="viewDelete">
                    <dialog-delete-file :anexo="anexo" :index="index" />
                  </div>

                  <div v-if="viewDocument">
                    <dialog-view-document :anexo="anexo" :index="index" />
                  </div>
                </div>
              </div>

              <span
                v-if="viewResponsible"
                class="font-weight-medium subtitle-2 text-light"
              >
                {{ anexo.responsible }}
              </span>

              <span
                v-if="viewType"
                class="font-weight-medium subtitle-2 text-light"
              >
                {{ anexo.type }}
              </span>
            </v-col>
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import dropbox from "@/utils/dropbox";
import { getExtensionFile } from "@/utils/utils";
import DialogDeleteFile from "../dialogs/DialogDeleteFile.vue";
import DialogViewDocument from "../dialogs/DialogViewDocument.vue";

export default {
  components: { DialogDeleteFile, DialogViewDocument },
  props: {
    anexo: {
      required: false,
    },
    viewDocument: {
      type: Boolean,
      default: false,
    },
    viewDelete: {
      type: Boolean,
      default: false,
    },
    viewDownload: {
      type: Boolean,
      default: false,
    },
    viewResponsible: {
      type: Boolean,
      default: false,
    },
    viewType: {
      type: Boolean,
      default: false,
    },
    index: Number,
    pageIsCheckout: {
      default: false,
    },
  },

  data() {
    return {
      downloadLink: "null",
    };
  },

  mounted() {
    if (this.viewDownload) {
      dropbox()
        .sharingGetSharedLinkFile({
          url: this.anexo.link,
        })
        .then(function ({ result }) {
          var downloadUrl = URL.createObjectURL(result.fileBlob);

          this.downloadLink = downloadUrl;
        });
    }
  },
  methods: {
    verifyIcon() {
      switch (getExtensionFile(this.anexo.name)) {
        case "jpg":
          return require("@/assets/images/attachment-jpg.svg");

        case "pdf":
          return require("@/assets/images/attachment-pdf.svg");

        case "jpeg":
          return require("@/assets/images/attachment-jpeg.svg");

        case "rar":
          return require("@/assets/images/attachment-rar.svg");

        case "zip":
          return require("@/assets/images/attachment-zip.svg");

        default:
          return require("@/assets/images/attachment-another.svg");
      }
    },
  },
};
</script>
