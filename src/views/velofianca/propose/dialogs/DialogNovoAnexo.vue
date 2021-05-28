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

    <v-card class="px-10 pt-8 pb-5" style="overflow-x: hidden">
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
              <v-card-text class="px-8 pa-5">
                <div
                  class="d-flex flex-column"
                  dense
                  align="center"
                  justify="center"
                >
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
                </div>

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
                          <span class="ml-3 text--secondary">
                            {{ item.size }} bytes</span
                          >
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn @click.stop="removeFile(item.name)" icon small>
                          <v-icon style="color: #ff3333">
                            mdi-close-circle
                          </v-icon>
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

        <v-form
          v-if="$route.name === 'attachment'"
          ref="formInfoAnexo"
          v-model="valid"
          lazy-validation
        >
          <div class="d-flex">
            <v-col class="py-0 pl-0" cols="12" md>
              <h4>Tipo</h4>
              <v-select
                placeholder="Tipo"
                outlined
                dense
                :items="typesAttachment"
                item-text="item.name"
                item-value="item"
                :value="typeDefault"
                :rules="rules.typeRules"
                v-model="typeDefault"
              ></v-select>
            </v-col>

            <v-col class="py-0 pr-0" cols="12" md>
              <h4>Pessoa</h4>
              <v-select
                placeholder="Pessoa"
                outlined
                dense
                :items="getPersons"
                item-value="id"
                item-text="name"
                v-model="responsible"
                :rules="rules.peopleRules"
              ></v-select>
            </v-col>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions class="pt-3 pa-0">
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
          @click="validations"
          :loading="btnLoading"
        >
          <span class="px-8 text-none" style="color: #ffffff">Salvar</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { MOUNT_ATTACHMENT_CHECKOUT_END } from "@/core/store/velo-fianca/checkout.module.js";
import { ADD_ATTACHMENT } from "@/core/store/velo-fianca/attachment.module.js";
import {
  addPropertydocuments,
  addClientesPersonDocuments,
  addFiancaVeloPersonDocuments,
  getClientesDocumentType,
} from "@/core/service/velo-fianca/attachment.service";
import { mapGetters } from "vuex";
import dropbox from "@/utils/dropbox";
import { newHashToken, getExtensionFile } from "@/utils/utils";
import { getPersonId } from "@/core/service/velo-fianca/checkout.service.js";
import { personActions } from "@/core/service/core.service.js";
import { GET_PERSONS } from "@/core/store/velo-fianca/tenant.module.js";

export default {
  props: {
    documenttype: {},
    index: Number,
  },

  data() {
    return {
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
      rules: {
        typeRules: [
          (v) =>
            this.$route.name === "checkout-id"
              ? true
              : !!v || "Você precisa selecionar algum tipo",
        ],
        peopleRules: [
          (v) =>
            this.$route.name === "checkout-id"
              ? true
              : !!v || "Você precisa selecionar alguma pessoa",
        ],
      },
      responsible: "",
      responsibleDefault: "",
      typeDefault: "",
      pathFolder: "",
      typesAttachment: [],
      IDPropose: null,
    };
  },

  mounted() {
    const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

    this.IDPropose =
      this.$route.name === "checkout-id"
        ? this.$route.params.id
        : sessionStorageItem.objectPropose.id;

    if (this.$route.name === "attachment") {
      this.getListPersonsPropose();
      this.getTypesAttachment();
    }
  },

  computed: {
    ...mapGetters(["getPersons", "getIdProperty"]),
  },

  methods: {
    closeDialog() {
      if (this.$route.name === "attachment") {
        this.$refs.formInfoAnexo.reset();
      }

      this.uploadedFiles = [];

      this.btnLoading = false;

      this.dialogData = false;
    },

    removeFile(fileName) {
      let index = this.uploadedFiles.findIndex(
        (file) => file.name === fileName
      );

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
      } else
        e.dataTransfer.files.forEach((element) =>
          this.uploadedFiles.push(element)
        );

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

    validations() {
      const formExistAndIsValid =
        this.$route.name === "attachment"
          ? this.$refs.formInfoAnexo.validate()
          : true;

      if (this.uploadedFiles.length === 0) {
        this.$toast.error("Você precisa adicionar algum arquivo!");
      } else if (formExistAndIsValid) {
        this.flowUpload();
      }
    },

    routeNameIsAttachment() {
      return this.$route.name === "attachment";
    },

    existFolder: (arrayFolders, id) =>
      arrayFolders.filter(
        (item) => item[".tag"] === "folder" && item.name == id
      ),
    verifyRouteAndReturnInfos() {
      let infos = this.routeNameIsAttachment()
        ? {
            nameRootFile: "/person",
            id: this.responsible,
          }
        : {
            nameRootFile: "/property",
            id: this.getIdProperty,
          };

      return {
        nameRootFile: infos.nameRootFile,
        idFolder: infos.id,
        basePath: `${infos.nameRootFile}/${infos.id}`,
      };
    },

    async flowUpload() {
      try {
        this.btnLoading = true;

        const { basePath } = this.verifyRouteAndReturnInfos();

        // Verifica se existe a pasta
        await this.verifyExistFolder(this.verifyRouteAndReturnInfos());

        // Faz upload dos arquivos
        const pathFile = await this.uploadFiles(basePath);

        // Pega link do registro
        const link = await this.getFileLink(pathFile);

        // Cria o registro no banco de dados
        await this.verifyRouteAndSaveData(link, pathFile);
      } catch (error) {
        this.$toast.error(
          "Ocorreu um erro e não foi possivel fazer upload do arquivo, tente novamente mais tarde"
        );

        console.log(error);
      }

      this.closeDialog();
    },

    async verifyExistFolder(params) {
      const { nameRootFile, idFolder, basePath } = params;

      const { result } = await dropbox().filesListFolder({
        path: nameRootFile,
      });

      const resultExistFolder = this.existFolder(result.entries, idFolder);

      if (resultExistFolder.length === 0) {
        await dropbox().filesCreateFolder({
          path: basePath,
          autorename: true,
        });
      }
    },

    async uploadFiles(basePath) {
      const nameFile = `${newHashToken()}.${getExtensionFile(
        this.uploadedFiles[0].name
      )}`;

      const raw = {
        path: `${basePath}/${nameFile}`,
        contents: this.uploadedFiles[0],
      };

      const { result } = await dropbox().filesUpload(raw);

      return result.path_display;
    },

    async getFileLink(path) {
      const { result } = await dropbox().sharingCreateSharedLink({
        path,
      });

      return result.url;
    },

    async verifyRouteAndSaveData(link, pathFile) {
      const params = {
        path: pathFile.replace(/\/(person|property)\//, ""),
        name: this.uploadedFiles[0].name,
        type: this.typeDefault.name,
        link,
      };

      if (this.routeNameIsAttachment()) {
        await this.savePersonDocuments(params);
      } else {
        await this.savePropertyDocuments(params);
      }
    },

    async savePropertyDocuments(params) {
      const { data } = await addPropertydocuments({
        property: this.getIdProperty,
        name: params.name,
        documenttype: this.documenttype,
        link: params.link,
        path: params.path,
      });
      const { id, name } = data.return[0];

      this.$store.dispatch(MOUNT_ATTACHMENT_CHECKOUT_END, {
        index: this.index,
        id,
        path: params.path,
        name,
        type: this.typeDefault,
        responsible: params.responsibleName,
        link: params.link,
      });
    },

    async savePersonDocuments(params) {
      const responsibleName = this.getPersons.filter(
        ({ id }) => id === this.responsible
      );

      const idPersonDocuments = await this.clientesPersonDocuments(
        params.link,
        params.path
      );

      const idProposePersonDocuments = await this.ProposePersonDocuments(
        idPersonDocuments
      );

      this.$store.dispatch(ADD_ATTACHMENT, {
        ...params,
        responsible: responsibleName[0].name,
        id: idPersonDocuments,
        idProposePersonDocuments,
      });
    },

    async verifyExistCollaboratorFolder(path) {
      const { result } = await dropbox().filesListFolder({
        path: "/person",
      });

      const resultExistFolder = result.entries.filter(
        (item) => item[".tag"] === "folder" && item.name == this.responsible
      );

      if (resultExistFolder.length === 0) {
        await dropbox().filesCreateFolder({
          path,
          autorename: true,
        });
      }
    },

    async clientesPersonDocuments(link, path) {
      const body = {
        person: this.responsible,
        name: this.uploadedFiles[0].name,
        documenttype: this.typeDefault.id,
        path,
        link,
      };

      const { data } = await addClientesPersonDocuments(body);

      return data.return[0].id;
    },

    async ProposePersonDocuments(idPersonDocuments) {
      const raw = {
        person: this.responsible,
        persondocuments: idPersonDocuments,
        propose: this.IDPropose,
      };

      const { data } = await addFiancaVeloPersonDocuments(raw);

      return data.return[0].id;
    },

    async getTypesAttachment() {
      if (this.$route.name === "attachment") {
        const { data } = await getClientesDocumentType();

        this.allItensTypes = data.return;
        this.typesAttachment = data.return.map((item) => ({
          item,
        }));
      }
    },

    async getListPersonsPropose() {
      const response = await personActions.getTypesPerson(this.IDPropose);
      const idPersons = response.data.return.map(({ person }) => person);
      const { data } = await getPersonId(String(idPersons));

      const raw = data.return.map((item) => {
        const result = response.data.return.filter(
          ({ person }) => person === item.id
        );

        if (result.length > 0) {
          return {
            ...item,
            type: result[0].type == 1 ? "Responsável" : "Corresponsável",
          };
        } else {
          return item;
        }
      });

      this.$store.dispatch(GET_PERSONS, raw);

      sessionStorage.setItem(
        "data",
        JSON.stringify({
          ...JSON.parse(sessionStorage.getItem("data")),
          persons: this.getPersons,
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
