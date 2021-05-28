<template>
  <div>
    <v-menu offset-y transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on" style="color: #adadad">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense min-width="50" style="padding: 0px 0">
        <v-list-item-group>
          <v-list-item @click="detailsAction">
            <v-list-item-icon class="mr-1">
              <v-icon color="black" small> mdi-open-in-new </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="black--text text-capitalize font-weight-bold"
              >
                Abrir
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            @click="collaboratorAction"
            v-if="viewItems.collaborator"
          >
            <v-list-item-icon class="mr-1">
              <v-icon color="black" small> mdi-account </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="black--text text-capitalize font-weight-bold"
              >
                Colaboradores
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { getAddressId } from "@/core/service/core.service.js";

export default {
  props: {
    infosCompany: {},
  },

  mounted() {
    if (this.infosCompany.status == 2) {
      this.viewItems.collaborator = true;
    }
  },

  data() {
    return {
      viewItems: {
        collaborator: false,
      },
    };
  },

  methods: {
    collaboratorAction() {
      this.$router.push(
        `/imobiliaria/${this.infosCompany.idrealestate}/colaborador`
      );
    },

    detailsAction() {
      const {
        idrealestate,
        idaddress,
        status,
        comercialname,
        document,
        phone,
        email,
        cpf,
        clientperson,
        nome,
        creci,
        endereco,
        bairro,
        city,
        estado,
        numero,
        cep,
      } = this.infosCompany;

      getAddressId(idaddress).then((resp) => {
        const { street, neighborhood, state, number, zipcode } =
          resp.data.return[0];

        this.endereco = street;
        this.bairro = neighborhood;
        this.estado = state;
        this.numero = number;
        this.cep = zipcode;

        if (status === "0") {
          // Aguardando aprovação
          this.$router.push("imobiliaria-aguardando-aprovacao");
        } else if (status === "1") {
          // Aguardando assinatura
          this.$router.push({
            path: "/imobiliaria-contrato-assinatura",
            query: {
              imobiliaria: comercialname,
              cnpj: document,
              telefone: phone,
              email,
              cpf,
              clientperson,
              nome,
              creci,
              endereco,
              bairro,
              cidade: city,
              estado,
              numero,
              cep,
            },
          });
        } else {
          // Aprovado
          this.$router.push(`/imobiliaria/${idrealestate}`);
        }
      });
    },
  },
};
</script>

<style></style>
