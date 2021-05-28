<template>
  <v-card
    @drop.prevent="onDrop($event)"
    @dragover.prevent="dragover = true"
    @dragenter.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    :class="{ 'grey lighten-2': dragover }"
  >
    <v-card-text>
      <v-row class="d-flex flex-column" dense align="center" justify="center">
        <v-col cols="12" md align="center">
          <v-icon color="primary" :class="[dragover ? 'mt-2, mb-6' : 'mt-5']" size="60">
            mdi-cloud-upload
          </v-icon>
        </v-col>

        <v-col cols="12" md align="center">
          <h1 class="pt-6">Arraste os arquivos aqui</h1>
          <h1 class="pt-6">ou</h1>
        </v-col>

        <v-col class="pt-6" cols="12" md align="center">
          <div>
            <v-btn
              color="primary"
              class="text-none"
              rounded
              large
              depressed
              :loading="isSelecting"
              @click="onButtonClick"
            >
              <v-icon left color="#ffffff"> mdi-plus </v-icon>
              Adicionar
            </v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              accept="image/*"
              @change="choseFile"
            />
          </div>
        </v-col>
      </v-row>
      <v-virtual-scroll
        v-if="uploadedFiles.length > 0"
        :items="uploadedFiles"
      >
        <template v-slot:default="{ item }">
          <v-list-item :key="item.name">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
                <span class="ml-3 text--secondary"> {{ item.size }} bytes</span>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn @click.stop="removeFile(item.name)" icon>
                <v-icon> mdi-close-circle </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Upload",
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dragover: false,
      uploadedFiles: [],
      selectedFile: null,
      isSelecting: false,
    };
  },
  computed: {
    buttonText() {
      return this.selectedFile ? this.selectedFile.name : this.defaultButtonText;
    },
  },
  methods: {
    closeDialog() {
      this.uploadedFiles = [];
    },
    removeFile(fileName) {
      const index = this.uploadedFiles.findIndex((file) => file.name === fileName);
      if (index > -1) this.uploadedFiles.splice(index, 1);
    },
    onDrop(e) {
      this.dragover = false;
      if (this.uploadedFiles.length > 0) this.uploadedFiles = [];
      if (!this.multiple && e.dataTransfer.files.length > 1) {
        console.log("Apenas selecione um arquivo por vez...");
      } else e.dataTransfer.files.forEach((element) => this.uploadedFiles.push(element));
    },
    choseFile(e) {
      if (this.uploadedFiles.length > 0) this.uploadedFiles = [];
      e.target.files.forEach((element) => this.uploadedFiles.push(element));
    },
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
    },
  },
};
</script>

<style></style>
