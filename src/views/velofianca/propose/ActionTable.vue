<template>
  <div>
    <dialog-cancelar-proposta
      @closeDialog="objCancelarProposta.flDialogCancelarProposta = $event"
      v-bind:objCancelarProposta="objCancelarProposta"
    />

    <dialog-request-cancel-propose
      @closeDialog="
        objRequestCancelPropose.flDialogRequestCancelpropose = $event
      "
      v-bind:objRequestCancelPropose="objRequestCancelPropose"
    />

    <v-menu offset-y transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on" style="color: #adadad">
          <v-icon> mdi-dots-vertical </v-icon>
        </v-btn>
      </template>

      <v-list dense min-width="50" style="padding: 0px 0">
        <v-list-item-group>
          <v-list-item v-if="viewItems.open" @click="openPropose()">
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

          <v-list-item v-if="viewItems.view" @click="viewPropose()">
            <v-list-item-icon class="mr-1">
              <v-icon color="black" small> mdi-eye </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="black--text text-capitalize font-weight-bold"
              >
                Visualizar
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-if="viewItems.viewCancel"
            @click="
              viewItems.cancelRequest ? requestCancelPropose() : cancelPropose()
            "
          >
            <v-list-item-icon class="mr-1">
              <v-icon color="black" small> mdi-cancel </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="black--text text-capitalize font-weight-bold"
              >
                Cancelar
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import steps from "@/core/mocks/steps";
import DialogCancelarProposta from "./dialogs/DialogCancelarProposta.vue";
import DialogRequestCancelPropose from "./dialogs/DialogRequestCancelPropose.vue";
import { resetStateVuex } from "@/utils/utils";

export default {
  components: { DialogCancelarProposta, DialogRequestCancelPropose },
  props: {
    infosPropose: {},
  },

  data() {
    return {
      objCancelarProposta: { id: null, flDialogCancelarProposta: false },
      objRequestCancelPropose: {
        idPropose: null,
        flDialogRequestCancelpropose: false,
      },
      viewItems: {
        open: false,
        view: false,
        cancelRequest: false,
        viewCancel: false,
      },
    };
  },

  mounted() {
    this.verifyActions();

    this.objRequestCancelPropose.idPropose = this.infosPropose.id;
  },

  methods: {
    requestCancelPropose() {
      this.objRequestCancelPropose.flDialogRequestCancelpropose = true;
    },

    openPropose() {
      sessionStorage.clear();
      const self = this;
      resetStateVuex(self);
      this.verifyStatusToRedirect();
    },

    viewPropose() {
      sessionStorage.clear();
      sessionStorage.setItem(
        "data",
        JSON.stringify({
          objectPropose: this.infosPropose,
        })
      );

      this.$router.push(`/checkout/${this.infosPropose.id}?checkout=view`);
    },

    cancelPropose() {
      this.objCancelarProposta.flDialogCancelarProposta = true;
      this.objCancelarProposta.id = Number(this.infosPropose.id);
    },

    verifyStatusToRedirect() {
      const { id, step, status } = this.infosPropose;
      sessionStorage.clear();
      sessionStorage.setItem(
        "data",
        JSON.stringify({
          objectPropose: this.infosPropose,
        })
      );

      switch (status.toUpperCase()) {
        case "EM AVALIAÇÃO":
          this.$router.push("/aguardando-analise");
          break;

        case "PAGAMENTO":
          this.$router.push("/aguardando-pagamento");
          break;

        case "REPROVADO":
          this.$router.push(`/ocorrencia-retorno/${id}`);
          break;

        case "EM ASSINATURA":
          this.$router.push("/aguardando-assinatura");
          break;

        case "AGUARDANDO DOCUMENTOS":
          sessionStorage.setItem("redirect", true);

          this.$router.push("/attachment");
          break;

        case "ATIVADA":
          this.$router.push(`/checkout/${id}?checkout=attachment`);
          break;

        case "INICIADA":
          sessionStorage.setItem("redirect", true);

          if (step == "5") {
            this.$router.push(`/checkout/${id}?checkout=redirect`);
          } else {
            const result = steps.filter(({ id }) => id === Number(step));

            this.$router.push(result[0].route);

            if (result[0].id == 4) {
              sessionStorage.setItem("renderItems", true);
            }
          }
          break;

        default:
          throw new TypeError(
            `O status ${status} não existe como uma opção no switch!`,
            "action-table.vue"
          );
      }
    },

    verifyActions() {
      const { status } = this.infosPropose;

      switch (status.toUpperCase()) {
        case "EM AVALIAÇÃO":
          this.viewItems = {
            open: true,
            view: true,
            cancelRequest: true,
            viewCancel: true,
          };
          break;

        case "PAGAMENTO":
          this.viewItems = {
            open: true,
            view: true,
            cancelRequest: true,
            viewCancel: true,
          };
          break;

        case "REPROVADO":
          this.viewItems = {
            open: true,
            view: true,
            cancelRequest: false,
            viewCancel: false,
          };
          break;

        case "ATIVADA":
          this.viewItems = {
            open: true,
            view: true,
            cancelRequest: true,
            viewCancel: true,
          };
          break;

        case "EM ASSINATURA":
          this.viewItems = {
            open: true,
            view: true,
            cancelRequest: true,
            viewCancel: true,
          };
          break;

        case "INICIADA":
          this.viewItems = {
            open: true,
            view: false,
            cancelRequest: false,
            viewCancel: true,
          };
          break;

        case "AGUARDANDO DOCUMENTOS":
          this.viewItems = {
            open: true,
            view: true,
            cancelRequest: true,
            viewCancel: true,
          };
          break;

        case "CANCELADA":
          this.viewItems = {
            open: false,
            view: true,
            cancelRequest: false,
            viewCancel: false,
          };
          break;

        case "AFIANÇADO":
          this.viewItems = {
            open: false,
            view: true,
            cancelRequest: true,
            viewCancel: true,
          };
          break;

        case "EM ANÁLISE":
          this.viewItems = {
            open: false,
            view: true,
            cancelRequest: true,
            viewCancel: true,
          };
          break;

        default:
          this.viewItems = {
            open: false,
            view: false,
            cancelRequest: false,
            viewCancel: false,
          };

          throw new TypeError(
            `O status ${status} não existe como uma opção no switch!`,
            "action-table.vue"
          );
      }
    },
  },
};
</script>

<style></style>
