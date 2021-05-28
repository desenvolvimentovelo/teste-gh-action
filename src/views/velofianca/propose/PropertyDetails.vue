<template>
  <v-app style="background-color: #ececec">
    <div class="mb-3" style="background-color: #ececec; overflow: hidden !important">
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
        class="mx-3"
      >
        <Loader />

        <v-container fluid class="px-sm-10 d-flex align-center" style="min-height: 93vh">
          <div class="h-100 d-flex justify-space-between flex-column">
            <div class="d-flex align-center w-100 mx-auto">
              <div class="py-5 w-100 mx-auto d-flex align-center">
                <router-link to="/pacote-locacao">
                  <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
                </router-link>

                <StepperPropose
                  :items="[
                    'las la-building',
                    'las la-user',
                    'las la-box',
                    'las la-home',
                    'las la-list-alt',
                  ]"
                />
              </div>
            </div>

            <v-col cols="12" class="px-0 mb-2">
              <span class="font-weight-regular text-light title1"> Dados do imóvel </span>
            </v-col>

            <v-form
              style="height: 82%"
              v-model="valid"
              ref="form"
              lazy-validation
              @submit="validations"
              onSubmit="return false;"
            >
              <v-row>
                <v-col cols="12" md="2" sm="6" class="py-0">
                  <h6 class="input-label text-light mb-1">CEP</h6>
                  <v-text-field
                    v-mask="'##.###-###'"
                    placeholder="CEP"
                    dense
                    type="text"
                    v-model="zipcode"
                    outlined
                    @change="getInfosAddress"
                    :rules="rules.cepRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="5" sm="5" class="py-0">
                  <h6 class="input-label text-light mb-1">Rua</h6>
                  <v-text-field
                    dense
                    type="text"
                    v-model="address.street"
                    outlined
                    placeholder="Rua"
                    :rules="rules.streetRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="2" sm="3" class="py-0">
                  <h6 class="input-label text-light mb-1">Número</h6>
                  <v-text-field
                    dense
                    type="number"
                    v-model="address.number"
                    outlined
                    placeholder="Número"
                    :rules="rules.numberRules"
                    @change="getGeocoding"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="3" class="py-0">
                  <h6 class="input-label text-light mb-1">Bairro</h6>
                  <v-text-field
                    dense
                    type="text"
                    v-model="address.neighborhood"
                    outlined
                    placeholder="Bairro"
                    :rules="rules.districtRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3" sm="5" class="py-0">
                  <h6 class="input-label text-light mb-1">Cidade</h6>
                  <v-text-field
                    dense
                    type="text"
                    placeholder="Cidade"
                    v-model="address.city"
                    outlined
                    :rules="rules.cityRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="2" sm="3" class="py-0">
                  <h6 class="input-label text-light mb-1">Estado</h6>
                  <v-select
                    dense
                    :items="getAllStates"
                    :rules="rules.stateRules"
                    v-model="address.state"
                    :loading="loading"
                    outlined
                    placeholder="Estado"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="4" sm="6" class="py-0">
                  <h6 class="input-label text-light mb-1">Complemento</h6>
                  <v-text-field
                    dense
                    type="text"
                    placeholder="Complemento"
                    v-model="address.complement"
                    outlined
                    :rules="rules.complementRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="3" md="3" class="py-0">
                  <h6 class="input-label text-light mb-1">Tipo do imóvel</h6>
                  <v-select
                    dense
                    :items="getListTypesProperty"
                    placeholder="Tipo do imóvel"
                    item-value="id"
                    item-text="name"
                    outlined
                    v-model="address.propertytype"
                    :rules="rules.typePropertyRules"
                    @change="handleTypeProperty"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>

            <!-- MAPA -->
            <div class="w-100 mx-auto">
              <v-col class="px-0">
                <div id="mapContainer" style="height: 30vh" class="basemap"></div>
              </v-col>
            </div>

            <v-row justify="end" class=" mt-5 mt-lg-2
                v-data-footer mr-3">
              <v-col align="end" cols="12" md="2" sm="5" class="w-xs-100 px-0">
                <v-btn
                  @click="$router.push('/pacote-locacao')"
                  class="w-xs-100"
                  large
                  rounded 
                  color="primary"
                  outlined
                >
                  <span class="text-capitalize px-10">Voltar</span>
                </v-btn>
              </v-col>

              <v-col align="end" cols="12" md="2" sm="5">
                <v-btn
                  @click="validations"
                  class="w-xs-100 px-6"
                  large
                  rounded
                  color="primary"
                  :loading="loading"
                >
                  <span class="text-none">Revisar informações</span>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import {
  GET_ADDRESS,
  GET_LOCALIZATION,
} from "@/core/store/velo-fianca/propertyDetails.module.js";
import {
  getProposeValue,
  editProperty,
  addProperty,
  addObject,
} from "@/core/service/velo-fianca/propertyDetails.service.js";
import { GET_HANDLE_STEP } from "@/core/store/core.module.js";
import StepperPropose from "@/views/velofianca/propose/StepperPropose";
import mapboxgl from "mapbox-gl";
import { mapGetters } from "vuex";
import { updateStepPropose } from "@/core/service/core.service.js";
import Loader from "@/views/components/widgets/Loader";
import ApiService from "@/core/service/api.service";
import { GET_KEEP_PROPOSE } from "@/core/store/velo-fianca/keepPropose.module.js";

export default {
  components: {
    StepperPropose,
    Loader,
  },
  data() {
    return {
      loading: false,
      valid: false,
      zipcode: "",
      address: {
        neighborhood: "",
        zipcode: "",
        complement: "",
        city: "",
        street: "",
        state: "",
        number: "",
        geolocation: "-47.16855131497132, -17.239525883340377",
        propertytype: "",
      },
      accessToken:
        "pk.eyJ1IjoibGtrYnJ1bm8iLCJhIjoiY2treWdqeGJoMDg4MjJ4cW4weG9hdGZoNiJ9.u-tEfnt3sHWcGwAv9sIP0Q",
      rules: {
        cepRules: [(v) => !!v || "O campo da CEP não pode ser vazio"],
        streetRules: [(v) => !!v || "O campo da rua não pode ser vazio"],
        numberRules: [(v) => !!v || "O campo de número não pode ser vazio"],
        districtRules: [(v) => !!v || "O campo de bairro não pode ser vazio"],
        cityRules: [(v) => !!v || "O campo de cidade não pode ser vazio"],
        stateRules: [(v) => !!v || "O campo de estado não pode ser vazio"],
        typePropertyRules: [(v) => !!v || "Você precisa selecionar o tipo do imóvel"],
      },
      itemsBreadcrumb: [
        {
          text: "Propostas",
          disabled: false,
          to: "/proposta",
        },
        {
          text: "Tipo da Proposta",
          disabled: false,
          to: "/escolher-tipo-proposta",
        },
        {
          text: "Dados do Locatario",
          disabled: false,
          to: "/dados-inquilino",
        },
        {
          text: "Pacote de Locação",
          disabled: false,
          to: "/pacote-locacao",
        },
        {
          text: "Detalhes do imóvel",
          disabled: true,
          to: "/",
        },
      ],

      map: (geolocation) =>
        new mapboxgl.Map({
          container: "mapContainer",
          style: "mapbox://styles/mapbox/streets-v11",
          center: geolocation,
          zoom: geolocation[0] === -47.16855131497132 ? 3 : 17,
        }),
    };
  },
  computed: {
    ...mapGetters([
      "getLocalization",
      "getListTypesProperty",
      "getAddress",
      "getAllStates",
    ]),
    getAddressComputed() {
      return this.getAddress;
    },
    getLocalizationComputed() {
      return this.getLocalization;
    },
  },

  watch: {
    getAddress(address) {
      if (sessionStorage.getItem("renderItems") !== null) {
        this.updateAddress(address);

        sessionStorage.removeItem("renderItems");
      }
    },
    getLocalization() {
      this.initializeMap();
    },
  },

  mounted() {
    const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

    if (sessionStorageItem === null || sessionStorageItem.objectPropose === undefined) {
      this.$router.push("/escolher-tipo-proposta");
    } else {
      sessionStorage.setItem("renderItems", true);

      if (sessionStorage.getItem("redirect") !== null) {
        const self = this;

        this.$store.dispatch(GET_KEEP_PROPOSE, self);
      } else {
        if (sessionStorageItem.address !== undefined) {
          this.$store.dispatch(GET_ADDRESS, sessionStorageItem.address);
        }

        updateStepPropose(4);
      }

      this.initializeMap();

      this.$store.dispatch(GET_HANDLE_STEP, 4);
    }
  },
  methods: {
    handleTypeProperty() {
      this.$store.dispatch(GET_ADDRESS, {
        ...this.address,
        propertytype: Number(this.address.propertytype),
      });

      this.flowCreateOrUdateProperty();
    },

    updateAddress(address) {
      const { zipcode, propertytype } = address;

      this.address = {
        ...address,
        propertytype: Number(propertytype),
      };
      this.zipcode = zipcode;
    },

    getInfosAddress() {
      this.loading = true;
      let unMasked = this.zipcode.replace("-", "").replace(".", "");

      ApiService.getViaCEP(unMasked)
        .then(({ data }) => {
          if (data.erro) {
            this.$toast.error("O CEP que você digitou é inválido");
          } else {
            let { bairro, logradouro, uf, complemento, cep, localidade } = data;
            this.address = {
              neighborhood: bairro,
              zipcode: cep,
              state: uf,
              street: logradouro,
              complement: complemento,
              city: localidade,
              number: null,
              propertytype: null,
              geolocation: this.address.geolocation,
            };

            this.$store.dispatch(GET_ADDRESS, this.address);

            this.flowCreateOrUdateProperty();
          }

          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },

    async validations() {
      if (this.$refs.form.validate()) {
        this.$router.push({
          path: "/checkout",
          query: {
            checkout: "end",
          },
        });
      }
    },

    async flowCreateOrUdateProperty() {
      const { zipcode, geolocation, ...item } = this.address;
      const body = {
        ...item,
        zipcode: zipcode.replace("-", ""),
        geolocation: String(geolocation),
      };

      const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));
      const response = await getProposeValue(sessionStorageItem.objectPropose.id);

      if (response.data.return.length > 0) {
        await this.updateInfosProperty(response, body);
      } else {
        await this.createProperty(body);
      }

      this.$store.dispatch(GET_ADDRESS, body);
    },

    async updateInfosProperty(response, body) {
      await editProperty(
        JSON.stringify({
          id: response.data.return[0].property,
          ...body,
        })
      );

      sessionStorage.setItem(
        "data",
        JSON.stringify({
          ...JSON.parse(sessionStorage.getItem("data")),
          address: {
            id: response.data.return[0].id,
            ...body,
          },
        })
      );
    },

    async createProperty(body) {
      const { data } = await addProperty(JSON.stringify(body));

      await addObject(
        JSON.stringify({
          propose: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
          property: data.return[0].id,
        })
      );

      sessionStorage.setItem(
        "data",
        JSON.stringify({
          ...JSON.parse(sessionStorage.getItem("data")),
          address: {
            id: data.return[0].id,
            ...body,
          },
        })
      );
    },

    getGeocoding() {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          this.address.number
        }%20${this.address.street.replace(" ", "%20")}%20${this.address.neighborhood}%20${
          this.address.state
        }%20${this.address.city.replace(" ", "%20")}.json?types=address&access_token=${
          this.accessToken
        }`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.features.length > 0) {
            const data = [json.features[0].center[0], json.features[0].center[1]];

            this.address.geolocation = data;

            this.$store.dispatch(GET_LOCALIZATION, data);

            const map = this.map([data[0], data[1]]);

            map.flyTo({
              center: [data[0], data[1]],
              zoom: 17,
              essential: true,
            });

            new mapboxgl.Marker().setLngLat([data[0], data[1]]).addTo(map);

            this.$store.dispatch(GET_ADDRESS, this.address);

            this.flowCreateOrUdateProperty();
          }
        });
    },

    initializeMap() {
      const geolocation = this.getLocalization;

      mapboxgl.accessToken = this.accessToken;

      let map = this.map(geolocation);

      new mapboxgl.Marker().setLngLat(geolocation).addTo(map);
    },
  },
};
</script>

<style>
.mapboxgl-canvas {
  width: 100%;
}

.v-text-field__details {
  margin-bottom: 0px !important;
}
</style>
