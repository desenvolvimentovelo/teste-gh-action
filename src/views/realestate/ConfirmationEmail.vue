<template>
  <v-container>
    <img
      :src="require('@/assets/images/Confirmacao-Email-01.svg')"
      alt="Pessoa enviando email"
      width="300"
      class="d-block mx-auto"
    />

    <div class="d-flex justify-center align-center flex-column">
      <span class="text-h5 font-weight-bold mt-3">Verifique seu email</span>

      <v-col cols="8" class="text-center">
        <span class="subtitle-1 text--secondary font-weight-regular">
          Enviamos um e-mail para <b>{{ email }}</b> para confirmar a validade
          do nosso endereço de e-mail. Após receber o e-mail siga o link
          fornecido para concluir seu cadastro.
        </span>
      </v-col>

      <v-divider class="mt-6 mb-3" style="width: 750px"></v-divider>

      <p class="my-0 text--secondary">
        Se você não recebeu nenhum e-mail
        <a
          :disabled="disabledLink"
          @click="resendEmail"
          v-bind:class="{ 'text-decoration-underline': !disabledLink }"
        >
          Reenviar e-mail de confirmação
        </a>
      </p>

      <p v-if="disabledLink">Reenviar email dentro de 1 minuto</p>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { sendMail } from "@/core/service/realestate/registerGestor.service.js";

export default {
  data() {
    return {
      email: "-",
      disabledLink: false,
    };
  },

  computed: {
    ...mapGetters(["getEmail", "getIdPerson"]),
  },

  mounted() {
    this.email = this.getEmail;
  },

  methods: {
    activeTimer() {
      setTimeout(() => {
        this.disabledLink = false;
      }, 60000);
    },

    resendEmail() {
      this.disabledLink = true;

      this.activeTimer();

      sendMail(this.getIdPerson).then(() => {
        this.$toast.success("E-mail enviado com sucesso");
      });
    },
  },
};
</script>

<style>
a[disabled] {
  pointer-events: none;
  color: #666 !important;
}
</style>
