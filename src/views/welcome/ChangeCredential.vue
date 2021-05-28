<template>
  <v-app style="background-color: #ececec">
    <div
      class="d-flex flex-column justify-start"
      style="background-color: #ececec; overflow: hidden !important"
    >
      <v-card
        outlined
        elevation="0"
        width="auto"
        style="border-radius: 10px; min-height: 93vh"
        class="mx-3 my-3"
      >
        <v-row class="my-0">
          <v-col align="center">
            <img src="@/assets/images/velo-composed-logo.svg" width="75" />
          </v-col>
        </v-row>

        <v-row class="mx-0 my-0">
          <v-col cols="6" class="mx-12">
            <div class="d-flex flex-column">
              <h4
                style="
                  color: #40b540;
                  font-size: 36px;
                  font-family: Gill Sans Extrabold, sans-serif;
                  text-shadow: 0 0 0.07em #87f, 0 0 0.01em #87f, 0 0 0.05em #dedede;
                "
                class="font-weight-regular transition1"
              >
                Bem vindo ao VELO 2.0
              </h4>
              <h5
                style="
                  color: #40b540;
                  font-size: 24px;
                  font-family: Gill Sans Extrabold, sans-serif;
                  text-shadow: 0 0 0.07em #87f, 0 0 0.01em #87f, 0 0 0.05em #dedede;
                "
                class="font-weight-regular transition"
              >
                Primeiro valide suas novas credenciais
              </h5>
            </div>

            <img
              src="@/assets/images/undraw_secure_login_pdn4.svg"
              height="340"
              class="mt-6"
            />
          </v-col>

          <v-col cols="4" align-self="start">
            <v-form class="pt-6" ref="changePasswordForm" lazy-validation>
              <h6 style="color: #7d7d7d" class="input-label title2 font-weight-bold">
                Nova senha
              </h6>
              <v-text-field
                v-model="inputsValue.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                placeholder="Digite sua nova senha"
                hint="Senha deve conter mínimo 3 caracteres."
                persistent-hint
                outlined
                required
                dense
                @click:append="show1 = !show1"
              ></v-text-field>

              <h6 style="color: #7d7d7d" class="input-label title2 font-weight-bold">
                Digite novamente
              </h6>
              <v-text-field
                v-model="inputsValue.repeatPassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                placeholder="Digite sua nova senha"
                hint="Senha deve conter mínimo 3 caracteres."
                persistent-hint
                outlined
                required
                dense
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-form>

            <v-btn
              :loading="loading"
              @click="changePassword"
              class="mt-2"
              block
              color="primary"
              rounded
              large
            >
              <span class="px-6 text-capitalize font-weight-regular white--text">
                Alterar senha
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { getSessionUser, changeNewPassword } from "@/core/service/core.service.js";

export default {
  data() {
    return {
      show1: false,
      show2: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
      idUsuarioLogado: null,
      loading: false,
      inputsValue: {
        password: "",
        repeatPassword: "",
      },
    };
  },
  created() {
    getSessionUser().then((sessionUser) => {
      this.idUsuarioLogado = sessionUser.data.return[0].id;
    });
  },

  methods: {
    changePassword() {
      this.loading = true;
      const param = { id: this.idUsuarioLogado, password: this.inputsValue.password };

      if (this.validatePassword()) {
        changeNewPassword(param).then(() => {
          this.$toast.success("Sua senha foi registrada com sucesso!");
          this.loading = false;
          this.$router.push("/bem-vindo");
        });
      } else {
        this.$toast.warning("As senhas não correspondem.");
        this.loading = false;
      }
    },

    validatePassword() {
      if (
        this.inputsValue.password &&
        this.inputsValue.repeatPassword &&
        this.inputsValue.password === this.inputsValue.repeatPassword
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.transition {
  animation-duration: 1.5s;
  animation-name: slidein;
}

.transition1 {
  animation-duration: 0.5s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 4%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
</style>
