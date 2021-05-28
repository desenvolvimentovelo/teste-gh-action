<template>
  <div class="d-flex">
    <v-col class="px-3 d-flex justify-xl-end justify-center py-0 pr-xl-16">
      <v-form
        class="ml-auto"
        style="width: 480px"
        lazy-validation
        ref="formAddItems"
        v-model="valid"
      >
        <div class="grey--text text--darken-2 font-weight-regular mb-xl-8 mb-3">
          <h2 style="color: #7d7d7d">Registro de Usuário</h2>
        </div>

        <h6 style="color: #7d7d7d" class="input-label title3 font-weight-bold">
          Nome Completo
        </h6>
        <v-text-field
          dense
          placeholder="Nome Completo"
          outlined
          required
          :rules="rules.nameRules"
          v-model="form.name"
        ></v-text-field>

        <h6 style="color: #7d7d7d" class="input-label title3 font-weight-bold">
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

        <div>
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
            :rules="rules.emailRules"
            v-model="form.email"
            @blur="validemail"
          ></v-text-field>
        </div>

        <div class="d-flex">
          <v-col class="pr-2 pa-0">
            <h6
              style="color: #7d7d7d"
              class="input-label title3 font-weight-bold"
            >
              Data de Nascimento
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
                  <v-icon v-bind="attrs" v-on="on" slot="append" color="green">
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
          </v-col>

          <v-col class="pl-2 pa-0">
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
          </v-col>
        </div>

        <div class="d-flex">
          <v-col class="pr-2 pa-0">
            <h6
              style="color: #7d7d7d"
              class="input-label title3 font-weight-bold"
            >
              Senha
            </h6>
            <v-text-field
              dense
              placeholder="Senha"
              outlined
              required
              :rules="rules.passwordRules"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              v-model="form.password"
              hint="A senha precisa ter no minimo 6 caracteres"
              persistent-hint
            ></v-text-field>
          </v-col>

          <v-col class="pl-2 pa-0">
            <h6
              style="color: #7d7d7d"
              class="input-label title3 font-weight-bold"
            >
              Confirmar senha
            </h6>
            <v-text-field
              dense
              placeholder="Confirmar senha"
              hint="A senha precisa ter no minimo 6 caracteres"
              outlined
              required
              :rules="rules.passwordConfirmRules"
              :type="show2 ? 'text' : 'password'"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              v-model="form.confirmpassword"
              persistent-hint
            ></v-text-field>
          </v-col>
        </div>

        <div
          style="align-items: center; justify-content: center; display: flex"
        >
          <v-btn
            class="pa-3 w-xs-100 mt-3"
            block
            large
            rounded
            color="primary"
            @click="handleSubmit"
            :loading="loadingUser"
            id="load"
          >
            <span class="text-none px-10">Registrar</span>
          </v-btn>
        </div>
      </v-form>
    </v-col>

    <v-col
      class="
        d-none d-sm-flex
        justify-xl-start
        align-center
        justify-center
        py-0
        pl-xl-16
      "
    >
      <img
        src="@/assets/images/register-user-admin.svg"
        alt="gestor"
        width="500px"
        class="mr-auto"
      />
    </v-col>
  </div>
</template>

<script>
import { cpf } from "cpf-cnpj-validator";
import {
  createUser,
  createColaborador,
  firstAccess,
} from "@/core/service/realestate/registerGestor.service.js";
import { formatDocument, unformatPhone } from "@/utils/utils.js";
import { personActions } from "@/core/service/core.service.js";
import dayjs from "dayjs";
import { GET_VIEW_CARD } from "@/core/store/velo-imobiliaria/registerGestor.module.js";
import { sendMail } from "@/core/service/realestate/registerGestor.service.js";

export default {
  data() {
    return {
      date: "",
      dateFormatted: "",
      loadingUser: false,
      isValidCpfEmail: false,
      valid: false,
      menu1: false,
      form: {
        name: "",
        document: "",
        email: "",
        password: "",
        confirmpassword: "",
        phone: "",
        birt: "",
      },
      rules: {
        passwordRules: [
          (v) => !!v || "Por favor preencha com uma senha",
          (v) =>
            (!!v && v.length >= 6) || "A senha deve ter no mínimo 6 caracteres",
        ],
        passwordConfirmRules: [
          (v) => !!v || "Por favor confirme senha",
          (v) => !!v && this.passwordIsEqual(v),
        ],

        birth: [(v) => this.validBirth(v)],
        documentRules: [
          (v) => !!v || "Por favor campo documento não pode ser vazio",
          (v) => (!!v && cpf.isValid(v)) || "O documento é invalido",
        ],
        docRules: [(v) => !!v || "O campo de documento não pode ser vazio"],
        nameRules: [(v) => !!v || "O campo de nome não pode ser vazio"],
        emailRules: [
          (v) => !!v || "O campo de email não pode ser vazio",
          (v) =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || "E-mail não é válido",
        ],
        phoneRules: [
          (v) => !!v || "O número de telefone não pode ser vazio",
          (v) =>
            /^\([1-9]{2}\) (?:9[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            /^\([1-9]{2}\) (?:[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            "Número de telefone inválido",
        ],
      },
      show1: false,
      show2: false,
      password: "Password",
    };
  },

  methods: {
    passwordIsEqual(value) {
      const { password, confirmpassword } = this.form;

      if (value !== password || value !== confirmpassword) {
        return "As senhas não correspondem";
      } else {
        return true;
      }
    },

    validBirth(value) {
      const [day, month, year] = value.split("/");
      const currentDate = dayjs();
      const minYear = currentDate.subtract(18, "year");

      if (!value) {
        return "A data de nascimento não pode ser vazio";
      } else if (Number(year) >= currentDate.$y) {
        return "Data de nascimento inválido";
      } else if (Number(year) >= minYear.$y) {
        return "Você precisa ser maior de 18 anos";
      } else {
        return true;
      }
    },
    closeDatePicker(v) {
      this.form.birth = v;
      this.date = dayjs(v).format("DD/MM/YYYY");
      this.menu1 = false;
    },
    async validemail() {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.form.email
        )
      ) {
        personActions.emailExist(this.form.email).then(({ data }) => {
          if (data.return.exist) {
            this.$toast.error(
              "Email já cadastrado informe outro para cadastro!"
            );
            this.isValidCpfEmail = true;
          } else {
            this.isValidCpfEmail = false;
          }
        });
      }
    },
    async handleSubmit() {
      this.loadingUser = true;
      if (this.$refs.formAddItems.validate() && !this.isValidCpfEmail) {
        let dados = this.form;
        let phone = unformatPhone(dados.phone);
        let cpfFormat = formatDocument("CPF", dados.document);
        personActions
          .create(
            JSON.stringify({
              ...dados,
              phone,
              document: cpfFormat,
            })
          )
          .then((res) => {
            createUser(
              JSON.stringify({
                name: dados.name,
                document: cpfFormat,
                email: dados.email,
                password: dados.password,
                phone,
                profile: 4,
              })
            ).then(({ data }) => {
              createColaborador(
                JSON.stringify({
                  person: res.data.return[0].id,
                  user: data.return[0].id,
                  type: 1,
                })
              ).then(() => {
                firstAccess(
                  JSON.stringify({
                    email: dados.email,
                    password: dados.password,
                  })
                ).then((firstacess) => {
                  if (firstacess.data.return[0].session) {
                    sendMail(data.return[0].id).then(() => {
                      this.$store.dispatch(GET_VIEW_CARD, {
                        idPerson: data.return[0].id,
                        email: dados.email,
                        viewNumberCard: 2,
                      });
                    });

                    this.loadingUser = false;
                  }
                });
              });
            });
          });
      } else {
        if (this.$refs.formAddItems.validate()) {
          this.$toast.error(" Usuário já cadastrado ");
        }
        this.loadingUser = false;
      }
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
