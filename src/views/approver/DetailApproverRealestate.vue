<template>
  <v-app style="background-color: #ececec">
    <div style="background-color: #ececec; overflow: hidden !important">
      <v-breadcrumbs
        :items="itemsBreadcrumb"
        class="font-weight-bold py-1 text-xl-h4"
      >
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>

      <v-card
        outlined
        elevation="0"
        width="auto"
        style="border-radius: 10px; min-height: 93vh"
        class="mx-3 mb-3 d-flex align-start justify-center"
      >
        <loader />

        <v-container fluid class="pa-8">
          <v-card elevation="0">
            <v-card-text class="pa-0">
              <header class="d-flex justify-space-between mb-3">
                <div class="d-flex align-center">
                  <span
                    @click="backPage"
                    class="mr-5"
                    style="cursor: pointer; color: #4fbb4f"
                  >
                    <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
                  </span>

                  <v-avatar class="mx-3" size="120">
                    <img :src="getAvatarDefault(inputsValue.comercialname)" />
                  </v-avatar>

                  <v-col cols="12" class="d-flex flex-column">
                    <span class="super-title1 font-weight-bold">
                      {{ inputsValue.comercialname || "-" }}
                    </span>

                    <span class="text-h6">
                      {{ inputsValue.name || "-" }}
                    </span>

                    <span class="subtitle-1">
                      {{ inputsValue.document || "-" }}
                    </span>

                    <span class="subtitle-1">
                      {{ inputsValue.creci || "-" }}
                    </span>
                  </v-col>
                </div>

                <div class="d-flex align-center">
                  <v-btn
                    rounded
                    class="text-capitalize"
                    color="primary"
                    @click="salvarRealEstate"
                    :loading="btnLoading"
                  >
                    <span class="text-center title2 font-weight-regular px-3">
                      Aprovar
                      <v-icon class="ml-2" style="font-size: 18px"
                        >mdi-check
                      </v-icon>
                    </span>
                  </v-btn>
                </div>
              </header>

              <div class="pt-0 d-flex d-block">
                <v-col class="d-flex flex-column pb-0">
                  <span class="super-title1 font-weight-bold">
                    Dados da Imobiliária
                  </span>

                  <v-form
                    class="pt-3"
                    ref="formRealEstateForm"
                    v-model="valid"
                    lazy-validation
                  >
                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      CPF/CNPJ
                    </h6>
                    <v-text-field
                      dense
                      placeholder="CNPJ"
                      outlined
                      required
                      v-mask="['###.###.###-##', '##.###.###/####-##']"
                      :rules="rules.document"
                      v-model="inputsValue.document"
                    ></v-text-field>

                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      Nome Fantasia
                    </h6>
                    <v-text-field
                      dense
                      placeholder="Nome fantasia"
                      outlined
                      required
                      :rules="rules.comercialname"
                      v-model="inputsValue.comercialname"
                    ></v-text-field>

                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      Razão Social
                    </h6>
                    <v-text-field
                      dense
                      placeholder="Razão social"
                      outlined
                      required
                      :rules="rules.name"
                      v-model="inputsValue.name"
                      autocomplete="chrome-off"
                    ></v-text-field>

                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      CRECI
                    </h6>
                    <v-text-field
                      dense
                      placeholder="CRECI"
                      outlined
                      required
                      :rules="rules.creci"
                      v-model="inputsValue.creci"
                    ></v-text-field>

                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      Telefone
                    </h6>
                    <v-text-field
                      dense
                      placeholder="Telefone"
                      outlined
                      required
                      :rules="rules.phoneRules"
                      v-mask="['(##) #####-####', '(##) ####-####']"
                      v-model="inputsValue.phone"
                    ></v-text-field>
                  </v-form>
                </v-col>

                <v-col class="d-flex justify-end flex-column pb-0">
                  <span class="super-title1 text-left font-weight-bold">
                    Localização da Imobiliária
                  </span>

                  <v-form
                    class="pt-3"
                    ref="formRealEstateFormAddress"
                    v-model="formRealEstateFormAddressValid"
                    lazy-validation
                  >
                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      CEP
                    </h6>
                    <v-text-field
                      dense
                      placeholder="CEP"
                      outlined
                      required
                      :rules="rulesAddress.zipcode"
                      v-model="inputsValueAddress.zipcode"
                    ></v-text-field>

                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      Rua
                    </h6>
                    <v-text-field
                      dense
                      placeholder="Nome da rua"
                      outlined
                      required
                      :rules="rulesAddress.street"
                      v-model="inputsValueAddress.street"
                    ></v-text-field>

                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      Número
                    </h6>
                    <v-text-field
                      dense
                      placeholder="Número"
                      outlined
                      required
                      :rules="rulesAddress.number"
                      v-model="inputsValueAddress.number"
                    ></v-text-field>

                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      Bairro
                    </h6>
                    <v-text-field
                      dense
                      placeholder="Nome do bairro"
                      outlined
                      required
                      :rules="rulesAddress.neighborhood"
                      v-model="inputsValueAddress.neighborhood"
                    ></v-text-field>

                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      Cidade
                    </h6>
                    <v-text-field
                      dense
                      placeholder="Nome da cidade"
                      outlined
                      required
                      :rules="rulesAddress.city"
                      v-model="inputsValueAddress.city"
                    ></v-text-field>
                  </v-form>
                </v-col>

                <v-col class="pb-0">
                  <span class="super-title1 font-weight-bold">
                    Configurações de planos
                  </span>

                  <v-form
                    ref="formRealEstatePlans"
                    v-model="valid"
                    lazy-validation
                  >
                    <div class="mt-2 d-flex flex-column">
                      <h6
                        style="color: #7d7d7d"
                        class="input-label title3 font-weight-bold"
                      >
                        Comercial
                      </h6>
                      <v-select
                        placeholder="Selecione um plano comercial"
                        class="w-100"
                        outlined
                        :item-text="'name'"
                        :item-value="'id'"
                        dense
                        :items="itemscomercial"
                        v-model="plansC"
                        :rules="rules.plans"
                      ></v-select>
                    </div>

                    <div class="d-flex flex-column">
                      <h6
                        style="color: #7d7d7d"
                        class="input-label title3 font-weight-bold"
                      >
                        Residencial
                      </h6>
                      <v-select
                        placeholder="Selecione um plano residencial"
                        outlined
                        dense
                        :item-text="'name'"
                        :item-value="'id'"
                        :items="itemsResidencial"
                        v-model="plansR"
                        :rules="rules.plans"
                      ></v-select>
                    </div>
                  </v-form>
                </v-col>
              </div>
            </v-card-text>
          </v-card>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { cpf, cnpj } from "cpf-cnpj-validator";
import { mapGetters } from "vuex";
import { getRealDetails } from "@/core/service/realestate/detailRealEstate.service.js";
import {
  formatDocument,
  getAvatarDefault,
  formatZipcode,
  unformatPhone,
} from "@/utils/utils.js";
import {
  clientAddressAction,
  clientRealEstateAction,
  companyActions,
  updateRealEstate,
} from "@/core/service/core.service.js";
import {
  GET_ATTACHMENT2,
  GET_COMPANY,
} from "@/core/store/velo-imobiliaria/realEstateAttachment.module.js";
import {
  getPlans,
  putPlans,
  getPlansActive,
} from "@/core/service/realestate/plans.service.js";
import { GET_VIEW_APPROVER_ESTATE } from "@/core/store/velo-fianca/RealEstate.module.js";
import Loader from "@/views/components/widgets/Loader";
import { GET_LOADING } from "@/core/store/core.module.js";
import {
  sendMailVeloSIGN,
  createDocument,
  createAssigns,
  createAbout,
} from "@/core/service/velo-fianca/checkout.service.js";
import { newHashToken } from "@/utils/utils.js";
import extenso from "extenso";
export default {
  components: { Loader },
  data() {
    return {
      documentHash: null,
      asignHash: null,
      clientperson: "",
      nameplan: "",
      coverage: "",
      percent: "",
      itemscomercial: [],
      itemsResidencial: [],
      valid: true,
      formRealEstateFormAddressValid: true,
      btnLoading: false,
      itemsBreadcrumb: [
        {
          text: "Aprovador",
          disabled: false,
          to: "/aprovador",
        },
        {
          text: "Detalhes da imobiliaria",
          disabled: true,
          to: "/",
        },
      ],
      inputsValue: {
        id: "",
        comercialname: "",
        name: "",
        document: "",
        creci: "",
        phone: "",
        idperson: "",
      },
      inputsValueAddress: {
        idAddress: "",
        zipcode: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
      },
      rules: {
        comercialname: [
          (v) => !!v || "O campo de Nome Fantasia não pode ser vazio",
        ],
        name: [(v) => !!v || "O campo de Nome não pode ser vazio"],
        creci: [(v) => !!v || "O campo de CRECI não pode ser vazio"],
        rua: [(v) => !!v || "O campo de Rua não pode ser vazio"],
        numero: [(v) => !!v || "O campo de Número não pode ser vazio"],
        bairro: [(v) => !!v || "O campo de bairro não pode ser vazio"],
        city: [(v) => !!v || "O campo de cidade não pode ser vazio"],
        document: [(v) => !!v || this.validationDocument(v)],
        phoneRules: [
          (v) => !!v || "O número de telefone não pode ser vazio",
          (v) =>
            /^\([1-9]{2}\) (?:9[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            /^\([1-9]{2}\) (?:[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            "Número de telefone inválido",
        ],
        plans: [(v) => !!v || "Você precisa selecionar algum plano"],
      },

      rulesAddress: {
        zipcode: [(v) => !!v || "O campo de CEP não pode ser vazio"],
        cep: [(v) => !!v || "O CEP não pode ser vazio"],
        street: [(v) => !!v || "O nome da rua não pode ser vazio"],
        number: [(v) => !!v || "O campo de número não pode ser vazio"],
        state: [(v) => !!v || "Você precisa escolher o estado"],
        neighborhood: [(v) => !!v || "O campo de Bairro não pode ser vazio"],
        city: [(v) => !!v || "O campo da City não pode ser vazio"],
      },
      plansC: "",
      plansR: "",
    };
  },

  computed: {
    ...mapGetters(["getPlans"]),
  },

  created() {
    this.$store.dispatch(GET_LOADING, true);
    this.$store.dispatch(GET_COMPANY, this.$route.params.id);

    this.getInfosRealestate();
  },

  methods: {
    getAvatarDefault,
    async getInfosRealestate() {
      const IdCompany = this.$route.params.id;

      await getRealDetails(IdCompany).then(async ({ data }) => {
        if (data.return.length > 0) {
          const address = {
            id: Number(data.return[0].idaddress),
            zipcode: data.return[0].zipcode,
            street: data.return[0].street,
            number: data.return[0].dsnumber,
            neighborhood: data.return[0].neighborhood,
            city: data.return[0].city,
          };

          const realEstateData = {
            id: data.return[0].idrealestate,
            company: Number(IdCompany),
            comercialname: data.return[0].comercialname,
            name: data.return[0].name,
            document: data.return[0].document,
            creci: data.return[0].creci,
            phone: data.return[0].phone,
            clientperson: data.return[0].idperson,
            cnpj: data.return[0].document,
            email: data.return[0].email,
            responsavel: data.return[0].personname,
            cpf: data.return[0].cpf,
            estado: data.return[0].estado,
          };

          this.inputsValue = realEstateData;
          this.inputsValueAddress = address;

          this.$store.dispatch(GET_ATTACHMENT2, IdCompany);

          await this.getPlanos();
          await this.getactiveplans(data.return[0].idrealestate);

          this.$store.dispatch(GET_LOADING, false);
        }
      });
    },

    backPage() {
      this.$router.push(`/aprovador/`);
    },

    async getactiveplans(IdRealEstate) {
      await getPlansActive(IdRealEstate).then(({ data }) => {
        data.return.map(({ plan, plantype, nameplan, percent, coverage }) => {
          if (plantype === "Comercial") {
            this.plansC = plan;
            this.nameplan = nameplan;
            this.coverage = coverage;
            this.percent = percent;
          } else {
            this.plansR = plan;
            this.nameplan = nameplan;
            this.coverage = coverage;
            this.percent = percent;
          }
        });
      });
    },

    async getPlanos() {
      await getPlans().then((plans) => {
        plans.data.return.forEach((item) => {
          if (item.type == 2) {
            this.itemscomercial.push({
              ...item,
              name: `${item.name} - ${parseInt(item.percent)}%`,
            });
          } else {
            this.itemsResidencial.push({
              ...item,
              name: `${item.name} - ${parseInt(item.percent)}%`,
            });
          }
        });
      });
    },

    salvarRealEstate() {
      const resultFormRealEstateForm = this.$refs.formRealEstateForm.validate();
      const resultFormRealEstateFormAddress =
        this.$refs.formRealEstateFormAddress.validate();
      const resultFormRealEstatePlans =
        this.$refs.formRealEstatePlans.validate();

      if (
        resultFormRealEstateForm &&
        resultFormRealEstateFormAddress &&
        resultFormRealEstatePlans
      ) {
        this.btnLoading = true;

        const { document, name, comercialname, phone } = this.inputsValue;
        const Idrealestate = this.inputsValue.id;
        const rawcompany = {
          id: this.$route.params.id,
          document: formatDocument("CNPJ", document),
          name,
          comercialname,
          phone: unformatPhone(phone),
        };
        const rawAddress = {
          id: this.inputsValueAddress.id,
          zipcode: formatZipcode(this.inputsValueAddress.zipcode),
          street: this.inputsValueAddress.street,
          number: this.inputsValueAddress.number,
          neighborhood: this.inputsValueAddress.neighborhood,
          city: this.inputsValueAddress.city,
        };
        const rawplans = {
          realestate: Idrealestate,
          comercialplan: this.plansC,
          residenceplan: this.plansR,
        };

        Promise.all([
          putPlans(rawplans),
          companyActions.edit(rawcompany),
          clientAddressAction.update(rawAddress),
          this.flowCreateDocumentToSign(),
        ]);
      }
    },

    validationDocument(value) {
      if (!value) {
        return "O campo de CPF/CNPJ não pode ser vazio";
      } else if (value && formatDocument("CPF", value).length <= 11) {
        this.isCNPJ = false;

        if (!cpf.isValid(value)) {
          return "CPF Inválido";
        }

        return true;
      } else if (value && formatDocument("CNPJ", value).length > 11) {
        this.isCNPJ = true;
        this.inputsValue.type = "Empresa";

        if (!cnpj.isValid(value)) {
          return "CNPJ Inválido";
        }

        return true;
      } else {
        this.isCNPJ = false;

        return true;
      }
    },

    async flowCreateDocumentToSign() {
      const hash = newHashToken();
      const {
        comercialname,
        cnpj,
        phone,
        creci,
        estado,
        responsavel,
        cpf,
        email,
      } = this.inputsValue;
      const { street, neighborhood, city, number, zipcode } =
        this.inputsValueAddress;

      const data = {
        name: "teste-doc",
        file: `${hash}-VeloContract`,
        hash: hash,
        fields: {
          imobiliaria: comercialname,
          cnpj,
          telefone: phone,
          creci,
          endereco: street,
          bairro: neighborhood,
          cidade: city,
          estado,
          numero: number,
          cep: zipcode,
          responsavel,
          cpf,
          email,
          pacote: this.nameplan,
          porcentagem: this.percent,
          cobertura: this.percent,
          coberturaextenso: this.coverage,
          comercialpacote: this.nameplan,
          comercialporcentagem: this.percent,
          comercialcobertura: this.coverage,
          comercialcoberturaextenso: this.coverage,
        },
      };

      createDocument(data, "16xpi8htg9kn19cxop57klpimrij").then(({ data }) => {
        this.documentHash = data.return[0].hash;

        const raw = {
          clientperson: this.inputsValue.clientperson,
          document: data.return[0].id,
          status: 1,
          hash: "",
        };

        createAssigns(JSON.stringify(raw)).then((response) => {
          this.asignHash = response.data.return[0].hash;

          const raw = JSON.stringify({
            document: data.return[0].id,
            clientperson: this.inputsValue.clientperson,
            description: `Este contrato visa qualificar a união entre <b>${this.inputsValue.comercialname}</b> e a <b>VELO</b> no âmbito da prestação de serviços de fiador digital, este é um contrato de parceria não oneroso, em poucas palavras de conceito popular o mesmo não trata valores financeiros imediatos.`,
          });

          createAbout(raw).then(() => {
            Promise.all([
              sendMailVeloSIGN({
                document: data.return[0].hash,
                callback: null,
              }),
              updateRealEstate(
                JSON.stringify({
                  id: this.inputsValue.id,
                  status: 2,
                  creci: this.inputsValue.creci,
                  contract: `https://dev.velo.com.br/app/velosign/view.html?document=${this.documentHash}&subscriber=${this.asignHash}`,
                })
              ),
            ]).then(() => {
              this.$store.dispatch(GET_VIEW_APPROVER_ESTATE);

              this.$toast.success("Imobiliaria foi aprovada com sucesso");

              this.btnLoading = false;

              this.$router.push("/aprovador");
            });
          });
        });
      });
    },
  },
};
</script>

<style>
.v-text-field__details {
  margin-bottom: 0px !important;
}
</style>
