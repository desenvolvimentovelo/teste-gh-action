<template>
  <v-app style="background-color: #ececec">
    <div
      class="h-100 d-flex flex-column justify-start"
      style="background-color: #ececec; overflow: hidden !important"
    >
      <v-breadcrumbs :items="itemsBreadcrumb" class="font-weight-bold py-1">
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>

      <v-card
        outlined
        elevation="0"
        width="auto"
        style="border-radius: 10px; min-height: 93vh"
        class="mx-3 mb-3"
      >
        <loader />

        <v-container
          fluid
          class="w-100 px-5 px-lg-10 d-flex align-center"
          style="min-height: 93vh; height: 100%"
        >
          <div class="w-100 h-100 d-flex flex-column">
            <div class="py-5 w-100 mx-auto d-flex align-center">
              <router-link to="/dados-inquilino">
                <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
              </router-link>

              <StepperPropose
                :items="[
                  'las la-building',
                  'las la-user',
                  'las la-box',
                  'las la-home',
                  'las la-list-alt',
                ]"
              />
            </div>

            <div style="height: 95%">
              <div class="w-100 mx-auto d-flex flex-column">
                <div>
                  <v-col cols="12" class="pa-0 py-0">
                    <span
                      style="color: #6e6e6e"
                      class="font-weight-regular title2"
                    >
                      Adicionar itens ao Pacote
                    </span>
                  </v-col>
                </div>

                <v-form
                  class="
                    d-flex
                    align-center
                    flex-column flex-md-row
                    w-xs-100 w-sm-100
                  "
                  ref="formAddItems"
                  v-model="valid"
                  lazy-validation
                  style="width: 750px"
                >
                  <v-col
                    class="pl-md-0 pt-0-important pb-0-important"
                    cols="12"
                    md
                  >
                    <h6 style="color: #7d7d7d" class="input-label mb-1">
                      Tipo
                    </h6>
                    <v-select
                      v-model="inputsValue.type"
                      dense
                      :items="getItensTypePackage"
                      item-text="value.name"
                      placeholder="Selecione um item"
                      outlined
                      :rules="rules.typeRules"
                    ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    md
                    v-if="
                      inputsValue.type !== null &&
                      inputsValue.type.name === 'Outros'
                    "
                    class="pt-0-important pb-0-important"
                  >
                    <h6 style="color: #7d7d7d" class="input-label mb-1">
                      Descrição
                    </h6>
                    <v-text-field
                      v-model="inputsValue.description"
                      dense
                      placeholder="Descrição"
                      outlined
                      :rules="rules.descriptionRules"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md class="pt-0-important pb-0-important">
                    <h6 style="color: #7d7d7d" class="input-label mb-1">
                      Valor
                    </h6>
                    <v-text-field
                      dense
                      outlined
                      v-money="money"
                      required
                      v-model="inputsValue.value"
                      :rules="rules.valueRules"
                      color="#707070"
                      ref="value"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md class="pt-0-important pb-0-important">
                    <v-btn
                      class="px-7 mx-auto"
                      color="primary"
                      rounded
                      medium
                      @click="adicionarPacoteLocacao"
                      :loading="loadingAddPackageLocation"
                      style="width: 70%"
                    >
                      <span class="text-capitalize white--text">
                        Adicionar
                      </span>
                      <i class="las la-plus ml-1"></i>
                    </v-btn>
                  </v-col>
                </v-form>
              </div>

              <div class="w-100">
                <v-col class="px-0 w-100 mx-auto pt-0-important">
                  <v-col class="px-0 mx-0 pt-0-important pb-0-important">
                    <span
                      style="color: #6e6e6e"
                      class="pb-2 pt-0 font-weight-regular title2"
                    >
                      Pacote de locação
                    </span>
                  </v-col>
                </v-col>

                <v-row class="px-0 w-100 mx-auto">
                  <v-col class="px-0">
                    <tablePackLocations />
                  </v-col>
                </v-row>
              </div>

              <div class="d-block d-lg-flex w-100 mx-auto mt-6">
                <v-col class="pl-0 w-100 mx-auto py-0">
                  <span
                    style="color: #6e6e6e"
                    class="pb-2 pt-0 font-weight-regular title2"
                  >
                    Corretor
                  </span>

                  <v-select
                    dense
                    :items="getListRealtors"
                    item-text="name"
                    item-value="id"
                    placeholder="Selecione um corretor"
                    outlined
                    v-model="realtor"
                    :value="getActiveRealtor"
                    @change="handleRealtor"
                  ></v-select>
                </v-col>

                <v-col class="pr-0 w-100 mx-auto py-0">
                  <div>
                    <span
                      style="color: #6e6e6e"
                      class="pb-2 pt-0 font-weight-regular title2"
                    >
                      Valor de ativação
                    </span>
                  </div>

                  <div class="d-flex justify-space-between w-100 mx-auto">
                    <CardPrice
                      class="d-flex"
                      v-for="item in getPlans"
                      :key="item.id"
                      v-bind:class="{
                        'pl-0': item.id === 1,
                        active: item.id == getActivatorItemActive,
                        'justify-start': item.id === 1,
                        'justify-center': item.id > 1 || item.id < 3,
                        'justify-end': item.id === 3,
                        'pr-0': item.id === 3,
                      }"
                      v-bind:id="item.id"
                      :item="item"
                    />
                  </div>
                </v-col>
              </div>
            </div>

            <div
              class="
              d-flex 
                mg
                justify-end
                w-100
                mx-auto
                mt-5 mt-lg-0
              
              "
            >
              <div class="px-3 w-xs-100">
                <v-btn
                  @click="$router.push('/dados-inquilino')"
                  class="pa-3 w-xs-100"
                  large
                  rounded
                  color="primary"
                  outlined
                >
                  <span class="text-capitalize px-10">Voltar</span>
                </v-btn>
              </div>

              <div class="px-3 px-sm-0 w-xs-100">
                <v-btn
                  @click="nextStep"
                  class="w-xs-100"
                  large
                  rounded
                  color="primary"
                >
                  <span class="text-none">Ir para dados do imóvel</span>
                </v-btn>
              </div>
            </div>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import {
  GET_TOTAL_VALUE,
  GET_ITENS_PACKAGE,
  ADD_LOCATIONS,
  GET_PLANS,
  GET_LIST_REALTORS,
  GET_REALTOR_ADMIN,
  GET_PERCENTAGE_PLAN,
} from "@/core/store/velo-fianca/packLocation.module.js";
import {
  addPackLocation,
  editPropose,
  getInfosPlan,
  getListCollaborator,
} from "@/core/service/velo-fianca/packLocation.service.js";
import { getPackType, getSessionUser } from "@/core/service/core.service.js";
import { GET_HANDLE_STEP } from "@/core/store/core.module.js";
import { mapGetters } from "vuex";
import StepperPropose from "./StepperPropose.vue";
import CardPrice from "./cards/CardPrice.vue";
import ListPackLocation from "@/views/velofianca/propose/tables/ListPackLocation.vue";
import { unformatString } from "@/utils/utils.js";
import { updateStepPropose } from "@/core/service/core.service.js";
import Loader from "../../components/widgets/Loader.vue";
import { GET_UPDATE_SESSION_STORAGE } from "@/core/store/velo-fianca/keepPropose.module.js";
import { GET_KEEP_PROPOSE } from "@/core/store/velo-fianca/keepPropose.module.js";

export default {
  components: {
    tablePackLocations: ListPackLocation,
    StepperPropose,
    CardPrice,
    Loader,
  },
  data() {
    return {
      valid: false,
      loadingAddPackageLocation: false,
      realtor: null,
      itemsBreadcrumb: [
        {
          text: "Propostas",
          disabled: false,
          to: "/proposta",
        },
        {
          text: "Tipo Proposta",
          disabled: false,
          to: "/escolher-tipo-proposta",
        },
        {
          text: "Dados do Locatario",
          disabled: false,
          to: "/dados-inquilino",
        },
        {
          text: "Pacote de Locação",
          disabled: true,
          to: "/",
        },
      ],
      rules: {
        typeRules: [(v) => !!v || "Por favor selecione algum item"],
        descriptionRules: [(v) => this.verifyType(v)],
        valueRules: [
          (v) => v !== "R$ 0,00" || "O valor não pode ser zero",
          (v) =>
            (!!v && unformatString(v, "pt-BR") > 0) ||
            "O valor não pode ser negativo",
        ],
      },
      inputsValue: {
        type: null,
        description: null,
        value: "R$ 0,00",
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false,
      },
      itemActiveDefault:
        JSON.parse(sessionStorage.getItem("data")) === null ||
        JSON.parse(sessionStorage.getItem("data")).objectPropose ===
          undefined ||
        JSON.parse(sessionStorage.getItem("data")).objectPropose.activator ===
          undefined
          ? ""
          : JSON.parse(sessionStorage.getItem("data")).objectPropose.activator,
    };
  },

  mounted() {
    const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

    if (
      sessionStorageItem === null ||
      sessionStorageItem.objectPropose === undefined
    ) {
      this.$router.push("/escolher-tipo-proposta");
    } else {
      this.$store.dispatch(GET_PLANS);
      this.$store.dispatch(GET_HANDLE_STEP, 3);

      if (sessionStorage.getItem("redirect") !== null) {
        const self = this;

        this.$store.dispatch(GET_KEEP_PROPOSE, self);
      } else {
        updateStepPropose(3);
        this.getInfosBD();
      }

      this.realtor = this.getActiveRealtor;
    }
  },
  computed: {
    ...mapGetters([
      "getItensTypePackage",
      "getPackageLocations",
      "getPlans",
      "getListRealtors",
      "getActiveRealtor",
      "getActivatorItemActive",
    ]),
  },
  methods: {
    handleRealtor() {
      editPropose(
        JSON.stringify({
          id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
          realtor: this.realtor,
        })
      );

      this.$store.dispatch(GET_REALTOR_ADMIN, this.realtor);
    },

    getPercentagePlan(idCompany) {
      const type = JSON.parse(sessionStorage.getItem("data")).objectPropose
        .typePropose;

      getInfosPlan(idCompany, type).then(({ data }) => {
        this.$store.dispatch(
          GET_PERCENTAGE_PLAN,
          parseInt(data.return[0].percent)
        );

        this.$store.dispatch(GET_TOTAL_VALUE);
      });
    },

    getInfosBD() {
      let sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

      if (sessionStorageItem.packageLocations === undefined) {
        getPackType().then(({ data }) => {
          this.$store.dispatch(
            GET_ITENS_PACKAGE,
            data.return.map(({ id, name }) => ({
              value: {
                id,
                name,
              },
            }))
          );
        });
      }

      if (
        sessionStorageItem.realtorInfos === undefined ||
        sessionStorageItem.realtorInfos.active === undefined
      ) {
        getSessionUser().then(({ data }) => {
          const { id, realestate_user } = data.return[0];
          const idtype = JSON.parse(sessionStorage.getItem("data"))
            .objectPropose.idtype;

          Promise.all([
            getInfosPlan(realestate_user, idtype),
            getListCollaborator(realestate_user),
          ]).then((responses) => {
            const [infosplan, listcollaborator] = responses.map(
              ({ data }) => data.return
            );

            this.$store.dispatch(GET_LIST_REALTORS, listcollaborator);
            this.$store.dispatch(GET_REALTOR_ADMIN, id);

            this.$store.dispatch(GET_UPDATE_SESSION_STORAGE, {
              key: "realtorInfos",
              data: {
                ...JSON.parse(sessionStorage.getItem("data")).realtorInfos,
                list: listcollaborator,
                active: id,
              },
            });

            editPropose(
              JSON.stringify({
                id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
                realtor: id,
              })
            );

            this.realtor = id;

            this.$store.dispatch(
              GET_PERCENTAGE_PLAN,
              parseInt(infosplan[0].percent)
            );
          });
        });
      }
    },

    adicionarPacoteLocacao() {
      if (this.$refs.formAddItems.validate()) {
        let result = this.verifyExistItensDuplicates(
          this.inputsValue.type.name,
          this.inputsValue.description
        );

        if (result) {
          this.$toast.error(
            "Não é possivel adicionar itens com nomes duplicados!"
          );
        } else {
          let { type, description, value } = this.inputsValue;
          let sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

          this.loadingAddPackageLocation = true;

          addPackLocation(
            JSON.stringify({
              packtype: type.id,
              description,
              propose: sessionStorageItem.objectPropose.id,
              value: unformatString(value, "pt-BR"),
            })
          ).then(({ data }) => {
            this.$store.dispatch(ADD_LOCATIONS, {
              id: data.return[0].id,
              ...this.inputsValue,
            });

            this.$store.dispatch(GET_TOTAL_VALUE);
            sessionStorage.setItem(
              "data",
              JSON.stringify({
                ...JSON.parse(sessionStorage.getItem("data")),
                itensTypePackage: this.getItensTypePackage,
                packageLocations: this.getPackageLocations,
              })
            );

            this.resetForm();
            this.loadingAddPackageLocation = false;
          });
        }
      }
    },

    verifyExistItensDuplicates(type, description) {
      if (type === "Outros") {
        let result = this.getPackageLocations.filter(
          (item) => item.description === description
        );

        if (result.length === 0) {
          return false;
        }

        return true;
      } else {
        let result = this.getItensTypePackage.filter(
          ({ value }) => value.name === type
        );

        // Valor não existe no array = Valor Duplicado
        if (result.length === 0) {
          return true;
        }

        let index = this.getItensTypePackage.findIndex(
          ({ value }) => value.name === type
        );

        this.getItensTypePackage.splice(index, 1);
        return false;
      }
    },

    resetForm() {
      this.inputsValue = {
        type: null,
        description: null,
        value: "R$ 0,00",
      };

      this.$refs.value.$el.getElementsByTagName("input")[0].value = "R$ 0,00";
      this.$refs.formAddItems.reset();
    },

    verifyType(value) {
      if (this.inputsValue.type) {
        if (!value && this.inputsValue.type.name === "Outros") {
          return "O campo de descrição não pode ser vazio";
        } else if (value.length >= 50) {
          return "O campo de descrição não pode conter mais que 50 caracteres";
        } else {
          return true;
        }
      } else {
        return true;
      }
    },

    verifySelectedSelectedRental() {
      return this.getPackageLocations.filter(
        ({ type }) => type.name === "Aluguel"
      );
    },

    nextStep() {
      if (this.getPackageLocations.length === 0) {
        this.$toast.error("Você precisa adicionar algum pacote de locação!");
      } else if (this.verifySelectedSelectedRental().length === 0) {
        this.$toast.error(
          "É necessário um valor de aluguel no pacote de locação!"
        );
      } else if (this.realtor.length === 0) {
        this.$toast.error("Você precisa selecionar algum corretor!");
      } else if (this.getActivatorItemActive === null) {
        this.$toast.error("Você precisa selecionar algum valor de ativação!");
      } else {
        this.$router.push("/dados-imovel");

        sessionStorage.setItem(
          "data",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("data")),
            realtorInfos: {
              ...JSON.parse(sessionStorage.getItem("data")).realtorInfos,
              active: this.getActiveRealtor,
            },
          })
        );

        editPropose(
          JSON.stringify({
            id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
            activator: this.getActivatorItemActive,
            realtor: this.getActiveRealtor,
          })
        );
      }
    },
  },
};
</script>

<style scoped lang="scss">
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0px !important;
}
</style>
