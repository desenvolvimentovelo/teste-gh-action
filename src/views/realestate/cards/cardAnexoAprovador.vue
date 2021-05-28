<template>
  <v-card class="rounded-lg" width="400" height="70" outlined>
    <v-list-item three-line>
      <v-list-item-avatar tile size="50" class="my-2">
        <v-img :src="verifyIcon()" />
      </v-list-item-avatar>

      <v-divider class="mb-5" vertical></v-divider>

      <v-list-item-content class="ml-4 py-4">
        <v-list-item-title class="subtitle-1 mb-auto">
          <div class="d-flex">
            <v-col
              class="pa-0"
              cols="8"
              style="overflow: hidden; text-overflow: ellipsis; padding: 6px"
            >
              <span>{{ anexo.name }}</span>
            </v-col>

            <v-col cols="4" class="pa-0 d-flex">
              <v-btn
                icon
                class="mx-auto text-decoration-none"
                @click="download()"
              >
                <v-icon color="#7d7d7d">mdi-download</v-icon>
              </v-btn>
            </v-col>
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

export default {
  props: {
    index: Number,
    anexo: {
      required: false,
    },
  },
  data() {
    return {
      downloadLink: "null",
    };
  },
  mounted() {
    dropbox()
      .sharingGetSharedLinkFile({
        url: this.anexo.link,
      })
      .then(function ({ result }) {
        var downloadUrl = URL.createObjectURL(result.fileBlob);

        this.downloadLink = downloadUrl;
      });
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

    // removeItem(anexo) {
    //   let { path, id } = anexo;

    //   if (this.pageIsCheckout) {
    //     let data = { index: this.index, item: null };
    //     this.$store.dispatch(MOUNT_ATTACHMENT_CHECKOUT_END, data);
    //     deletePropertydocuments({
    //       params: {
    //         id,
    //       },
    //     });
    //   } else {
    //     this.$store.dispatch(REMOVE_ATTACHMENT, anexo);
    //     deleteClientesPersonDocuments({
    //       params: {
    //         id,
    //       },
    //     });
    //   }

    //   dropbox().filesDeleteV2({
    //     path,
    //   });
    // },

    download() {
      const url = window.URL.createObjectURL(new Blob([this.anexo.file]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${this.anexo.file.name}.png`); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
  },
  computed: {
    ...mapGetters(["getAttachments"]),
  },
};
</script>
