<template>
  <v-app style="background-color: #ececec">
    <div
      class="d-flex flex-column justify-start"
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
        elevation="0"
        width="auto"
        style="overflow: hidden; border: none"
        class="ma-3 mt-0 h-100 rounded-xl d-flex v-sheet--outlined"
      >
        <v-col
          cols="5"
          style="background: #38aa36; border-radius: 0 24px 24px 0"
        >
          <v-container class="h-100 d-flex justify-center flex-column">
            <div class="d-flex flex-column">
              <span
                class="text-h4 font-weight-black text-center mx-auto"
                style="color: white; width: 276px"
              >
                Seu imóvel sem precisar de fiador
              </span>

              <span
                class="subtitle-1 text-center mx-auto mt-3"
                style="color: white; width: 283px"
              >
                Simule agora e descubra o imóvel perfeito para cultivar novos
                momentos.
              </span>
            </div>

            <div style="width: 100%; height: 359px">
              <img
                src="@/assets/images/simulator.svg"
                alt=""
                style="width: 100%; height: 100%"
              />
            </div>
          </v-container>
        </v-col>

        <v-container
          class="d-flex align-center justify-center px-10"
          style="background: #fff; border-radius: 0"
        >
          <v-col cols="9">
            <img
              src="@/assets/images/logo1.png"
              alt=""
              width="100"
              class="d-block mx-auto"
            />

            <v-form
              @submit="handleForm"
              ref="formSimulator"
              class="my-4"
              lazy-validation
            >
              <div class="d-flex">
                <v-col class="pr-2 pa-0">
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
                    v-mask="['###.###.###-##']"
                    required
                    v-model="formatCPF"
                    :rules="rules.cpf"
                  ></v-text-field>
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
                    placeholder="(49) 99999-9999"
                    v-mask="['(##) #####-####', '(##) ####-####']"
                    outlined
                    required
                    v-model="formatPhone"
                    :rules="rules.phone"
                  ></v-text-field>
                </v-col>
              </div>

              <div>
                <h6
                  style="color: #7d7d7d"
                  class="input-label title3 font-weight-bold"
                >
                  Email
                </h6>
                <v-text-field
                  dense
                  placeholder="exemplo@email.com"
                  outlined
                  required
                  v-model="inputsValue.email"
                  :rules="rules.email"
                ></v-text-field>
              </div>

              <div class="d-flex">
                <v-col class="pr-2 pa-0">
                  <h6
                    style="color: #7d7d7d"
                    class="input-label title3 font-weight-bold"
                  >
                    Valor do aluguel
                  </h6>
                  <v-text-field
                    dense
                    placeholder="Ex.: 900,00"
                    outlined
                    required
                    v-money="money"
                    v-model="formatValue"
                    :rules="rules.valueRent"
                  ></v-text-field>
                </v-col>

                <v-col class="pl-2 pa-0">
                  <h6
                    style="color: #7d7d7d"
                    class="input-label title3 font-weight-bold"
                  >
                    Tipo do imóvel
                  </h6>
                  <v-select
                    dense
                    :items="listType"
                    placeholder="Escolha o tipo do imóvel"
                    outlined
                    required
                    item-text="name"
                    item-value="id"
                    v-model="inputsValue.typeProperty"
                    :rules="rules.typeProperty"
                  ></v-select>
                </v-col>
              </div>

              <v-btn
                class="pa-3 w-xs-100 mt-3"
                block
                large
                rounded
                color="primary"
                id="load"
                type="submit"
                :loading="loading"
              >
                <span class="text-none px-10">Simular</span>
              </v-btn>

              <p
                class="
                  caption
                  text--secondary text-center
                  font-weight-regular
                  mt-5
                "
              >
                Esta é uma modalidade de garantia locatícia e o resultado nao
                garante que o cadastro foi aprovado, pois se trata de uma
                simulação.
              </p>
            </v-form>
          </v-col>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import {
  formatDocument,
  unformatPhone,
  unformatString,
  verifyRisk,
} from "@/utils/utils";
import { cpf } from "cpf-cnpj-validator";
import { getVeloScore } from "@/core/service/velo-fianca/checkout.service.js";
import {
  createSimulator,
  getPersonByDocument,
} from "@/core/service/velo-fianca/simulator.service.js";
import { getAllProposeType } from "@/core/service/realestate/plans.service.js";

export default {
  data() {
    return {
      listType: [],
      itemsBreadcrumb: [
        {
          text: "Simulador",
          disabled: true,
          to: "/",
        },
      ],
      loading: false,
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
      inputsValue: {
        valueRent: "R$ 0,00",
      },
      inputsValueFormatted: {},
      rules: {
        typeProperty: [(v) => !!v || "Por favor selecione algum tipo"],
        cpf: [
          (v) => !!v || "O campo de CPF não pode ser vazio",
          (v) => (!!v && cpf.isValid(v)) || "CPF inválido",
        ],
        email: [
          (v) => !!v || "O campo de email não pode ser vazio",
          (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
        ],
        valueRent: [
          (v) => v !== "R$ 0,00" || "A renda estimada não pode ser zero",
          (v) =>
            (!!v && unformatString(v, "pt-BR") > 0) ||
            "O valor não pode ser negativo",
        ],
        phone: [
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
    formatCPF: {
      get() {
        return this.inputsValue.cpf;
      },

      set(value) {
        this.inputsValueFormatted.cpf = formatDocument("CPF", value);
        this.inputsValue.cpf = value;
      },
    },

    formatPhone: {
      get() {
        return this.inputsValue.phone;
      },

      set(value) {
        this.inputsValueFormatted.phone = unformatPhone(value);
        this.inputsValue.phone = value;
      },
    },

    formatValue: {
      get() {
        return this.inputsValue.valueRent;
      },

      set(value) {
        this.inputsValueFormatted.valueRent = unformatString(value, "pt-BR");
        this.inputsValue.valueRent = value;
      },
    },
  },

  mounted() {
    getAllProposeType().then(({ data }) => {
      const result = data.return.map(({ id, name }) => ({ id, name }));

      this.listType = result;
    });
  },

  methods: {
    search(data) {
      this.loading = !this.loading;

      const { cpf, typeProperty, valueRent } = data;

      Promise.all([
        getVeloScore(
          JSON.stringify({
            document: cpf,
            declared: valueRent,
            requested: valueRent,
          })
        ),
        getPersonByDocument(cpf),
      ]).then((responses) => {
        const [veloscore, person] = responses.map(({ data }) => data.return);

        const { idrisk } = veloscore;
        const { id } = person[0];

        const raw = {
          person: id,
          type: typeProperty,
          value: valueRent,
          approved: verifyRisk(idrisk),
        };

        createSimulator(JSON.stringify(raw)).then(({ data }) => {
          console.log(data);

          this.loading = !this.loading;

          this.$router.push(`/simulador-resultado/${data.return[0].id}`);
        });
      });
    },

    handleForm(e) {
      e.preventDefault();

      if (this.$refs.formSimulator.validate()) {
        const data = {
          ...this.inputsValue,
          ...this.inputsValueFormatted,
        };

        this.search(data);
      }
    },
  },
};
</script>

<style>
.v-text-field__details {
  margin-bottom: 0 !important;
}
</style>
