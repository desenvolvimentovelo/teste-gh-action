<template>
  <v-app style="background-color: #ececec">
    <div class="d-flex h-100">
      <div class="h-100 bg-sidebar">
        <div
          class="d-flex justify-center align-center"
          style="width: 80px; height: 57px"
        >
          <img
            src="../../assets/images/velo-justlogo-negative.svg"
            width="45px"
            style="z-index: 2"
          />
        </div>
      </div>

      <div class="w-100">
        <header class="align-self-center">
          <v-card
            elevation="0"
            width="auto"
            style="border-radius: 0px"
            class="mb-3 py-1 mx-auto text-center"
          >
            <img
              width="120px"
              class="mx-auto align-self-center"
              src="@/assets/images/velo-written.svg"
            />
          </v-card>
        </header>

        <v-card
          outlined
          elevation="0"
          width="auto"
          style="border-radius: 10px; min-height: 90vh; overflow: hidden"
          class="d-flex mx-3"
        >
          <v-card-text>
            <v-row>
              <v-col
                cols="6"
                sm="2"
                md="5"
                xs="12"
                class="d-flex flex-column pt-12"
              >
                <h2 style="color: #7d7d7d" class="mb-3">Dados do Executivo</h2>

                <v-form
                  ref="formRealEstateForm"
                  v-model="valid"
                  lazy-validation
                >
                  <h6
                    style="color: #7d7d7d"
                    class="input-label title3 font-weight-bold"
                  >
                    CPF
                  </h6>
                  <v-text-field
                    dense
                    placeholder="CPF"
                    outlined
                    required
                    ref="inputDocument"
                    :rules="rules.documentRules"
                    v-mask="['###.###.###-##']"
                    v-model="form.document"
                  ></v-text-field>

                  <h6
                    style="color: #7d7d7d"
                    class="input-label title3 font-weight-bold"
                  >
                    Nome
                  </h6>
                  <v-text-field
                    dense
                    placeholder="Descrição"
                    outlined
                    required
                    v-model="form.name"
                  ></v-text-field>

                  <h6
                    style="color: #7d7d7d"
                    class="input-label title3 font-weight-bold"
                  >
                    Email
                  </h6>
                  <v-text-field
                    dense
                    placeholder="Email"
                    outlined
                    required
                    v-model="form.email"
                    :rules="rules.email"
                    @blur="validemail"
                  ></v-text-field>

                  <div>
                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      Nascimento
                    </h6>
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          persistent-hint
                          placeholder="Data de nascimento"
                          dense
                          outlined
                          :rules="rules.birth"
                          v-mask="['XX/XX/XXXX']"
                          autocomplete="chrome-off"
                        >
                          <v-icon
                            v-bind="attrs"
                            v-on="on"
                            slot="append"
                            color="green"
                          >
                            mdi-calendar
                          </v-icon>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.birth"
                        locale="pt-BR"
                        no-title
                        @input="closeDatePicker($event)"
                        color="primary"
                      ></v-date-picker>
                    </v-menu>
                  </div>

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
                    v-model="form.phone"
                  ></v-text-field>

                  <v-btn
                    :loading="loading"
                    @click="nextPage"
                    block
                    color="primary"
                    class="mt-2"
                    rounded
                    large
                  >
                    <span
                      class="text-capitalize font-weight-regular white--text"
                    >
                      Registrar
                    </span>
                  </v-btn>
                </v-form>
              </v-col>

              <v-col cols="6" sm="2" md="7" class="d-flex justify-center my-2">
                <img
                  src="@/assets/images/undraw_career_progress_ivdb.svg"
                  width="650"
                  height="600"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<script>
import { VIEW_PAGE } from "@/core/store/velo-imobiliaria/register.module.js";
import { cpf } from "cpf-cnpj-validator";
import { personActions } from "@/core/service/core.service.js";
import dayjs from "dayjs";

export default {
  data() {
    return {
      loading: false,
      valid: false,
      menu1: false,
      date: "",
      dateFormatted: "",
      itemsBreadcrumb: [
        {
          text: "Cadastro Executivo de vendas",
          disabled: true,
          to: "",
        },
      ],
      form: {
        name: "",
        document: "",
        email: "",
        password: "",
        phone: "",
        birth: "",
      },
      rules: {
        documentRules: [
          (v) => !!v || "Por favor campo CPF não pode ser vazio",
          (v) => (!!v && cpf.isValid(v)) || "O CPF é invalido",
        ],
        email: [
          (v) => !!v || "O campo de email não pode ser vazio",
          (v) => /.+@.+\..+/.test(v) || "Email inválido",
        ],
      },
    };
  },
  methods: {
    async validemail(email) {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.form.email
        )
      ) {
        personActions.emailExist(this.form.email).then(({ data }) => {
          if (data.return.exist) {
            this.$toast.error(
              " Email já cadastrado informe outro para cadastro!"
            );
            this.isValidCpfEmail = true;
          } else {
            this.isValidCpfEmail = false;
          }
        });
      }
    },

    validBirth(value) {
      const [day, month, year] = value.split("/");
      const minYear = dayjs().subtract(18, "year");

      if (!value) {
        return "A data de nascimento não pode ser vazio";
      } else if (Number(year) >= minYear.$y) {
        return "Data de nascimento inválido";
      } else {
        return true;
      }
    },

    closeDatePicker(v) {
      this.form.birth = v;
      this.date = dayjs(v).format("DD/MM/YYYY");
      this.menu1 = false;
    },

    nextPage() {
      this.$store.dispatch(VIEW_PAGE, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-sidebar {
  background-image: url("../../assets/images/background-aside.svg");
  z-index: 1;
  position: relative;

  &::before {
    content: "";

    position: absolute;
    top: 0;

    width: 100%;
    height: 100%;

    z-index: 1;

    background: linear-gradient(
      164deg,
      rgba(8, 185, 20, 0.4066001400560224) 0%,
      rgba(3, 119, 6, 0.4066001400560224) 100%
    );
  }
}
</style>

<style>
.v-text-field__details {
  margin-bottom: 0 !important;
}
</style>
