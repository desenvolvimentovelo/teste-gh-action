<template>
  <v-app>
    <div
      class="pb-3"
      style="
        background-color: #ececec;
        overflow: hidden !important;
        height: 100vh;
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
        style="border-radius: 10px; overflow: hidden; height: calc(100% - 29px)"
        class="mx-3"
      >
        <loader />

        <v-container
          class="py-5 h-100 d-flex align-center justify-center flex-column"
        >
          <header class="w-100 mx-auto d-flex mb-5">
            <v-col cols="9" class="d-flex pa-0">
              <div class="d-flex align-center mr-8">
                <router-link
                  :to="`/imobiliaria/${$route.params.idRealEstate}/colaborador`"
                >
                  <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
                </router-link>
              </div>

              <div class="mr-5">
                <img
                  :src="avatar"
                  alt="Avatar"
                  class="rounded-circle"
                  style="width: 112px; height: 112px"
                />
              </div>

              <div class="text-light">
                <h2 class="font-weight-bold">{{ person.name || "-" }}</h2>

                <h4 class="font-weight-medium" style="line-height: 1.4">
                  {{ person.document || "-" }}
                </h4>

                <h4 class="font-weight-medium" style="line-height: 1.4">
                  {{ user.creci || "-" }}
                </h4>
              </div>
            </v-col>

            <v-col cols="3" class="d-flex align-center justify-end pa-0">
              <v-btn
                @click="handleSubmit"
                color="primary"
                rounded
                class="text-capitalize"
                medium
                :loading="loading"
              >
                <span class="text-center px-6">
                  {{ pageViewDetails ? "Criar" : "Salvar" }}
                </span>
              </v-btn>

              <v-menu
                v-if="user.position.item.id != 1"
                offset-y
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-if="!pageViewDetails"
                    class="ml-3"
                    dark
                    icon
                    style="color: #adadad"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list dense max-height="90" min-width="50" style="padding: 0">
                  <v-list-item
                    v-for="(item, i) in itemsVList"
                    :key="i"
                    @click="verifyAction(item.title)"
                  >
                    <v-list-item-icon class="mr-1">
                      <v-icon color="black" small> mdi-delete </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title
                        class="black--text text-capitalize font-weight-bold"
                      >
                        Desativar
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </header>

          <v-form class="w-100" ref="formInfos" v-model="valid" lazy-validation>
            <div class="w-100 mx-auto d-flex">
              <v-col class="pa-0">
                <div>
                  <h4 class="mb-2">Dados pessoais</h4>

                  <div>
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
                      v-mask="['XXX.XXX.XXX-XX']"
                      v-model="person.document"
                      :rules="rules.document"
                      :disabled="!this.pageViewDetails"
                    ></v-text-field>
                  </div>

                  <div>
                    <h6
                      style="color: #7d7d7d"
                      class="input-label title3 font-weight-bold"
                    >
                      Nome
                    </h6>
                    <v-text-field
                      dense
                      placeholder="Nome"
                      outlined
                      required
                      v-model="person.name"
                      :rules="rules.name"
                      @change="handleInputName"
                    ></v-text-field>
                  </div>

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
                          </v-icon></v-text-field
                        >
                      </template>
                      <v-date-picker
                        v-model="person.birth"
                        locale="pt-BR"
                        no-title
                        @input="closeDatePicker($event)"
                        color="primary"
                      ></v-date-picker>
                    </v-menu>
                  </div>

                  <div>
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
                      v-model="person.phone"
                      :rules="rules.phone"
                      v-mask="['(##) #####-####', '(##) ####-####']"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>

              <v-col class="px-10 py-0">
                <h4 class="mb-2">Dados do usuario</h4>

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
                    :rules="rules.email"
                    v-model="user.email"
                    @blur="validemail"
                  ></v-text-field>
                </div>

                <div v-if="pageViewDetails">
                  <h6
                    style="color: #7d7d7d"
                    class="input-label title3 font-weight-bold"
                  >
                    Senha
                  </h6>
                  <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    placeholder="Senha"
                    class="input-group--focused"
                    @click:append="show3 = !show3"
                    :rules="rules.password"
                    dense
                    outlined
                    v-model="user.password"
                    persistent-hint
                    hint="A senha precisa ter no minimo 6 caracteres"
                  ></v-text-field>
                </div>

                <div>
                  <h6
                    style="color: #7d7d7d"
                    class="input-label title3 font-weight-bold"
                  >
                    Perfil de usuário
                  </h6>
                  <v-select
                    :items="positionCompany"
                    item-text="name"
                    item-value="item"
                    outlined
                    dense
                    placeholder="Perfis de usuário"
                    :rules="rules.position"
                    v-model="user.position"
                  ></v-select>
                </div>

                <div>
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
                    v-model="user.creci"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col class="d-flex justify-center align-end pa-0">
                <img
                  src="@/assets/images/colaborator-details-right.svg"
                  alt="Vetor"
                  width="100%"
                  style="max-width: 320px"
                />
              </v-col>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { cpf } from "cpf-cnpj-validator";
import dayjs from "dayjs";
import { getPositionCompany } from "@/core/service/realestate/detailsCollaborator.service.js";
import { personActions } from "@/core/service/core.service.js";
import { GET_LOADING } from "@/core/store/core.module.js";
import {
  createUser,
  createColaborador,
} from "@/core/service/realestate/registerGestor.service.js";
import {
  formatDocument,
  unformatPhone,
  formatPhone,
  getAvatarDefault,
} from "@/utils/utils.js";
import {
  getColaborador,
  getUser,
  updateUser,
  updateColaborador,
  deleteColaborador,
  deleteUser,
} from "@/core/service/realestate/detailsCollaborator.service.js";
import Loader from "../components/widgets/Loader.vue";

export default {
  data() {
    return {
      avatar: getAvatarDefault(),
      loading: false,
      date: "",
      dateFormatted: "",
      menu1: false,
      valid: true,
      show3: false,
      hover: false,
      positionCompany: [],
      pageViewDetails: "",
      itemsVList: [{ title: "Desativar", icon: "mdi-delete" }],
      person: {
        name: "",
        document: "",
        birth: "",
        phone: "",
      },
      user: {
        email: "",
        password: "",
        position: {
          name: null,
          item: {
            id: null
          }
        },
        creci: "",
      },
      rules: {
        name: [(v) => !!v || "O campo de nome não pode ser vazio"],
        password: [
          (v) => !!v || "Por favor preencha com uma senha",
          (v) =>
            (!!v && v.length >= 6) || "A senha deve ter no mínimo 6 caracteres",
        ],
        position: [(v) => !!v || "Você precisa escolher algum cargo"],
        creci: [(v) => !!v || "O campo de CRECI não pode ser vazio"],
        document: [
          (v) => (!!v && cpf.isValid(v)) || "O campo de CPF não pode ser vazio",
        ],
        email: [
          (v) => !!v || "O campo de email não pode ser vazio",
          (v) => /.+@.+\..+/.test(v) || "Email inválido",
        ],
        birth: [(v) => this.validBirth(v)],
        phone: [
          (v) => !!v || "O número de telefone não pode ser vazio",
          (v) =>
            /^\([1-9]{2}\) (?:9[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            /^\([1-9]{2}\) (?:[0-9])[0-9]{3}-[0-9]{4}$/.test(v) ||
            "Número de telefone inválido",
        ],
      },
      itemsBreadcrumb: [
        {
          text: "Colaboradores",
          disabled: false,
          to: `/imobiliaria/${this.$route.params.idRealEstate}/colaborador`,
        },
      ],
    };
  },

  components: {
    Loader,
  },

  mounted() {
    this.pageViewDetails = isNaN(this.$route.params.id);
    this.$store.dispatch(GET_LOADING, true);

    getPositionCompany().then(({ data }) => {
      this.positionCompany = data.return.map(({ name, ...item }) => ({
        name,
        item,
      }));
    });

    if (this.pageViewDetails) {
      this.itemsBreadcrumb.push({
        text: "Adicionar Colaborador",
        disabled: true,
        to: "/",
      });

      this.$store.dispatch(GET_LOADING, false);
    } else {
      this.itemsBreadcrumb.push({
        text: "Detalhes do Colaborador",
        disabled: true,
        to: "/",
      });

      getColaborador(this.$route.params.id)
        .then((colaborador) => {
          if (colaborador.data.result) {
            personActions
              .getId(colaborador.data.return[0].person)
              .then((person) => {
                this.person = {
                  ...this.person,
                  ...person.data.return[0],
                  idColaborador: colaborador.data.return[0].id,
                  phone: formatPhone(person.data.return[0].phone),
                };

                this.date = dayjs(person.data.return[0].birth).format(
                  "DD/MM/YYYY"
                );

                getUser(colaborador.data.return[0].user)
                  .then((user) => {
                    const position = this.positionCompany.filter(
                      ({ item }) =>
                        Number(item.id) ===
                        Number(colaborador.data.return[0].type)
                    );

                    this.user = {
                      ...user.data.return[0],
                      email: person.data.return[0].email,
                      position: position[0],
                      creci: !colaborador.data.return[0].creci
                        ? ""
                        : colaborador.data.return[0].creci,
                    };

                    this.handleInputName();

                    this.$store.dispatch(GET_LOADING, false);
                  })
                  .catch(() => {
                    this.$router.push(
                      `/imobiliaria/${this.$route.params.idRealEstate}/colaborador`
                    );
                    this.$toast.error(
                      "Ocorreu um erro e não foi possivel ver os detalhes"
                    );
                  });
              })
              .catch(() => {
                this.$router.push(
                  `/imobiliaria/${this.$route.params.idRealEstate}/colaborador`
                );
                this.$toast.error(
                  "Ocorreu um erro e não foi possivel ver os detalhes"
                );
              });
          }
        })
        .catch(() => {
          this.$router.push(
            `/imobiliaria/${this.$route.params.idRealEstate}/colaborador`
          );
          this.$toast.error(
            "Ocorreu um erro e não foi possivel ver os detalhes"
          );
        });
    }
  },

  methods: {
    getAvatarDefault,

    handleInputName() {
      this.avatar = getAvatarDefault(this.person.name);
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

    verifyAction(type) {
      switch (type) {
        case "Desativar":
          this.flowDesactiveUser();
          break;

        default:
          throw new TypeError(
            `A action ${type} não existe como uma opção no switch!`,
            "DetailsCollaborator.vue"
          );
      }
    },

    flowDesactiveUser() {
      Promise.all([
        deleteColaborador(this.person.idColaborador),
        deleteUser(this.user.id),
      ])
        .then((responses) => {
          const [colaborator, user] = responses.filter(
            ({ data }) => data.result
          );

          if (colaborator && user) {
            this.$router.push(
              `/imobiliaria/${this.$route.params.idRealEstate}/colaborador`
            );

            this.$toast.success("Colaborador desativado com sucesso!");
          } else {
            this.$toast.error(
              "Ocorreu um erro e não foi possivel desativar o colaborador!"
            );
          }
        })
        .catch(() => {
          this.$toast.error(
            "Ocorreu um erro e não foi possivel desativar o colaborador!"
          );
        });
    },

    async validemail() {
      const { email } = this.user;

      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        personActions.emailExist(email).then(({ data }) => {
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

    prepareData(type, pageIsEdit = false) {
      const typeFormatted = type.toUpperCase();

      if (typeFormatted === "PERSON" && !pageIsEdit) {
        const [day, month, year] = this.date.split("/");
        const { document, name, phone } = this.person;
        const { email } = this.user;

        return JSON.stringify({
          document: formatDocument("CPF", document),
          birth: `${year}-${month}-${day}`,
          phone: unformatPhone(phone),
          name,
          email,
        });
      } else if (typeFormatted === "USER" && !pageIsEdit) {
        const { name, phone } = this.person;
        const { password, email, position } = this.user;

        return JSON.stringify({
          phone: unformatPhone(phone),
          name,
          email,
          password,
          profile: position.idprofile,
        });
      } else if (typeFormatted === "PERSON" && pageIsEdit) {
        const [day, month, year] = this.date.split("/");
        const { id, document, name, phone } = this.person;
        const { email } = this.user;

        return JSON.stringify({
          id,
          document: formatDocument("CPF", document),
          birth: `${year}-${month}-${day}`,
          phone: unformatPhone(phone),
          name,
          email,
        });
      } else if (typeFormatted === "USER" && pageIsEdit) {
        const { name, phone } = this.person;
        const { id, email, position } = this.user;

        return JSON.stringify({
          id,
          phone: unformatPhone(phone),
          name,
          email,
          type: position.idprofile,
        });
      }
    },

    closeDatePicker(v) {
      this.person.birth = v;
      this.date = dayjs(v).format("DD/MM/YYYY");
      this.menu1 = false;
    },

    handleSubmit() {
      if (this.$refs.formInfos.validate()) {
        this.pageViewDetails ? this.createInfos() : this.updateInfos();
      }
    },

    updateInfos() {
      this.loading = true;

      Promise.all([
        personActions.edit(this.prepareData("person", true)),
        updateUser(this.prepareData("user", true)),
        updateColaborador(
          JSON.stringify({
            id: this.person.idColaborador,
            type: this.user.position.id,
            creci: this.user.creci,
          })
        ),
      ]).then(() => {
        this.loading = false;
        this.$toast.success("Colaborador atualizado com sucesso");
        this.$router.push(
          `/imobiliaria/${this.$route.params.idRealEstate}/colaborador`
        );
      });
    },

    createInfos() {
      this.loading = true;

      Promise.all([
        personActions.create(this.prepareData("person")),
        createUser(this.prepareData("user")),
      ])
        .then((allResponses) => {
          const res = allResponses.filter(({ data }) => data.result);

          if (res.length === allResponses.length) {
            const [person, user] = res;

            createColaborador(
              JSON.stringify({
                person: person.data.return[0].id,
                user: user.data.return[0].id,
                type: this.user.position.id,
                creci: this.user.creci,
                realestate: this.$route.params.idRealEstate,
              })
            )
              .then(({ data }) => {
                if (data.result) {
                  this.loading = false;
                  this.$toast.success("Colaborador registrado com sucesso");
                  this.$router.push(
                    `/imobiliaria/${this.$route.params.idRealEstate}/colaborador`
                  );
                } else {
                  this.loading = false;

                  this.$toast.error(
                    "Ocorreu um erro e não foi possivel cadastrar o colaborador!"
                  );
                }
              })
              .catch(() => {
                this.loading = false;

                this.$toast.error(
                  "Ocorreu um erro e não foi possivel cadastrar o colaborador!"
                );
              });
          }
        })
        .catch(() => {
          this.$toast.error(
            "Ocorreu um erro e não foi possivel cadastrar o colaborador!"
          );
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
