<template>
  <div>
    <v-sheet
      color="#ECECEC"
      class="py-3 px-3 px-sm-7 background-table rounded-lg"
    >
      <header class="d-flex justify-space-between">
        <v-col cols="6" sm="10" md="10" class="pa-0 text-left pl-sm-6">
          <h4 class="text-light title2">Descrição</h4>
        </v-col>

        <v-col cols="6" sm="2" md="2" class="pa-0 text-center text-md-left">
          <h4 class="text-light title2">Valor</h4>
        </v-col>
      </header>

      <v-divider class="mb-2 mt-1"></v-divider>

      <div v-if="getPackageLocations.length === 0">
        <v-col cols="12" class="text-center pt-0-important pb-0-important">
          <h5 class="text-light title2">Nenhum item adicional encontrado</h5>
        </v-col>
      </div>

      <div v-else>
        <div
          v-for="(item, index) in getPackageLocations"
          :key="index"
          class="d-flex pt-0-important justify-space-between"
          style="line-height: 1; height: 25px"
        >
          <v-col
            cols="6"
            sm="9"
            md="10"
            class="pa-0 pl-6 d-flex align-center justify-start"
          >
            <span
              style="color: #717171"
              class="font-weight-regular text1"
              v-if="item.description !== null"
            >
              {{ item.description }}
            </span>

            <span
              style="color: #717171"
              class="font-weight-regular text1"
              v-else
            >
              {{ item.type.name }}
            </span>
          </v-col>

          <v-col
            cols="6"
            sm="3"
            md="2"
            class="pa-0 pl-lg-0 d-flex text-md-left align-center justify-end"
          >
            <h5 style="color: #717171" class="font-weight-regular">
              {{ item.value }}
            </h5>

            <v-btn
              icon
              small
              class="ml-sm-auto ml-3 mr-sm-3"
              color="error"
              @click="removeLocation(item)"
            >
              <v-icon color="#717171" size="18"> mdi-trash-can-outline </v-icon>
            </v-btn>
          </v-col>
        </div>
      </div>

      <v-divider class="mb-1 mt-2"></v-divider>

      <div class="mt-2 d-flex justify-space-between">
        <v-col cols="6" sm="9" md="10" class="pa-0 pl-5 pl-sm-6 text-left">
          <h4 class="text-light title2">Total</h4>
        </v-col>

        <v-col cols="6" sm="3" md="2" class="pa-0 text-center text-md-left">
          <h4 class="text-light title2">
            {{ getVlTotal }}
          </h4>
        </v-col>
      </div>
    </v-sheet>

    <v-sheet
      color="#ECECEC"
      class="py-3 px-3 mt-3 px-sm-7 background-table rounded-lg"
    >
      <header class="d-flex justify-space-between">
        <v-col cols="6" sm="10" md="10" class="pa-0 text-left pl-sm-6">
          <h4 class="text-light title2">Valores VELO</h4>
        </v-col>

        <v-col cols="6" sm="2" md="2" class="pa-0 text-center text-md-left">
          <h4 class="text-light title2">Valor</h4>
        </v-col>
      </header>

      <v-divider class="mb-2 mt-1"></v-divider>

      <div class="mt-1 d-flex justify-space-between">
        <v-col
          cols="6"
          sm="9"
          md="10"
          class="pa-0 pl-5 pl-sm-6 text-left d-flex align-center"
        >
          <span style="color: #717171" class="font-weight-regular text1">
            Afiançamento VELO (Valor mensal)
          </span>
        </v-col>

        <v-col
          cols="6"
          sm="3"
          md="2"
          class="pa-0 text-center text-md-left d-flex align-center"
        >
          <h5 style="color: #717171" class="font-weight-regular">
            {{ getVlTotalAfiancamento }}
          </h5>
        </v-col>
      </div>

      <div class="mt-1 d-flex justify-space-between">
        <v-col
          cols="6"
          sm="9"
          md="10"
          class="pa-0 pl-5 pl-sm-6 text-left d-flex align-center"
        >
          <span style="color: #717171" class="font-weight-regular text1">
            Ativação da plataforma (Valor único)
          </span>
        </v-col>

        <v-col
          cols="6"
          sm="3"
          md="2"
          class="pa-0 text-center text-md-left d-flex align-center"
        >
          <h5 style="color: #717171" class="font-weight-regular">
            {{ getValueActivator | formatCurrency() }}
          </h5>
        </v-col>
      </div>
    </v-sheet>

    <div class="d-flex justify-space-between">
      <h4
        class="
          text-light
          subtitle-2
          font-weight-regular
          px-0
          pl-5 pl-sm-6
          text-left
          pt-0-important
          mt-2
        "
      >
        * O valor do afiançamento VELO é calculado com base no seu plano
        escolhido
      </h4>
    </div>
  </div>
</template>

<script>
import {
  GET_ITENS_PACKAGE,
  GET_TOTAL_VALUE,
  GET_LOCATIONS,
} from "@/core/store/velo-fianca/packLocation.module.js";
import { deletePackValues } from "@/core/service/velo-fianca/packLocation.service.js";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "getVlTotal",
      "getVlTotalAfiancamento",
      "getPackageLocations",
      "getItensTypePackage",
      "getValueActivator",
    ]),
  },

  methods: {
    removeLocation(pack) {
      const { type, id } = pack;

      deletePackValues(id).then(() => {
        // Atualiza o sessionStorage
        this.updateSessionStorage();

        // Atualiza a lista de tipos adicionando item de volta
        this.updateListTypes(type);

        // Remove da lista debaixo que mostra o item e o valor dele
        this.updateListPackageLocations(type);

        // Atualizando valor total da lista
        this.$store.dispatch(GET_TOTAL_VALUE);
      });
    },

    updateSessionStorage() {
      if (this.getPackageLocations.length === 0) {
        let cloneObject = JSON.parse(sessionStorage.getItem("data"));

        delete cloneObject.packageLocations;

        sessionStorage.setItem("data", JSON.stringify(cloneObject));
      } else {
        sessionStorage.setItem(
          "data",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("data")),
            packageLocations: this.getPackageLocations,
          })
        );
      }
    },

    updateListTypes({ name, id }) {
      if (name !== "Outros") {
        let cloneArr = Array.from(this.getItensTypePackage);

        cloneArr.unshift({
          value: { id, name },
        });

        sessionStorage.setItem(
          "data",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("data")),
            itensTypePackage: cloneArr,
          })
        );

        this.$store.dispatch(GET_ITENS_PACKAGE, cloneArr);
      }
    },

    updateListPackageLocations({ id }) {
      let cloneArr = Array.from(this.getPackageLocations);

      let index = cloneArr.findIndex(({ type }) => type.id === id);

      if (index > -1) {
        cloneArr.splice(index, 1);

        this.$store.dispatch(GET_LOCATIONS, cloneArr);

        sessionStorage.setItem(
          "data",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("data")),
            packageLocations: cloneArr,
          })
        );
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/main.scss";
@import "@/assets/sass/components/_listPackLocation.scss";

.deleteButton {
  cursor: pointer;
}
</style>
