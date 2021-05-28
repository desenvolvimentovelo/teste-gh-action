<template>
  <v-container class="h-100">
    <div class="d-flex justify-space-between h-100">
      <v-col class="py-0">
        <div style="width: 402px" class="mx-auto">
          <h2 style="color: #7d7d7d">Dados da Imobiliária</h2>

          <v-form
            class="my-3"
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
              placeholder="CPF/CNPJ"
              outlined
              required
              v-mask="['###.###.###-##', '##.###.###/####-##']"
              :rules="rules.document"
              v-model="inputsValue.document"
              @blur="verifyExistCompany"
              :loading="loading"
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
              :rules="rules.nomeFantasia"
              v-model="inputsValue.nomeFantasia"
              :loading="loading"
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
              :rules="rules.razaoSocial"
              v-model="inputsValue.razaoSocial"
              :loading="loading"
            ></v-text-field>

            <div class="d-flex">
              <v-col class="pr-2 pa-0">
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
                  v-mask="['(##) #####-####', '(##) ####-####']"
                  :rules="rules.phone"
                  v-model="inputsValue.phone"
                  :loading="loading"
                ></v-text-field>
              </v-col>

              <v-col class="pl-2 pa-0">
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
                  :loading="loading"
                ></v-text-field>
              </v-col>
            </div>

            <h6
              style="color: #7d7d7d"
              class="input-label title3 font-weight-bold"
            >
              Executivo Velo
            </h6>
            <v-select
              placeholder="Selecione um executivo velo"
              outlined
              dense
              :items="listExecutives"
              item-value="id"
              item-text="name"
              v-model="typeDefault"
              :rules="rules.executive"
            ></v-select>
          </v-form>

          <v-btn
            @click="nextPage"
            block
            color="primary"
            rounded
            large
            :loading="loading"
          >
            <span class="px-6 text-capitalize font-weight-regular white--text">
              Próximo
            </span>
          </v-btn>
        </div>
      </v-col>

      <v-col class="d-none d-sm-flex align-center justify-center py-0">
        <img
          :src="require('@/assets/images/register-realestate.svg')"
          alt="Vetor Imobiliária"
          class="px-8 vector-imobiliria"
          style="width: 450px"
        />
      </v-col>
    </div>
  </v-container>
</template>

<script>
import { cpf, cnpj } from "cpf-cnpj-validator";
import {
  VIEW_PAGE,
  GET_REALESTATE,
} from "@/core/store/velo-imobiliaria/register.module.js";
import { formatDocument } from "@/utils/utils.js";
import { mapGetters } from "vuex";
import { companyActions, getExecutives } from "@/core/service/core.service.js";

export default {
  data() {
    return {
      isCNPJ: false,
      valid: true,
      loading: false,
      listExecutives: [],
      typeDefault: null,
      isValid: true,
      inputsValue:
        sessionStorage.getItem("realestate") === null
          ? {
              nomeFantasia: "",
              razaoSocial: "",
              document: "",
              creci: "",
              phone: "",
            }
          : JSON.parse(sessionStorage.getItem("realestate")),
      rules: {
        nomeFantasia: [(v) => !!v || "Nome fantasia não pode ser vazio"],
        razaoSocial: [(v) => !!v || "Razão social não pode ser vazio"],
        executive: [(v) => !!v || "Você precisa selecionar algum executivo"],
        document: [
          (v) => !!v || "O CPF/CNPJ não pode ser vazio",
          (v) => this.validationDocument(v) || "O CPF/CNPJ é inválido",
        ],
        phone: [
          (v) => !!v || "O número de telefone não pode ser vazio",
          (v) =>
            /^\([1-9]{2}\) (?:9[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            /^\([1-9]{2}\) (?:[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            "Número de telefone inválido",
        ],
        creci: [(v) => !!v || "O campo de CRECI não pode ser vazio"],
      },
    };
  },
  mounted() {
    getExecutives().then((response) => {
      this.listExecutives = response.data.return;
    });
  },
  computed: {
    ...mapGetters(["getRedirect"]),
  },
  methods: {
    async nextPage() {
      if (this.$refs.formRealEstateForm.validate() && this.isValid) {
        const { nomeFantasia, razaoSocial, creci, document, ...rest } =
          this.inputsValue;

        this.$store.dispatch(GET_REALESTATE, {
          name: razaoSocial,
          comercialname: nomeFantasia,
          document: formatDocument("CNPJ", document),
          creci,
          ...rest,
        });

        sessionStorage.setItem("realestate", JSON.stringify(this.inputsValue));

        this.$store.dispatch(VIEW_PAGE, 2);
      } else {
        if (!this.isValid) {
          this.$toast.error("Este CNPJ já existe!");
        }
      }
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
        this.loading = true;

        companyActions
          .exist(formatDocument("CNPJ", this.inputsValue.document))
          .then(({ data }) => {
            if (data.count > 0) {
              this.$toast.error("Esta empresa já existe!");

              this.isValid = false;
            } else {
              this.isValid = true;
            }

            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped>
.vector-imobiliria {
  width: 100%;
}

@media (min-width: 1264px) {
  .vector-imobiliria {
    width: 650px;
  }
}
</style>
