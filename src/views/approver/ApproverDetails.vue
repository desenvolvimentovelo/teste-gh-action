<template>
  <v-app style="background-color: #ececec">
    <div
      class="d-flex flex-column justify-start"
      style="
        background-color: #ececec;
        overflow: hidden !important;
        min-height: 100vh;
      "
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
        <v-container fluid class="h-100 px-5 py-5 pa-lg-10">
          <div class="mx-auto w-100 d-flex">
            <span
              @click="backPage"
              class="mr-5"
              style="cursor: pointer; color: #4fbb4f"
            >
              <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
            </span>
            <div
              class="mr-auto grey--text text--darken-2 font-weight-regular d-flex align-center"
            >
              <h2>Proposta - {{ this.$route.params.id }}</h2>
            </div>

            <div class="ml-auto justify-end">
              <v-btn
                color="error"
                class="text-capitalize"
                elevation="2"
                rounded
                @click="dialog2 = true"
              >
                Reprovar
                <v-icon class="ml-2" style="font-size: 18px">mdi-close</v-icon>
              </v-btn>

              <v-btn
                color="primary"
                class="text-capitalize ml-2"
                elevation="2"
                rounded
                @click="Approver()"
                :loading="loadingAprover"
              >
                Aprovar
                <v-icon class="ml-2" style="font-size: 18px">mdi-check</v-icon>
              </v-btn>
            </div>
          </div>

          <div>
            <v-col class="d-flex flex-column px-0">
              <div
                class="mb-3 my-auto grey--text text--darken-2 font-weight-regular"
              >
                <v-card
                  class="w-100"
                  height="100%"
                  elevation="1"
                  outlined
                  rounded="lg"
                >
                  <v-card-text>
                    <p class="grey--text text--darken-2 font-weight-regular">
                      <strong>Proposta</strong>
                    </p>

                    <v-row class="d-flex flex-row">
                      <v-col cols="2" class="mt-0">
                        <p
                          class="grey--text text--darken-2 font-weight-regular"
                        >
                          <strong>Tipo de Proposta</strong>
                        </p>
                        <v-row class="mx-0">{{
                          proposedetail.proposetype || "-"
                        }}</v-row>
                      </v-col>

                      <v-col cols="2">
                        <p
                          class="grey--text text--darken-2 font-weight-regular"
                        >
                          <strong>Tipo imóvel</strong>
                        </p>

                        <v-row class="mx-0"
                          ><p class="font-weight-regular">
                            {{ proposedetail.propertytype }}
                          </p></v-row
                        >
                      </v-col>
                      <v-col>
                        <p
                          class="grey--text text--darken-2 font-weight-regular"
                        >
                          <strong>Imobiliária</strong>
                        </p>

                        <v-row class="mx-0"
                          ><p class="font-weight-regular">
                            {{ proposedetail.realestate || "-" }}
                          </p></v-row
                        >
                      </v-col>
                      <v-col>
                        <p
                          class="grey--text text--darken-2 font-weight-regular"
                        >
                          <strong>Corretor</strong>
                        </p>

                        <v-row class="mx-0"
                          ><p class="font-weight-regular">
                            {{ proposedetail.realtor || "-" }}
                          </p></v-row
                        >
                      </v-col>
                      <v-col>
                        <p
                          class="grey--text text--darken-2 font-weight-regular"
                        >
                          <strong>Valor total</strong>
                        </p>

                        <v-row class="mx-0"
                          ><p class="font-weight-regular">
                            {{ proposedetail.packValue || "-" }}
                          </p></v-row
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <p
                          class="grey--text text--darken-2 font-weight-regular"
                        >
                          <strong>Imóvel</strong>
                        </p>
                        <v-row class="d-flex justify-space-between">
                          <v-col cols="2" class="mt-auto">
                            <p
                              class="grey--text text--darken-2 font-weight-regular"
                            >
                              <strong>Rua</strong>
                            </p>
                            <v-row class="mx-0"
                              ><p class="font-weight-regular text-left mx-0">
                                {{ proposedetail.street || "-" }}
                              </p></v-row
                            >
                          </v-col>

                          <v-col cols="2">
                            <p
                              class="grey--text text--darken-2 font-weight-regular"
                            >
                              <strong>Número</strong>
                            </p>

                            <v-row class="mx-0"
                              ><p class="font-weight-regular">
                                {{ proposedetail.number || "-" }}
                              </p></v-row
                            >
                          </v-col>
                          <v-col cols="3">
                            <p
                              class="grey--text text--darken-2 font-weight-regular"
                            >
                              <strong>Complemento</strong>
                            </p>

                            <v-row class="mx-0"
                              ><p class="font-weight-regular">
                                {{ proposedetail.complement || "-" }}
                              </p></v-row
                            >
                          </v-col>
                          <v-col cols="2">
                            <p
                              class="grey--text text--darken-2 font-weight-regular"
                            >
                              <strong>Bairro</strong>
                            </p>
                            <v-row class="mx-0"
                              ><p class="font-weight-regular">
                                {{ proposedetail.neighborhood || "-" }}
                              </p></v-row
                            >
                          </v-col>
                          <v-col>
                            <p
                              class="grey--text text--darken-2 font-weight-regular"
                            >
                              <strong>Cidade</strong>
                            </p>

                            <v-row class="mx-0"
                              ><p class="font-weight-regular">
                                {{ proposedetail.city || "-" }}
                              </p></v-row
                            >
                          </v-col>
                          <v-col>
                            <p
                              class="grey--text text--darken-2 font-weight-regular"
                            >
                              <strong>Estado</strong>
                            </p>

                            <v-row class="mx-0"
                              ><p class="font-weight-regular">
                                {{ proposedetail.state || "-" }}
                              </p></v-row
                            >
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
          </div>

          <v-dialog v-model="dialog2" max-width="500px">
            <v-card class="white" elevation="0">
              <v-card-title class="d-flex justify-space-between green">
                <span class="white--text font-weight-regular">
                  Mensagem para reprovação
                </span>
              </v-card-title>

              <v-card-text>
                <v-row class="d-flex pa-2 pl-3 justify-center">
                  <img
                    src="../../assets/images/message_sent.svg"
                    alt="message"
                    style="width: 190px"
                  />
                  <v-row class="d-flex pa-3 pl-3 justify-center">
                    <p class="grey--text text--darken-2 font-weight-regular">
                      Abaixo você pode selecionar a mensagem para a Reprovação.
                    </p>
                  </v-row>
                </v-row>

                <v-select
                  :items="itemsmessage"
                  :item-text="'title'"
                  :item-value="'description'"
                  v-model="selected"
                  @change="dadosselect = selected"
                  label="Clique para selecionar uma mensagem"
                ></v-select>
              </v-card-text>
              <v-col v-if="selected" cols="12" md="12">
                <v-textarea
                  v-model="dadosselect"
                  outlined
                  name="input"
                  label="Mensagem Padrão editavél"
                ></v-textarea>
                <v-row class="d-flex pa-1 pl-2 justify-center">
                  <v-btn
                    color="primary"
                    class="text-capitalize mt-2"
                    elevation="2"
                    @click="handleFail()"
                    :loading="loadingFail"
                    large
                  >
                    Finalizar
                  </v-btn>
                </v-row>
              </v-col>
            </v-card>
          </v-dialog>

          <div class="d-flex flex-column">
            <v-col
              class="d-flex flex-column pt-2 px-0"
              v-for="(item, index) in persondetailpropose"
              :key="index"
            >
              <CardPerson
                :persondetailpropose="item"
                :persondocument="dadosanexo"
              />
            </v-col>
          </div>
        </v-container>
      </v-card>
    </div>

    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          outlined
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          OK
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getProposeDetail,
  getPersondetail,
  getPartnerText,
  addEvaluationtext,
} from "../../core/service/velo-fianca/proposedetail.service";
import dayjs from "dayjs";
import { organizePersons } from "@/utils/utils";
import {
  updatePropose,
  sendMail,
  sendNotification,
  getSessionUser,
} from "@/core/service/core.service";
import {
  sendMailVeloSIGN,
  createAssigns,
  createDocument,
  createAbout,
} from "@/core/service/velo-fianca/checkout.service.js";
import CardPerson from "./CardPerson.vue";
import { GET_RANDOM_HASH } from "@/core/store/core.module.js";
import { formatDocument } from "@/utils/utils.js";
import { GET_LOADING } from "@/core/store/core.module.js";
import Loader from "@/views/components/widgets/Loader";
export default {
  components: { CardPerson, Loader },
  data() {
    return {
      userSession: null,
      dialog2: false,
      selected: false,
      page: 1,
      loadingFail: false,
      loadingAprover: false,
      pageCount: 0,
      search: "",
      textdefault: "Sua proposta foi aprovada com sucesso",
      snackbar: false,
      select: [
        { text: "Falta de documento" },
        { text: "Renda recusada" },
        { text: "Falta documentos para analise" },
      ],
      text: `Aguarde funcionalidade ainda em desenvolvimento.`,
      dadosanexo: [],
      dadosselect: [],
      itemsmessage: [],
      idsSign: [],
      person: {
        idperson: "",
        proposetype: "",
        city: "",
        complement: "",
        number: "",
        packValue: "",
        propertytype: "",
        realestate: "",
        realtor: "",
        state: "",
        street: "",
      },
      proposedetail: {
        realtor: "",
        documentocorretor: "",
        emailcorretor: "",
        realestate: "",
        imobiliariadocumento: "",
        packValue: "",
        idpropose: "",
        proposetype: "",
      },
      itemsBreadcrumb: [
        {
          text: "Aprovador",
          disabled: false,
          to: "/aprovador",
        },
        {
          text: "Detalhes proposta",
          disabled: true,
          to: "/",
        },
      ],
      persondetailpropose: [],
      items: [{ title: "Abrir", icon: "mdi-open-in-new" }],
    };
  },
  props: {
    dialogapprover: String,
  },
  computed: {
    ...mapGetters([
      "getProposeDetail",
      "getPartnerText",
      "getPersons",
      "getRandomHash",
    ]),
  },
  mounted() {
    this.getUser();
    this.getPersonsPropose(this.$route.params.id);
    this.dadosselect = this.getPartnerMenssagem();
    this.$store.dispatch(GET_LOADING, true);
  },
  methods: {
      backPage() {
      this.$router.push(`/aprovador`);
    },
    getUser() {
      getSessionUser().then((session) => {
        this.userSession = session.data.return[0].id;
      });
    },

    handleFail() {
      let id = this.$route.params.id;
      this.loadingFail = true;
      updatePropose(
        JSON.stringify({
          id: id,
          status: 5,
        })
      ).then((item) => {
        addEvaluationtext(
          JSON.stringify({
            propose: item.data.return[0].id,
            description: this.dadosselect,
            type: item.data.return[0].status,
          })
        ).then(() => {
          this.loadingFail = false;
          this.$toast.success(
            "Proposta foi Reprovada, verifique na listagem de proposta."
          );
          this.$router.push("/aprovador");

          sendNotification({
            user: this.userSession,
            status: 1,
            content: "Sua proposta foi reprovada!!",
            type: 0,
          });
        });
      });
    },

    Approver() {
      this.loadingAprover = true;
      let id = this.$route.params.id;
      let status = this.persondetailpropose.idstatus;
      let statusAnalise = 11;
      let statusAfiançado = 9;
      let statusAssinatura = 6;

      updatePropose(
        JSON.stringify({
          id: id,
          status: status == statusAnalise ? statusAfiançado : statusAssinatura,
        })
      ).then((item) => {
        this.$toast.success(
          "Proposta foi aprovada, verifique na listagem de proposta "
        );

        sendNotification({
          user: this.userSession,
          status: 1,
          content: "Sua proposta está aprovada!!",
          type: 0,
        });

        addEvaluationtext(
          JSON.stringify({
            propose: item.data.return[0].id,
            description: this.textdefault,
            type: item.data.return[0].status,
          })
        ).then(() => {
          sendMail(4, id);
          this.flowDocument();
        });
      });
    },

    flowDocument() {
      this.$store.dispatch(GET_RANDOM_HASH);
      let { document, email, name } = this.getResponsible();
      let data = JSON.stringify({
        name: "teste-doc",
        file: `${this.getRandomHash}-VeloContract.pdf`,
        hash: this.getRandomHash,
        fields: {
          endereco: this.proposedetail.street,
          numero: this.proposedetail.number,
          bairro: this.proposedetail.neighborhood,
          cidade: this.proposedetail.city,
          estado: this.proposedetail.state,
          // cep: formatZipcode(zipcode),
          nome: name,
          documento: formatDocument("CPF", document),
          email: email,
          nomecorretor: this.proposedetail.realtor,
          documentocorretor: this.proposedetail.documentocorretor,
          emailcorretor: this.proposedetail.emailcorretor,
          imobiliarianome: this.proposedetail.realestate,
          imobiliariadocumento: this.proposedetail.imobiliariadocumento,
          pacote: this.proposedetail.packValue,
          contrato: this.proposedetail.idpropose,
          tipocontrato: this.proposedetail.proposetype,
        },
      });

      createDocument(data).then(({ data }) => {
        let raw = [];

        if (this.persondetailpropose.length > 1) {
          for (let index = 0; index < this.idsSign.length; index++) {
            raw.push({
              clientperson: this.idsSign[index],
              document: data.return[0].id,
              stats: 1,
              hash: "",
            });
          }
        } else {
          raw = {
            clientperson: this.person.idperson,
            document: data.return[0].id,
            stats: 1,
            hash: "",
          };
        }

        createAssigns(JSON.stringify(raw)).then(() => {
          let raw = JSON.stringify({
            document: data.return[0].id,
            description:
              "Declaração de parceria entre velo e locatário para a modalidade de fiança digital.",
          });

          createAbout(raw).then(() => {
            updatePropose(
              JSON.stringify({
                id: this.proposedetail.idpropose,
                status: 6,
              })
            ).then((propose) => {
              sendMailVeloSIGN({
                document: data.return[0].hash,
                callback: `${process.env.VUE_APP_VELO}/payment?id=${propose.data.return[0].hash}`,
              }).then(() => {
                this.loadingAprover = false;
                this.$router.push("/aprovador");
              });
            });
          });
        });
      });
    },

    getPersonsPropose(idPropose) {
      Promise.all([
        getProposeDetail(idPropose),
        getPersondetail(idPropose),
      ]).then((responses) => {
        const [proposedetail, persondetail] = responses;
        const { idpropose, packValue } = proposedetail.data.return[0];
        this.proposedetail = proposedetail.data.return[0];

        this.$store.dispatch(GET_LOADING, false);
        persondetail.data.return.map((person) => {
          this.idsSign.push(person.idperson);
          this.person = {
            ...person,
            packValue: Number(packValue).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
          };
        });

        sessionStorage.setItem(
          "data",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("data")),
            objectPropose: {
              id: idpropose,
            },
          })
        );

        let result = persondetail.data.return.map((item) => ({
          ...item,
          birth: dayjs(item.birth).format("DD/MM/YYYY"),
        }));

        this.persondetailpropose = organizePersons(result);
      });
    },
    getResponsible() {
      if (this.persondetailpropose.length > 0) {
        let filterResponsible = this.persondetailpropose.filter(
          ({ type }) => type === "Responsável" || "Empresa"
        );

        if (filterResponsible.length > 0) {
          return filterResponsible[0];
        }
      }
    },

    getPartnerMenssagem() {
      Promise.all([getPartnerText()]).then((textt) => {
        let resultmessage = textt[0].data.return.map((item) => ({
          ...item,
          description: item.description,
        }));

        this.itemsmessage = organizePersons(resultmessage);
      });
    },
  
  },
};
</script>

<style>
.text-start:nth-child(1) {
  padding-left: 16px !important;
}
</style>
