<template>
  <v-app class="propose" style="background-color: #ececec">
    <div style="background-color: #ececec" class="h-100">
      <v-breadcrumbs :items="itemsBreadcrumb" class="font-weight-bold py-1">
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>

      <v-card
        outlined
        elevation="0"
        width="auto"
        style="border-radius: 10px; height: calc(98vh - 29px)"
        class="mx-3 mb-3 h-100 d-flex justify-center align-center"
      >
        <div class="d-flex align-center justify-center flex-column h-100">
          <img
            src="@/assets/images/register-realestate-sign.svg"
            alt="Pessoa assinando folha"
            width="350"
          />

          <div class="my-5 text-center text-light">
            <h1>Seu contrato foi enviado para assinatura</h1>
            <h3>Contrato enviado para: {{ email }}</h3>
          </div>

          <div class="text-center">
            <v-btn
              @click="$router.push('/imobiliarias')"
              color="primary"
              rounded
              class="text-capitalize mb-2"
              large
            >
              <span class="text-center px-10"> Voltar Imobiliárias </span>
            </v-btn>

            <v-btn
              @click="asignContract()"
              color="primary"
              rounded
              outlined
              class="text-capitalize ml-2 mb-2"
              large
            >
              <span class="text-center px-6"> Assinar documento </span>
            </v-btn>
          </div>
        </div>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      documentHash: null,
      asignHash: null,
      email: "",
      cpf: "",
      nome: "",
      endereco: "",
      bairro: "",
      creci: "",
      cep: "",
      numero: "",
      estado: "",
      cidade: "",
      imobiliaria: "",
      cnpj: "",
      telefone: "",
      clientperson: "",
      itemsBreadcrumb: [
        {
          text: "Imobiliárias",
          disabled: false,
          to: "/imobiliarias",
        },
        {
          text: "Contrato aguardando assinatura",
          disabled: true,
          to: "",
        },
      ],
    };
  },
  methods: {
    asignContract() {
      window.open(`${this.$route.query.contract}`);
    },
  },
};
</script>

<style></style>
