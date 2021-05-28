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
        style="border-radius: 10px"
        class="mx-3 mb-3"
      >
        <loader />

        <v-container fluid class="h-100 px-5 py-5 pa-lg-10">
          <v-row class="mx-auto">
            <v-card width="100%" elevation="0">
              <v-card-text>
                <v-row>
                  <v-col
                    cols="12"
                    md="2"
                    sm="3"
                    align="start"
                    class="d-flex pl-lg-10"
                  >
                    <div class="d-flex align-center mr-8">
                      <span
                        @click="backPage"
                        style="
                          margin-left: -34px;
                          cursor: pointer;
                          color: #4fbb4f;
                        "
                        class=""
                      >
                        <i
                          class="las la-arrow-left"
                          style="font-size: 1.5rem"
                        ></i>
                      </span>
                    </div>

                    <v-avatar size="110">
                      <img
                        :src="getAvatarDefault(`${inputsValue.comercialname}`)"
                      />
                    </v-avatar>
                  </v-col>

                  <v-col cols="12" sm="6" md="7" class="d-flex flex-column">
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

                  <v-col
                    cols="12"
                    xs="12"
                    sm="3"
                    md="3"
                    class="d-flex align-center justify-center"
                  >
                    <v-btn
                      rounded
                      large
                      class="text-capitalize"
                      color="primary"
                      @click="salvarRealEstate"
                      :loading="btnLoading"
                      ><span class="text-center title2 font-weight-regular px-3"
                        >Salvar</span
                      ></v-btn
                    >
                    <realestate-desableb />
                  </v-col>
                </v-row>

                <div class="pt-0 d-flex d-block">
                  <v-col class="d-flex flex-column pb-0">
                    <h4 class="black--text mb-2">Dados da Imobiliária</h4>

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
                        CNPJ
                      </h6>
                      <v-text-field
                        dense
                        placeholder="CNPJ"
                        outlined
                        required
                        v-mask="['##.###.###/####-##']"
                        :rules="rules.document"
                        v-model="inputsValue.document"
                        @blur="verifyExistCompany"
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
                    <h4 class="black--text mb-2">Localização da Imobiliária</h4>

                    <v-form
                      class="pt-3"
                      ref="formRealEstateFormAddress"
                      v-model="valid"
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
                        placeholder="Informe cep"
                        outlined
                        required
                        :rules="rules.zipcode"
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
                        placeholder="Informe nome da rua"
                        outlined
                        required
                        :rules="rules.rua"
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
                        placeholder="Informe número"
                        outlined
                        required
                        :rules="rules.numero"
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
                        placeholder="Informe nome do bairro"
                        outlined
                        required
                        :rules="rules.bairro"
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
                        placeholder="Informe nome da cidade"
                        outlined
                        required
                        :rules="rules.city"
                        v-model="inputsValueAddress.city"
                      ></v-text-field>
                    </v-form>
                  </v-col>

                  <v-col class="d-flex justify-center align-end pa-0">
                    <img
                      src="@/assets/images/realestate-details-map.svg"
                      width="100%"
                      style="max-width: 320px"
                    />
                  </v-col>
                </div>

                <v-row>
                  <h4 class="black--text">Anexos</h4>
                </v-row>

                <v-row class="mt-6" justify="center">
                  <v-col
                    cols="4"
                    v-for="(anexo, index) in getAttachmentsDetail"
                    :key="index"
                  >
                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      {{ anexo.tittle }}
                    </h6>

                    <CardAnexoImobiliaria
                      :anexo="anexo"
                      :index="index"
                      v-if="anexo.name"
                    />

                    <DialogAnexoImobiliaria
                      v-if="!anexo.name"
                      :anexo="anexo"
                      :idCompany="$route.params.id"
                      :index="index"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import CardAnexoImobiliaria from "@/views/realestate/cards/cardAnexoImobiliaria.vue";
import DialogAnexoImobiliaria from "@/views/realestate/dialogs/DialogAnexoImobiliaria.vue";
import dropbox from "@/utils/dropbox";
import { cnpj, cpf } from "cpf-cnpj-validator";
import { mapGetters } from "vuex";
import { getRealEstateDetail } from "@/core/service/realestate/detailRealEstate.service.js";
import {
  formatDocument,
  getAvatarDefault,
  newHashToken,
} from "@/utils/utils.js";
import {
  clientAddressAction,
  clientRealEstateAction,
  companyActions,
  getSessionUser,
} from "@/core/service/core.service.js";
import {
  GET_ATTACHMENT2,
  GET_PATH,
  GET_COMPANY,
} from "@/core/store/velo-imobiliaria/realEstateAttachment.module.js";
import Loader from "@/views/components/widgets/Loader";
import { GET_LOADING } from "@/core/store/core.module.js";
import RealestateDesableb from "./RealestateDesableb.vue";
export default {
  components: {
    CardAnexoImobiliaria,
    DialogAnexoImobiliaria,
    Loader,
    RealestateDesableb,
  },
  data() {
    return {
      valid: true,
      btnLoading: false,
      pathFolder: "",
      hashFile: newHashToken(),
      itemsBreadcrumb: [
        {
          text: "Imobiliárias",
          disabled: false,
          to: "/imobiliarias",
        },
        {
          text: "Detalhes da Imobiliária",
          disabled: true,
          to: "/",
        },
      ],
      inputsValue:
        sessionStorage.getItem("realestate") === null
          ? {
              id: this.$route.params.id,
              comercialname: "",
              name: "",
              document: "",
              creci: "",
              phone: "",
            }
          : JSON.parse(sessionStorage.getItem("realestate")),
      inputsValueAddress:
        sessionStorage.getItem("realestateAddress") === null
          ? {
              idAddress: "",
              zipcode: "",
              street: "",
              number: "",
              neighborhood: "",
              city: "",
            }
          : JSON.parse(sessionStorage.getItem("realestateAddress")),
      rules: {
        comercialname: [(v) => !!v || "Nome fantasia não pode ser vazio"],
        name: [(v) => !!v || "Razão social não pode ser vazio"],
        creci: [(v) => !!v || "Creci não pode ser vazio"],
        zipcode: [(v) => !!v || "Cep não pode ser vazio"],
        rua: [(v) => !!v || "Rua não pode ser vazio"],
        numero: [(v) => !!v || "Numero não pode ser vazio"],
        bairro: [(v) => !!v || "Bairro não pode ser vazio"],
        city: [(v) => !!v || "Cidade não pode ser vazio"],
        document: [
          (v) => !!v || "O CPF/CNPJ não pode ser vazio",
          (v) => this.validationDocument(v) || "O CPF/CNPJ é inválido",
        ],
        phoneRules: [
          (v) => !!v || "O número de telefone não pode ser vazio",
          (v) =>
            /^\([1-9]{2}\) (?:9[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            /^\([1-9]{2}\) (?:[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            "Número de telefone inválido",
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["getAttachmentsDetail"]),
  },
  created() {
    this.$store.dispatch(GET_COMPANY, this.$route.params.id);
    this.$store.dispatch(GET_LOADING, true);

    if (this.$route.params.id !== "novo") {
      getRealEstateDetail(this.$route.params.id).then(({ data }) => {
        if (data.return.length > 0) {
          let address = {
            id: Number(data.return[0].idaddress),
            zipcode: data.return[0].zipcode,
            street: data.return[0].street,
            number: data.return[0].dsnumber,
            neighborhood: data.return[0].neighborhood,
            city: data.return[0].city,
          };

          let realEstateData = {
            id: data.return[0].idrealestate,
            company: data.return[0].idcompany,
            comercialname: data.return[0].comercialname,
            name: data.return[0].name,
            document: data.return[0].document,
            creci: data.return[0].creci,
            phone: data.return[0].phone,
          };

          this.inputsValue = realEstateData;
          this.inputsValueAddress = address;

          this.getAvatarDefault(`${this.inputsValue.comercialname}`);
          this.verifyExistFolderRealEstate();
          this.$store.dispatch(GET_ATTACHMENT2, this.$route.params.id);
          this.$store.dispatch(GET_LOADING, false);
        }
      });
    }
  },
  methods: {
    getAvatarDefault,
    backPage() {
      this.$router.push("/imobiliarias");
    },
    validationDocument(value) {
      if (value && formatDocument("CPF", value).length <= 11) {
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
    verifyExistCompany() {
      if (cnpj.isValid(this.inputsValue.document)) {
        companyActions
          .exist(formatDocument("CNPJ", this.inputsValue.document))
          .then(({ data }) => {
            if (data.count > 0) {
              this.$toast.error("Esta empresa já existe!");
              this.isValid = false;
            } else {
              this.isValid = true;
            }
          });
      }
    },

    verifyExistFolderRealEstate() {
      let IdRealEstate = this.inputsValue.id;

      dropbox()
        .filesListFolder({
          path: "/realestate",
        })
        .then(({ result }) => {
          let resultSearchID = result.entries.filter(
            ({ name }) => name === IdRealEstate
          );

          if (resultSearchID.length === 0) {
            this.createFolder(IdRealEstate);
          } else {
            this.pathFolder = resultSearchID[0].path_display;
            this.$store.dispatch(GET_PATH, this.pathFolder);
          }
        });
    },

    createFolder(IdRealEstate) {
      dropbox()
        .filesCreateFolder({
          path: `/realestate/${IdRealEstate}`,
          autorename: false,
        })
        .then((res) => (this.pathFolder = res.result.path_display));
    },

    updateRealEstate() {
      let datas = {
        id: this.inputsValue.company,
        comercialname: this.inputsValue.comercialname,
        name: this.inputsValue.name,
        creci: this.inputsValue.creci,
        document: this.inputsValue.document,
        phone: this.inputsValue.phone,
      };

      companyActions
        .edit(datas)
        .then(() => {
          this.btnLoading = false;
        })
        .catch(() => {
          this.$toast.error("Ocorreu um erro e não foi possivel ");
          this.btnLoading = false;
        });

      clientAddressAction.update(this.inputsValueAddress);
      let validDadosImobiliaria = this.$refs.formRealEstateForm.validate()  
      let validLocalizaçãoImobiliaria = this.$refs.formRealEstateFormAddress.validate()
      if (validDadosImobiliaria && validLocalizaçãoImobiliaria) {
        const realestate = {
          id: Number(this.$route.params.id),
          person: this.getPerson(),

          creci: this.inputsValue.creci,
          status: 2,
          phone: this.inputsValue.phone,
        };
        clientRealEstateAction.update(realestate).then(() => {
          this.$router.push("/imobiliarias");
          this.$toast.success("Imobiliária editada com sucesso!");
        });
      } else {
        this.$toast.error("Não pode ser vazio os campos");
      }
    },

    getPerson() {
      getSessionUser().then((sessionUser) => {
        return sessionUser.data.return[0].idperson;
      });
    },

    createRealEstate() {
      companyActions
        .create(this.inputsValue)
        .then(() => {
          this.$toast.success("Imobiliária adicionada com sucesso!");
          this.btnLoading = false;
        })
        .catch(() => {
          this.$toast.error(
            "Ocorreu um erro e não foi possivel adicionar imobiliária"
          );
          this.btnLoading = false;
        });

      let objAddress = {
        id: null,
        zipcode: this.inputsValueAddress.zipcode,
        street: this.inputsValueAddress.street,
        number: this.inputsValueAddress.number,
        neighborhood: this.inputsValueAddress.neighborhood,
        city: this.inputsValueAddress.city,
      };

      clientAddressAction.add(objAddress);

      let objRealEstate = {
        id: Number(this.$route.params.id),
        person: this.getSession(),
        company: this.inputsValue.idcompany,
        creci: this.inputsValue.creci,
        status: 2,
      };

      clientRealEstateAction.add(objRealEstate);
    },

    async salvarRealEstate() {
      this.btnLoading = true;

      if (this.verifyForms() && this.$route.params.id === "novo") {
        this.createRealEstate();
      } else {
        this.updateRealEstate();
      }
    },

    verifyForms() {
      if (
        this.$refs.formRealEstateForm.validate() &&
        this.$refs.formRealEstateFormAddress.validate()
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
