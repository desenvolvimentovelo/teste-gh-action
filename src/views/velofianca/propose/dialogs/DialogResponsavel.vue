<template>
  <v-dialog persistent v-model="dialogData" max-width="1000">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        rounded
        class="text-capitalize"
        v-bind="attrs"
        v-on="on"
        outlined
        medium
        @click="listTypeResponsible"
      >
        <span class="text-center px-3" v-if="isEditModal">
          Editar
          <i class="las la-pen"></i>
        </span>

        <span class="text-center px-3" v-else>
          Adicionar
          <i class="las la-plus"></i>
        </span>
      </v-btn>
    </template>

    <v-card class="pa-6 pb-0">
      <v-card-title class="py-0 pb-1">
        <h3 v-if="isEditModal">Editar Locatário</h3>
        <h3 v-else>Novo Locatário</h3>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col>
            <v-form ref="formCreateResponsible" v-model="valid" lazy-validation>
              <h6
                style="color: #7d7d7d"
                class="input-label title3 font-weight-bold"
              >
                CPF/CNPJ
              </h6>
              <v-text-field
                :disabled="isEditModal"
                dense
                v-model="inputsValue.document"
                v-mask="['###.###.###-##', '##.###.###/####-##']"
                placeholder="CPF/CNPJ"
                outlined
                :rules="rules.docRules"
                required
                @blur="isCNPJ ? existCompany() : existPerson()"
                ref="inputDocument"
              ></v-text-field>

              <div>
                <h6
                  style="color: #7d7d7d"
                  class="input-label title3 font-weight-bold"
                >
                  Tipo
                </h6>
                <v-select
                  dense
                  v-model="inputsValue.type"
                  :items="isCNPJ ? ['Empresa'] : itensTypeResponsible"
                  placeholder="Tipo do responsável"
                  outlined
                  :rules="rules.typeRules"
                  required
                  :value="isCNPJ ? 'Empresa' : ''"
                ></v-select>

                <h6
                  style="color: #7d7d7d"
                  class="input-label title3 font-weight-bold"
                >
                  <span v-if="isCNPJ">Razão Social</span>
                  <span v-else>Nome</span>
                </h6>
                <v-text-field
                  dense
                  v-model="inputsValue.name"
                  :placeholder="isCNPJ ? 'Razão Social' : 'Nome'"
                  outlined
                  :rules="rules.nameRules"
                  required
                ></v-text-field>

                <div>
                  <h6
                    style="color: #7d7d7d"
                    class="input-label title3 font-weight-bold"
                  >
                    Telefone
                  </h6>
                  <v-text-field
                    dense
                    v-model="inputsValue.phone"
                    placeholder="Telefone"
                    v-mask="['(##) #####-####', '(##) ####-####']"
                    outlined
                    :rules="isCNPJ ? rules.phoneCompanyRules : rules.phoneRules"
                    required
                    ref="inputTelephone"
                    autocomplete="chrome-off"
                  >
                  </v-text-field>
                </div>

                <div v-if="!isCNPJ">
                  <h6
                    style="color: #7d7d7d"
                    class="input-label title3 font-weight-bold"
                  >
                    Email
                  </h6>
                  <v-text-field
                    dense
                    v-model="inputsValue.email"
                    placeholder="Email"
                    outlined
                    :rules="rules.emailRules"
                    required
                    autocomplete="chrome-off"
                  ></v-text-field>
                </div>

                <h6
                  style="color: #7d7d7d"
                  class="input-label title3 font-weight-bold"
                >
                  <span v-if="isCNPJ">Faturamento Estimado</span>
                  <span v-else>Renda Estimada</span>
                </h6>
                <v-text-field
                  dense
                  outlined
                  v-money="money"
                  :rules="rules.salaryRules"
                  v-model="inputsValue.rental"
                  required
                  ref="salary"
                ></v-text-field>
              </div>
            </v-form>
          </v-col>

          <v-col class="custom-display d-flex flex-column">
            <v-row class="style-row">
              <img
                src="@/assets/images/modal-people-background-total.svg"
                style="width: 90%"
              />
            </v-row>
            <v-row class="buttons-end" justify="end">
              <v-card-actions style="z-index: 2" id="style-card">
                <v-btn
                  rounded
                  large
                  outlined
                  color="error"
                  :disabled="btnLoading"
                  @click="isEditModal ? closeDialog(false) : closeDialog(true)"
                >
                  <span class="px-3 text-capitalize font-weight-regular">
                    Cancelar
                  </span>
                </v-btn>

                <v-btn
                  color="primary"
                  rounded
                  large
                  class="ml-3"
                  @click="isCNPJ ? editCompany() : editPerson()"
                  :loading="btnLoading"
                  v-if="isEditModal"
                >
                  <span
                    class="px-6 text-capitalize font-weight-regular white--text"
                  >
                    Salvar
                  </span>
                </v-btn>

                <v-btn
                  color="primary"
                  rounded
                  large
                  class="ml-3"
                  @click="createResponsible"
                  :loading="btnLoading"
                  v-else
                >
                  <span
                    class="px-6 text-capitalize font-weight-regular white--text"
                  >
                    Salvar
                  </span>
                </v-btn>
              </v-card-actions>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  ADD_PERSONS,
  GET_VERIFY_EXIST_RESPONSIBLE,
} from "@/core/store/velo-fianca/tenant.module";
import { addPropose } from "@/core/service/velo-fianca/tenant.service.js";
import { personActions, companyActions } from "@/core/service/core.service.js";
import { ADD_PROPOSE } from "@/core/store/velo-fianca/propose.module";
import { RESET_OBJECT_PROPOSE } from "@/core/store/core.module.js";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { cpf, cnpj } from "cpf-cnpj-validator";
import { mapGetters } from "vuex";
import {
  formatDocument,
  unformatPhone,
  formatPhone,
  unformatString,
} from "@/utils/utils.js";
import { GET_PERSONS } from "@/core/store/velo-fianca/tenant.module.js";

export default {
  props: {
    person: {
      type: Object,
      default: () => {
        return {
          rental: "R$ 0,00",
        };
      },
    },
    isEditModal: Boolean,
    index: Number || String,
  },

  data() {
    return {
      isCNPJ: false,
      dialogData: false,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      numberMask: createNumberMask({
        prefix: "$",
        allowDecimal: true,
        decimalLimit: 2,
        integerLimit: 1,
      }),
      valid: false,
      rules: {
        typeRules: [(v) => !!v || "Por favor selecione algum tipo"],
        docRules: [
          (v) => !!v || "O campo de CPF/CNPJ não pode ser vazio",
          (v) => this.validationDocument(v),
        ],
        nameRules: [(v) => !!v || "O campo de nome não pode ser vazio"],
        emailRules: [
          (v) => !!v || "O campo de email não pode ser vazio",
          (v) => /.+@.+\..+/.test(v) || "E-mail não válido",
        ],
        salaryRules: [
          (v) => v !== "R$ 0,00" || "A renda estimada não pode ser zero",
        ],
        phoneRules: [
          (v) => !!v || "O número de telefone não pode ser vazio",
          (v) =>
            /^\([1-9]{2}\) (?:9[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            /^\([1-9]{2}\) (?:[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            "Número de telefone inválido",
        ],
        phoneCompanyRules: [
          (v) => !!v || "O número de telefone não pode ser vazio",
          (v) =>
            /^\([1-9]{2}\) (?:9[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            /^\([1-9]{2}\) (?:[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            "Número de telefone inválido",
        ],
      },
      inputsValue: {
        rental: "R$ 0,00",
      },
      itensTypeResponsible: [],
      btnLoading: false,
    };
  },

  mounted() {
    this.$store.dispatch(GET_VERIFY_EXIST_RESPONSIBLE);

    if (this.person.type === "Empresa") {
      this.isCNPJ = true;
    }
  },

  computed: {
    ...mapGetters([
      "getPersons",
      "getItensTypeResponsible",
      "getAllItensTypeResponsible",
      "getPackageLocations",
      "getActualyPropose",
    ]),
  },

  methods: {
    listTypeResponsible() {
      if (this.isEditModal) {
        this.itensTypeResponsible = this.getAllItensTypeResponsible;

        this.inputsValue = this.getPersons[this.index];
      } else {
        const result = this.getPersons.filter(
          ({ type }) => type === "Responsável"
        );

        if (result.length <= 0) {
          this.itensTypeResponsible = ["Responsável"];
        } else {
          this.itensTypeResponsible = this.getItensTypeResponsible;
        }
      }
    },

    resetForm() {
      if (this.inputsValue.type !== "Empresa") {
        this.$refs.inputTelephone.$el.getElementsByTagName("input")[0].value =
          "";
      }
      this.inputsValue = {
        rental: "R$ 0,00",
      };
      this.$refs.salary.$el.getElementsByTagName("input")[0].value = "R$ 0,00";
      this.$refs.inputDocument.$el.getElementsByTagName("input")[0].value = "";
      this.$refs.formCreateResponsible.reset();
    },

    closeDialog(resetForm) {
      this.dialogData = false;

      resetForm && this.resetForm();
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

    async validations() {
      let existPeople = this.getPersons.filter(
        ({ document }) =>
          document === formatDocument("CPF", this.inputsValue.document)
      );

      let existCompany = this.getPersons.filter(
        ({ type }) => type === "Empresa"
      );

      if (existPeople.length > 0) {
        this.$toast.error("Não é possivel adicionar duas pessoas iguais!");
        this.btnLoading = false;
      } else if (
        existCompany.length > 0 &&
        this.inputsValue.type === "Empresa"
      ) {
        this.$toast.error(
          "Não é possivel adicionar duas empresas na mesma proposta!"
        );

        this.btnLoading = false;
      } else {
        if (this.inputsValue.type === "Empresa") {
          await this.isCompany();
        } else {
          await this.isPeople();
        }

        this.btnLoading = false;
        this.$store.dispatch(ADD_PERSONS, this.inputsValue);
        this.closeDialog(true);
      }
    },

    async createResponsible() {
      this.btnLoading = true;

      if (this.$refs.formCreateResponsible.validate()) {
        let sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

        if (
          sessionStorageItem === null ||
          sessionStorageItem.objectPropose === undefined ||
          sessionStorageItem.objectPropose.id === undefined
        ) {
          this.$store.dispatch(RESET_OBJECT_PROPOSE);
          await this.createPropose();
        }

        this.validations();
      } else {
        this.btnLoading = false;
      }
    },

    async createPropose() {
      const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

      let { data } = await addPropose({
        type: sessionStorageItem.objectPropose.idtype,
        status: 2,
        step: 2,
        hash: "",
      });

      sessionStorage.setItem(
        "data",
        JSON.stringify({
          ...sessionStorageItem,
          objectPropose: {
            ...sessionStorageItem.objectPropose,
            ...data.return[0],
            activator: 0,
          },
        })
      );

      this.$store.dispatch(ADD_PROPOSE, data.return[0]);
    },

    async isPeople() {
      let res = null;

      if (this.inputsValue.id) {
        res = await this.editPerson();
      } else {
        res = await this.createPerson();
      }

      let idPerson = res.data.return[0].id;

      let idProposePerson = await this.createProposePerson(idPerson);
      this.inputsValue = {
        ...res.data.return[0],
        type: this.inputsValue.type,
        idProposePerson,
      };

      this.closeDialog(false);
    },

    async createPerson() {
      const { id, name, document, rental, email, phone } = this.inputsValue;

      this.btnLoading = true;

      let response = await personActions.create({
        id,
        name,
        email,
        phone: unformatPhone(phone),
        rental: unformatString(rental, "pt-BR"),
        document: formatDocument("CPF", document),
      });

      this.btnLoading = false;

      return response;
    },

    async createProposePerson(idPerson) {
      const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));
      const idPropose = sessionStorageItem.objectPropose.id;

      if (idPropose) {
        const { data } = await personActions.createPropose(
          JSON.stringify({
            propose: idPropose,
            person: idPerson,
            type:
              this.inputsValue.type === "Responsável" ||
              this.inputsValue.type === "Empresa"
                ? 1
                : 2,
          })
        );

        return data.return[0].id;
      }
    },

    async editPerson() {
      if (this.$refs.formCreateResponsible.validate()) {
        this.btnLoading = true;

        const { id, name, document, rental, email, phone } = this.inputsValue;
        const raw = {
          id,
          name,
          email,
          phone: unformatPhone(phone),
          rental: unformatString(rental, "pt-BR"),
          document: formatDocument("CPF", document),
        };
        const IDPropose = JSON.parse(sessionStorage.getItem("data"))
          .objectPropose.id;

        const [responsePerson, responsePropose] = await Promise.all([
          personActions.edit(raw),
          personActions.getPropose(IDPropose, id),
        ]);

        if (responsePropose.data.return.length > 0) {
          await this.updateTypePerson(responsePropose.data.return[0].id);
        }

        this.updateInfosArrayPerson(id);

        this.btnLoading = false;
        this.closeDialog(false);

        return responsePerson;
      }
    },

    updateInfosArrayPerson(idPerson) {
      const cloneArray = this.getPersons;

      const index = cloneArray.findIndex(({ id }) => id === idPerson);

      if (index > -1) {
        cloneArray.splice(index, 1, this.inputsValue);
      }

      const formatArray = cloneArray.map((item) => ({
        ...item,
        rental: unformatString(item.rental),
      }));

      this.$store.dispatch(GET_PERSONS, formatArray);
    },

    async updateTypePerson(idProposePerson) {
      return await personActions.updatePropose({
        id: idProposePerson,
        type: this.inputsValue.type === "Responsável" ? 1 : 2,
      });
    },

    async existPerson() {
      const { document } = this.inputsValue;

      if (document && cpf.isValid(document)) {
        this.btnLoading = true;

        try {
          const { data } = await personActions.exist(
            formatDocument("CPF", document)
          );

          if (data.return.length > 0) {
            this.inputsValue = {
              ...data.return[0],
              phone: formatPhone(data.return[0].phone),
            };

            this.$refs.salary.$el.getElementsByTagName("input")[0].value =
              Number(data.return[0].rental).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
          }
        } catch (error) {
          console.log(error);
        }

        this.btnLoading = false;
      }
    },

    async isCompany() {
      let res = null;

      if (this.inputsValue.id) {
        res = await this.editCompany();
      } else {
        res = await this.createCompany();
      }

      let idCompany = res.data.return[0].id;
      let idProposeCompany = await this.createProposeCompany(idCompany);
      this.inputsValue = {
        ...res.data.return[0],
        type: "Empresa",
        idProposeCompany,
      };
      this.closeDialog(false);
    },

    async createCompany() {
      const { id, name, document, rental, email, phone } = this.inputsValue;

      let response = await companyActions.create({
        id,
        name,
        email,
        phone: unformatPhone(phone),
        rental: unformatString(rental, "pt-BR"),
        document: formatDocument("CNPJ", document),
      });

      return response;
    },

    async createProposeCompany(idCompany) {
      const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));
      const idPropose = sessionStorageItem.objectPropose.id;

      if (idPropose) {
        let { data } = await companyActions.createPropose(
          JSON.stringify({
            propose: idPropose,
            company: idCompany,
            type:
              this.inputsValue.type === "Responsável" ||
              this.inputsValue.type === "Empresa"
                ? 1
                : 2,
          })
        );

        return data.return[0].id;
      }
    },

    async editCompany() {
      if (this.$refs.formCreateResponsible.validate()) {
        const { id, name, document, rental, email, phone } = this.inputsValue;

        this.btnLoading = true;

        const res = await companyActions.edit({
          id,
          name,
          email,
          phone: unformatPhone(phone),
          rental: unformatString(rental, "pt-BR"),
          document: formatDocument("CNPJ", document),
        });

        this.updateInfosArrayPerson(id);

        this.btnLoading = false;
        this.closeDialog(false);

        return res;
      }
    },

    async existCompany() {
      const { document } = this.inputsValue;

      if (document && cnpj.isValid(document)) {
        this.btnLoading = true;

        try {
          const { data } = await companyActions.exist(
            formatDocument("CNPJ", document)
          );

          if (data.return.length > 0) {
            this.inputsValue = {
              ...data.return[0],
              type: "Empresa",
            };

            this.$refs.salary.$el.getElementsByTagName("input")[0].value =
              Number(data.return[0].rental).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
          }
        } catch (error) {
          console.log(error);
        }

        this.btnLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.upload-input {
  overflow: hidden !important;
}

.style-row {
  height: 64%;
}

.buttons-end {
  margin-top: 30px;
}

.row + .row {
  margin-top: 30px !important;
}

.v-text-field.v-text-field--enclosed {
  .v-text-field__details {
    margin-bottom: 0px !important;
  }
}

.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 93% !important;
}

@media screen and (max-width: 817px) {
  #style-card {
    display: contents !important;
  }

  .row {
    display: block !important;
  }
}
</style>
