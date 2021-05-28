<template>
  <v-dialog persistent v-model="dialogData" max-width="1000">
    <template v-slot:activator="{ on, attr }">
      <div class="d-flex align-center h-100" style="width: 100%; height: 97px">
        <v-btn
          color="primary"
          fab
          small
          v-bind="attr"
          v-on="on"
          @click="dialogData = !dialogData"
          elevation="0"
        >
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </div>
    </template>

    <v-card class="px-8 py-6">
      <v-card-title class="pt-0 pl-0">
        <h3 class="text-light">Novo Anexo</h3>
      </v-card-title>

      <v-card-text class="pa-0">
        <div>
          <v-col class="pa-0 mb-3" cols="12" align="center" md>
            <v-card
              @drop.prevent="onDrop($event)"
              @dragover.prevent="dragover = true"
              @dragenter.prevent="dragover = true"
              @dragleave.prevent="dragover = false"
              :class="{ 'grey lighten-2': dragover }"
              class="elevation-0"
              style="border: 2px dashed #707070"
            >
              <v-card-text class="pa-8">
                <v-row class="d-flex flex-column" dense align="center" justify="center">
                  <v-icon color="primary" size="60"> mdi-cloud-upload </v-icon>

                  <div class="py-3 d-flex flex-column">
                    <span class="text-h5 font-weight-bold">
                      Arraste os arquivos aqui
                    </span>
                    <span class="text-h5 font-weight-bold">ou</span>
                  </div>

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
                      Adicionar
                      <v-icon color="#ffffff"> mdi-plus </v-icon>
                    </v-btn>
                    <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      @change="choseFile"
                    />
                  </div>
                </v-row>

                <v-virtual-scroll
                  v-if="uploadedFiles.length > 0"
                  :items="uploadedFiles"
                  item-height="50"
                  style="min-height: 61px"
                  class="mt-4"
                >
                  <template v-slot:default="{ item }">
                    <v-divider></v-divider>

                    <v-list-item :key="item.name">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.name }}
                          <span class="ml-3 text--secondary"> {{ item.size }} bytes</span>
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn @click.stop="removeFile(item.name)" icon small>
                          <v-icon style="color: #ff3333"> mdi-close-circle </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>
                  </template>
                </v-virtual-scroll>
              </v-card-text>
            </v-card>
          </v-col>
        </div>

        <v-row class="py-4 w-100 mx-auto">
          <v-btn
            :disabled="btnLoading"
            rounded
            large
            outlined
            color="red"
            @click="closeDialog"
            class="ml-auto"
          >
            <span class="ml-4 mr-4 text-none">Cancelar</span>
          </v-btn>

          <v-btn
            color="primary"
            class="ml-3"
            rounded
            large
            @click="salvarNovoAnexo"
            :loading="btnLoading"
          >
            <span class="px-8 text-none" style="color: #ffffff">Salvar</span>
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { ADC_ATTACHMENT } from "@/core/store/velo-imobiliaria/realEstateAttachment.module.js";
import { newHashToken } from "@/utils/utils.js";

export default {
  props: {
    index: Number,
    anexo: Object,
    idCompany: String,
  },
  data() {
    return {
      hashFile: newHashToken(),
      dialogData: false,
      valid: false,
      dragover: false,
      uploadedFiles: [],
      isSelecting: false,
      btnLoading: false,
      multiple: {
        type: Boolean,
        default: false,
      },
      allItensTypes: [],
      responsibleDefault: "",
      typeDefault: "",
      pathFolder: "",
    };
  },
  methods: {
    closeDialog() {
      this.uploadedFiles = [];
      this.dialogData = false;
    },

    removeFile(fileName) {
      let index = this.uploadedFiles.findIndex((file) => file.name === fileName);
      if (index > -1) {
        this.uploadedFiles.splice(index, 1);
        this.$refs.uploader.value = "";
      }
    },

    onDrop(e) {
      this.dragover = false;
      if (this.uploadedFiles.length > 0) this.uploadedFiles = [];
      if (!this.multiple && e.dataTransfer.files.length > 1) {
        console.log("Apenas selecione um arquivo por vez...");
      } else e.dataTransfer.files.forEach((element) => this.uploadedFiles.push(element));

      this.$refs.uploader.value = "";
    },

    choseFile(e) {
      if (this.uploadedFiles.length > 0) this.uploadedFiles = [];
      e.target.files.forEach((element) => this.uploadedFiles.push(element));
      this.$refs.uploader.value = "";
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

    salvarNovoAnexo() {
      this.idCompany !== "novo"
        ? (this.uploadedFiles[0].idCompany = this.idCompany)
        : false;
      this.uploadedFiles[0].tittle = this.anexo.tittle;
      this.uploadedFiles[0].index = this.index;

      if (this.uploadedFiles.length > 0) {
        this.$store.dispatch(ADC_ATTACHMENT, this.uploadedFiles[0]);
        this.dialogData = false;
      } else {
        this.$toast.error("Você precisa adicionar algum arquivo!");
      }
    },
  },
};
</script>

<style></style>
