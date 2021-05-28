<template>
  <v-card class="rounded-lg" width="400" height="" outlined>
    <v-list-item three-line>
      <v-list-item-avatar tile size="60" class="my-2" height="100%">
        <v-img :src="verifyIcon()" />
      </v-list-item-avatar>

      <v-divider class="mb-5" vertical></v-divider>

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
            </div>
             
            </v-col>

            <div cols="4" class="pa-0 d-flex">
              <a
                :href="downloadLink"
                :download="anexo.name"
                class="mx-auto text-decoration-none mt-0"
                v-if="!this.anexo.file"
              >
                <v-icon color="#7d7d7d">mdi-download</v-icon>
              </a>
              <a
                v-if="this.anexo.file"
                @click="download()"
                class="mx-auto text-decoration-none mt-0"
              >
                <v-icon color="#7d7d7d">mdi-download</v-icon>
              </a>
              <a @click="deleteFile(anexo)">
                <v-icon color="#7d7d7d">mdi-close</v-icon>
              </a>
            </div>
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import dropbox from "@/utils/dropbox";
import { getExtensionFile } from "@/utils/utils";
import { deleteCompanyDocuments } from "@/core/service/velo-fianca/attachment.service";
import { REMOV_ATTACHMENT } from "@/core/store/velo-imobiliaria/realEstateAttachment.module.js";

export default {
  props: {
    index: Number,
    anexo: {
      required: false,
    },
  },
  data() {
    return {
      downloadLink: null,
    };
  },
  mounted() {
    if (this.anexo.link) {
      dropbox()
        .sharingGetSharedLinkFile({
          url: this.anexo.link,
        })
        .then((response) => {
          var downloadUrl = URL.createObjectURL(response.result.fileBlob);
          this.downloadLink = downloadUrl;
        });
    }
  },
  methods: {
    verifyIcon() {
      switch (getExtensionFile(this.anexo.name)) {
        case "jpg":
          return require("@/assets/images/attachment-jpg.svg");

        case "PNG":
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

    download() {
      const url = window.URL.createObjectURL(new Blob([this.anexo.file]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${this.anexo.name}.png`);
      document.body.appendChild(link);
      link.click();
    },

    deleteFile() {
      deleteCompanyDocuments(this.anexo.id).then(() => {
        dropbox()
          .filesDeleteV2({
            path: this.getPath,
          })
          .then(() => {
            this.$store.dispatch(REMOV_ATTACHMENT, this.index);
            this.$toast.success("Arquivo excluido com sucesso!");
          });
      });
    },
  },
  computed: {
    ...mapGetters(["getAttachments", "getPath"]),
  },
};
</script>
