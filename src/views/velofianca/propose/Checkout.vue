<template>
  <v-app style="background-color: #ececec">
    <div
      class="mb-3"
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
        class="mx-3"
      >
        <loader />
        <rocket-animation :avatar="avatar" />
        <dialog-automatizada-aprovado
          v-if="approved"
          :loading="loading"
          :flDialog="flDialog"
        />
        <dialog-automatizada-reprovado
          v-else
          :renderDialog="true"
          :flDialog="flDialog"
        />

        <v-container fluid class="px-sm-10 wrapper-checkout">
          <div class="py-5 mx-auto d-flex align-center">
            <router-link
              :to="
                typeCheckout === 'end' || typeCheckout === 'redirect'
                  ? '/dados-imovel'
                  : '/proposta'
              "
            >
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

          <v-row class="w-100 mx-auto">
            <v-col cols="12" align-self="baseline" md>
              <v-row class="flex-column">
                <v-col class="px-0">
                  <span class="text-light title1"> Dados dos Locatario </span>
                </v-col>

                <v-row
                  justify="space-between"
                  class="flex-column w-100 mx-auto"
                >
                  <v-col
                    v-for="(person, index) in getPersons"
                    :key="index"
                    align="start"
                    cols="12"
                    md
                    class="px-0"
                  >
                    <CardTenant :person="person" :index="index" />
                  </v-col>
                </v-row>
              </v-row>

              <v-row class="mt-5 mb-2 flex-column">
                <v-col class="px-0 pb-0">
                  <span class="text-light title1">
                    Dados do pacotes de locação
                  </span>
                </v-col>

                <v-col class="px-0">
                  <CheckoutListPackLocation />
                </v-col>
              </v-row>

              <v-row class="flex-column mt-0">
                <v-col class="px-0 text-light pb-0 pt-0-important">
                  <span class="text-light title1"> Informações do imóvel </span>
                </v-col>

                <v-col class="px-0">
                  <v-card
                    class="border-radius-checkout"
                    height="auto"
                    elevation="1"
                    outlined
                  >
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" sm="3" class="justify-xs-center">
                          <Map style="height: 16vh" />
                        </v-col>

                        <v-col cols="12" sm="6" class="d-flex flex-column">
                          <span class="super-title1 text-light">
                            {{ getAddress.street }}, {{ getAddress.number }}
                          </span>
                          <span class="subtitle-1 font-weight-medium">
                            {{ getAddress.neighborhood }}
                          </span>
                          <span class="subtitle-1 font-weight-medium">
                            {{ getAddress.city }}, {{ getAddress.state }}
                          </span>
                        </v-col>

                        <v-col
                          cols="12"
                          sm="3"
                          class="d-flex align-center justify-center"
                          v-if="
                            typeCheckout === 'end' ||
                            typeCheckout === 'redirect'
                          "
                        >
                          <v-btn
                            color="primary"
                            rounded
                            class="text-capitalize"
                            medium
                            @click="$router.push('/dados-imovel')"
                            outlined
                          >
                            <span class="text-center px-3">
                              Editar
                              <i class="las la-pen"></i>
                            </span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-row
                class="flex-column pb-4"
                v-if="typeCheckout === 'attachment'"
              >
                <v-col class="px-0 text-light">
                  <span class="text-light title1">Documento de locação</span>
                </v-col>

                <v-col class="px-0">
                  <v-card
                    class="border-radius-checkout"
                    height="auto"
                    elevation="1"
                    outlined
                  >
                    <v-card-text
                      style="min-height: 130px"
                      class="d-flex align-center"
                    >
                      <v-col
                        v-for="(item, index) in itens"
                        :key="index"
                        class="py-0"
                        cols="4"
                        md="6"
                      >
                        <span class="text-light body-1 font-weight-regular">
                          {{ item.title }}
                        </span>

                        <div
                          class="pt-2"
                          v-if="getViewAttachments[item.keyName]"
                        >
                          <CardAnexo
                            :viewDelete="true"
                            :anexo="getAttachmentsCheckoutEnd[index]"
                            :index="index"
                            :pageIsCheckout="true"
                          />
                        </div>

                        <div class="pt-2" v-else>
                          <DialogNovoAnexo
                            :documenttype="item.id"
                            :index="index"
                          />
                        </div>
                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row
            justify="start"
            class="text-center my-1 text-sm-right w-100 mx-auto"
          >
            <v-col cols="12" class="px-0">
              <v-btn
                @click="
                  $router.push(
                    typeCheckout === 'attachment' || typeCheckout === 'view'
                      ? '/proposta'
                      : '/dados-imovel'
                  )
                "
                class="mr-sm-2 w-xs-100"
                large
                rounded
                color="primary"
                outlined
              >
                <span class="text-capitalize px-10">Voltar</span>
              </v-btn>

              <v-btn
                @click="
                  typeCheckout === 'attachment'
                    ? ChangeStatusProposeIsValid()
                    : rocketAnimation()
                "
                class="w-xs-100"
                large
                rounded
                color="primary"
                v-if="typeCheckout !== 'view'"
              >
                <span class="text-none">Enviar para Análise</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import {
  updatePropose,
  sendNotification,
  getSessionUser,
} from "@/core/service/core.service.js";
import {
  createAssigns,
  createDocument,
  createAbout,
  getVeloScore,
  createEvalutionHistory,
  sendMailVeloSIGN,
} from "@/core/service/velo-fianca/checkout.service.js";
import {
  GET_HANDLE_STEP,
  GET_RANDOM_HASH,
  GET_LOADING,
} from "@/core/store/core.module.js";
import { mapGetters } from "vuex";
import StepperPropose from "@/views/velofianca/propose/StepperPropose.vue";
import CardTenant from "@/views/velofianca/propose/cards/CardTenant.vue";
import CardAnexo from "@/views/velofianca/propose/cards/CardAnexo.vue";
import CheckoutListPackLocation from "@/views/velofianca/propose/tables/CheckoutListPackLocation";
import RocketAnimation from "./RocketAnimation.vue";
import $ from "jquery";
import DialogAutomatizadaAprovado from "./dialogs/DialogAutomatizadaAprovado.vue";
import Map from "@/views/components/widgets/Map";
import DialogAutomatizadaReprovado from "./dialogs/DialogAutomatizadaReprovado.vue";
import DialogNovoAnexo from "./dialogs/DialogNovoAnexo.vue";
import {
  formatZipcode,
  formatDocument,
  getAvatarDefault,
  unformatString,
  verifyRisk,
  resetStateVuex,
} from "@/utils/utils.js";
import Loader from "@/views/components/widgets/Loader";

import { GET_KEEP_PROPOSE } from "@/core/store/velo-fianca/keepPropose.module.js";
import { getProposeComplete } from "@/core/service/velo-fianca/packLocation.service.js";

export default {
  components: {
    StepperPropose,
    CardTenant,
    CheckoutListPackLocation,
    RocketAnimation,
    DialogAutomatizadaAprovado,
    Map,
    DialogAutomatizadaReprovado,
    CardAnexo,
    DialogNovoAnexo,
    Loader,
  },
  data() {
    return {
      idProperty: null,
      loading: false,
      typeCheckout: null,
      userSession: null,
      cardAnexo: {
        isDelete: true,
        linkDownload: null,
      },
      DialogAutomatizadaAprovado,
      flDialog: false,
      avatar: "",
      approved: "",
      checkoutEnd: false,
      itens: [
        {
          title: "Contrato de locação",
          keyName: "contractLocation",
          id: 1,
        },
        {
          title: "Vistoria de locação",
          keyName: "surveyLocation",
          id: 2,
        },
      ],
      view: false,
      itemsBreadcrumb: [
        {
          text: "Propostas",
          disabled: false,
          to: "/proposta",
        },
        {
          text: "Checkout",
          disabled: true,
          to: "/",
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "getPersons",
      "getAddress",
      "getAttachments",
      "getAttachmentsCheckoutEnd",
      "getViewAttachments",
      "getVlTotal",
      "getRandomHash",
    ]),
  },
  mounted() {
    $("html").css({ "overflow-y": "auto" });

    this.typeCheckout = this.$route.query.checkout;

    getSessionUser().then((session) => {
      this.userSession = session.data.return[0].id;
    });

    if (this.$route.query.checkout === "end") {
      this.validations();
    } else {
      const self = this;
      resetStateVuex(self);

      if (
        this.$route.query.checkout === "redirect" ||
        this.$route.query.checkout === "attachment" ||
        this.$route.query.checkout === "view"
      ) {
        const self = this;

        this.$store.dispatch(GET_KEEP_PROPOSE, self);
      }
    }

    this.verifyItensBreadcrumb();
    this.$store.dispatch(GET_HANDLE_STEP, 5);
  },
  methods: {
    ChangeStatusProposeIsValid() {
      const result = this.getAttachmentsCheckoutEnd.filter(
        (item) => item === null
      );

      if (result.length === 0) {
        const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

        updatePropose(
          JSON.stringify({
            id: sessionStorageItem.objectPropose.id,
            status: 11,
          })
        ).then(() => this.$router.push("/proposta"));
      } else {
        this.$toast.error("Você precisa anexar os dois documentos!");
      }
    },

    getAvatar() {
      if (this.getPersons.length > 0) {
        let filterResponsible = this.getPersons.filter(
          ({ type }) => type === "Responsável" || "Empresa"
        );

        if (filterResponsible.length > 0) {
          this.avatar = getAvatarDefault(filterResponsible[0].name);
        }
      }
    },

    organizePersons() {
      let result = this.getPersons.findIndex(
        ({ type }) => type === "Empresa" || type === "Responsável"
      );

      if (result > -1) {
        var element = this.getPersons[result];
        this.getPersons.splice(result, 1);
        this.getPersons.splice(0, 0, element);
      }
    },

    prepareData() {
      const allPersons = this.getPersons.filter(
        ({ type }) => type !== "Empresa"
      );
      const raw = this.getPersons.map(({ document, rental }) => ({
        document: formatDocument("CPF", document),
        declared: unformatString(rental, "pt-BR"),
        requested: unformatString(this.getVlTotal, "pt-BR") / allPersons.length,
      }));

      return raw;
    },

    rocketAnimation() {
      window.scrollTo(0, 0);
      $("#rocket").removeClass("out");
      $(".wrapper-rocket").fadeIn();
      $("#rocket").addClass("entry");
      $("html").css({ overflow: "hidden" });

      getVeloScore(JSON.stringify(this.prepareData())).then(({ data }) => {
        $("#rocket").removeClass("entry");
        $("#rocket").addClass("out");

        setTimeout(() => {
          $(".wrapper-rocket").fadeOut();
          $("html").css({ "overflow-y": "auto" });

          if (verifyRisk(data.return.idrisk)) {
            this.proposeApproved();
            this.approved = true;
          } else {
            this.proposeReproved();
            this.approved = false;
          }

          const result = data.return.person.map(({ id }) => ({
            propose: JSON.parse(sessionStorage.getItem("data")).objectPropose
              .id,
            consultantion: id,
          }));

          createEvalutionHistory(result.length === 1 ? result[0] : result);

          this.flDialog = true;

          sendNotification({
            user: this.userSession,
            status: 1,
            content: "Sua proposta está em análise!!",
            type: 0,
          });
        }, 900);
      });
    },

    proposeReproved() {
      sendNotification({
        user: this.userSession,
        status: 1,
        content: "Sua proposta foi reprovada!!",
        type: 0,
      });

      updatePropose(
        JSON.stringify({
          id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
          status: 4,
        })
      );
    },

    getResponsible() {
      if (this.getPersons.length > 0) {
        let filterResponsible = this.getPersons.filter(
          ({ type }) => type === "Responsável" || "Empresa"
        );

        if (filterResponsible.length > 0) {
          return filterResponsible[0];
        }
      }
    },

    proposeApproved() {
      this.loading = true;

      sendNotification({
        user: this.userSession,
        status: 1,
        content: "Sua proposta está aprovada!!",
        type: 0,
      });

      this.$store.dispatch(GET_RANDOM_HASH);
      let { document, email, name } = this.getResponsible();
      let { number, neighborhood, city, state, zipcode, street } =
        this.getAddress;

      let data = JSON.stringify({
        name: "teste-doc",
        file: `${this.getRandomHash}-VeloContract.pdf`,
        hash: this.getRandomHash,
        fields: {
          endereco: street,
          numero: number,
          bairro: neighborhood,
          cidade: city,
          estado: state,
          cep: formatZipcode(zipcode),
          nome: name,
          documento: formatDocument("CPF", document),
          email: email,
          nomecorretor: "testevelo",
          documentocorretor: "42672924937",
          emailcorretor: "testevelo@velo.com.br",
          imobiliarianome: "VELO Imobiliária",
          imobiliariadocumento: "123456789",
          pacote: "pacoteVELO",
          contrato: "123456789",
          tipocontrato: "testevelo",
        },
      });

      createDocument(data).then(({ data }) => {
        let raw =
          this.getPersons.length > 1
            ? this.getPersons.map(({ id }) => ({
                clientperson: id,
                document: data.return[0].id,
                stats: 1,
                hash: "",
              }))
            : {
                clientperson: this.getPersons[0].id,
                document: data.return[0].id,
                stats: 1,
                hash: "",
              };

        createAssigns(JSON.stringify(raw)).then(() => {
          let raw = JSON.stringify({
            document: data.return[0].id,
            description:
              "Declaração de parceria entre velo e locatário para a modalidade de fiança digital.",
          });

          createAbout(raw).then(() => {
            updatePropose(
              JSON.stringify({
                id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
                status: 6,
              })
            ).then((propose) => {
              sendMailVeloSIGN({
                document: data.return[0].hash,
                callback: `${process.env.VUE_APP_VELO}/payment?id=${propose.data.return[0].hash}`,
              }).then(() => {
                this.loading = false;
              });
            });
          });
        });
      });
    },

    verifyItensBreadcrumb() {
      if (
        this.typeCheckout.toUpperCase() === "REDIRECT" ||
        this.typeCheckout.toUpperCase() === "END"
      ) {
        this.itemsBreadcrumb.splice(
          1,
          0,
          {
            text: "Tipo da Proposta",
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
            disabled: false,
            to: "/pacote-locacao",
          },
          {
            text: "Detalhes do imóvel",
            disabled: false,
            to: "/dados-imovel",
          }
        );
      }
    },

    async verifyStatusPropose() {
      const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

      const { data } = await getProposeComplete(
        sessionStorageItem.objectPropose.id
      );

      const { status } = data.return[0];

      if (status == 4) {
        return true;
      } else if (status == 2) {
        return false;
      } else {
        return true;
      }
    },

    async validations() {
      const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

      if (
        sessionStorageItem === null ||
        sessionStorageItem.objectPropose === undefined
      ) {
        this.$router.push("/escolher-tipo-proposta");
      } else if (sessionStorageItem.persons === undefined) {
        this.$router.push("/dados-inquilino");
      } else if (sessionStorageItem.packageLocations === undefined) {
        this.$router.push("/pacote-locacao");
      } else if (sessionStorageItem.address === undefined) {
        this.$router.push("/dados-imovel");
      } else if (await this.verifyStatusPropose()) {
        this.flDialog = true;
      } else {
        this.address = JSON.parse(sessionStorage.getItem("data")).address;
        updatePropose(
          JSON.stringify({
            id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
            step: 5,
          })
        );

        this.getAvatar();
        this.organizePersons();
      }

      this.$store.dispatch(GET_LOADING, false);
    },
  },
};
</script>

<style>
@import url("https://api.mapbox.com/mapbox-gl-js/v2.1.0/mapbox-gl.css");
table {
  border-collapse: collapse;
  width: 100%;
}

th {
  text-align: start;
  padding-left: 24px;
}

td {
  text-align: start;
  padding-top: 24px;
  line-height: 0;
  padding-left: 24px;
}
</style>
