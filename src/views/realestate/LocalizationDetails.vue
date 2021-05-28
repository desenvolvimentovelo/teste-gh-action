<template>
  <v-container class="d-flex align-center justify-center h-100">
    <v-row>
      <v-col
        cols="7"
        class="d-none d-sm-flex align-center justify-center flex-column"
        style="position: relative"
      >
        <span
          @click="backPage"
          style="
            position: absolute;
            top: 7px;
            left: 10px;
            cursor: pointer;
            color: #4fbb4f;
          "
        >
          <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
        </span>

        <img
          :src="require('@/assets/images/register-realestate-loc.svg')"
          alt="Vetor Localização Imobiliária"
          class="px-8 vector-localization mr-auto"
        />
      </v-col>

      <v-col cols="12" sm="5" class="px-3">
        <h2 style="color: #7d7d7d" class="mb-3 text-center">Dados da Localização</h2>

        <v-form ref="formLocalization" v-model="valid" lazy-validation>
          <h6 style="color: #7d7d7d" class="input-label title3 font-weight-bold">CEP</h6>
          <v-text-field
            dense
            placeholder="CEP"
            outlined
            required
            :rules="rules.cep"
            v-mask="['#####-###']"
            v-model="inputsValue.zipcode"
            :loading="loading"
            @blur="getAddress"
          ></v-text-field>

          <v-row>
            <v-col cols="8">
              <h6 style="color: #7d7d7d" class="input-label title3 font-weight-bold">
                Rua
              </h6>
              <v-text-field
                dense
                placeholder="Rua"
                outlined
                required
                :rules="rules.street"
                v-model="inputsValue.street"
                :loading="loading"
              ></v-text-field>
            </v-col>

            <v-col cols="4" class="pl-0">
              <h6 style="color: #7d7d7d" class="input-label title3 font-weight-bold">
                Número
              </h6>
              <v-text-field
                dense
                placeholder="Número"
                outlined
                required
                :rules="rules.number"
                v-model="inputsValue.number"
                :loading="loading"
              ></v-text-field>
            </v-col>
          </v-row>

          <h6 style="color: #7d7d7d" class="input-label title3 font-weight-bold">
            Bairro
          </h6>
          <v-text-field
            dense
            placeholder="Bairro"
            outlined
            required
            :rules="rules.neighborhood"
            v-model="inputsValue.neighborhood"
            :loading="loading"
          ></v-text-field>

          <v-row>
            <v-col cols="8">
              <h6 style="color: #7d7d7d" class="input-label title3 font-weight-bold">
                Cidade
              </h6>
              <v-text-field
                dense
                placeholder="Cidade"
                outlined
                required
                :rules="rules.city"
                v-model="inputsValue.city"
                :loading="loading"
              ></v-text-field>
            </v-col>

            <v-col cols="4" class="pl-0">
              <h6 style="color: #7d7d7d" class="input-label title3 font-weight-bold">
                Estado
              </h6>
              <v-select
                dense
                :items="getAllStates"
                :rules="rules.state"
                v-model="inputsValue.state"
                :loading="loading"
                outlined
                placeholder="Estado"
              ></v-select>
            </v-col>
          </v-row>

          <h6 style="color: #7d7d7d" class="input-label title3 font-weight-bold">
            Complemento
          </h6>
          <v-text-field
            dense
            placeholder="Complemento"
            outlined
            required
            :rules="rules.complement"
            v-model="inputsValue.complement"
            :loading="loading"
          ></v-text-field>
        </v-form>

        <v-btn :loading="loading" @click="nextPage" block color="primary" rounded large>
          <span class="px-6 text-capitalize font-weight-regular white--text">
            Salvar
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VIEW_PAGE } from "@/core/store/velo-imobiliaria/register.module.js";
import ApiService from "@/core/service/api.service";
import { mapGetters } from "vuex";
import {
  companyActions,
  getSessionUser
} from "@/core/service/core.service.js";
import {
  createRealEstate,
  createAddress,
  getColaboradorId,
  updateColaborador,
} from "@/core/service/velo-imobiliaria/localizationDetails.service.js";

export default {
  data() {
    return {
      inputsValue: {
        zipcode: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        complement: "",
      },

      loading: false,
      valid: true,

      rules: {
        cep: [(v) => !!v || "O CEP não pode ser vazio"],
        street: [(v) => !!v || "O nome da rua não pode ser vazio"],
        number: [(v) => !!v || "O campo de número não pode ser vazio"],
        state: [(v) => !!v || "Você precisa escolher o estado"],
        neighborhood: [(v) => !!v || "O campo de Bairro não pode ser vazio"],
        city: [(v) => !!v || "O campo da City não pode ser vazio"],
      },
    };
  },
  computed: {
    ...mapGetters(["getAllStates", "getRealEstateData"]),
  },
  methods: {
    nextPage() {
      if (this.$refs.formLocalization.validate()) {
        this.loading = true;

        createAddress(JSON.stringify(this.inputsValue)).then((address) => {
          companyActions
            .create(
              JSON.stringify({
                ...this.getRealEstateData,
                address: address.data.return[0].id,
              })
            )
            .then((company) => {
              getSessionUser().then((sessionUser) => {
                createRealEstate(
                  JSON.stringify({
                    person: sessionUser.data.return[0].idperson,
                    company: company.data.return[0].id,
                    creci: this.getRealEstateData.creci,
                    status: 0,
                  })
                ).then((realestate) => {
                  getColaboradorId(sessionUser.data.return[0].id).then((colaborador) => {
                    updateColaborador(
                      JSON.stringify({
                        id: colaborador.data.return[0].id,
                        realestate: realestate.data.return[0].id,
                      })
                    ).then(() => {
                      this.$router.push({
                        path: "/imobiliaria-aguardando-aprovacao",
                        query: {
                          dsImobiliaria: JSON.parse(sessionStorage.getItem("realestate"))
                            .nomeFantasia,
                        },
                      });

                      this.backPage();
                      this.loading = false;
                      sessionStorage.removeItem("realestate");
                    });
                  });
                });
              });
            });
        });
      }
    },

    backPage() {
      this.$store.dispatch(VIEW_PAGE, 1);
    },

    getAddress() {
      if (this.inputsValue.zipcode.length >= 9) {
        this.loading = true;

        let unMasked = this.inputsValue.zipcode.replace("-", "").replace(".", "");

        ApiService.getViaCEP(unMasked).then(({ data }) => {
          const { bairro, complemento, localidade, logradouro, uf } = data;

          this.inputsValue = {
            ...this.inputsValue,
            neighborhood: bairro,
            complement: complemento,
            city: localidade,
            street: logradouro,
            state: uf,
          };

          this.loading = false;
        });
      }
    },
  },
};
</script>

<style scoped>
.vector-localization {
  width: 90%;
}

@media (min-width: 1264px) {
  .vector-localization {
    width: 500px;
  }
}
</style>

<style>
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0px !important;
}
</style>
