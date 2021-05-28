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
          <v-list-item v-if="viewItems.view" @click="detail()">
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
          <v-list-item v-if="viewItems.view" @click="Approver()">
            <v-list-item-icon class="mr-1">
              <v-icon color="black" small> mdi-thumb-up </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="black--text text-capitalize font-weight-bold"
              >
                Aprovar
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="viewItems.view" @click="handleFail()">
            <v-list-item-icon class="mr-1">
              <v-icon color="black" small> mdi-thumb-down </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="black--text text-capitalize font-weight-bold"
              >
                Reprovar
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <v-snackbar v-model="snackbar">
      {{ texto }}

      <template v-slot:action="{ attrs }">
        <v-btn
          outlined
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          OK
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_VIEW_APPROVER } from "@/core/store/velo-fianca/approver.module.js";
import { updatePropose, sendMail } from "@/core/service/core.service";
import { addEvaluationtext } from "../../core/service/velo-fianca/proposedetail.service";
export default {
  props: {
    infosaprover: {},
  },

  data() {
    return {
      snackbar: false,
      idrouter: false,
      texto: "Funcionalidade de visualizar está em desenvolvimento.",
      textdefault: "Sua proposta foi aprovada com sucesso",
      objCancelarProposta: { id: null, flDialogCancelarProposta: false },
      viewItems: {
        open: false,
        view: false,
        cancel: false,
      },
      status: "",
    };
  },

  mounted() {
    this.verifyActions();
    this.$store.dispatch(GET_VIEW_APPROVER);
  },
  computed: {
    ...mapGetters(["getViewAprovespending"]),
  },

  methods: {
    detail() {
      this.$router.push(`/aprovador/${this.infosaprover.id}`);
    },
    handleFail() {
      let id = this.infosaprover.id;

      updatePropose(
        JSON.stringify({
          id: id,
          status: 5,
        })
      ).then(() => {
        this.$store.dispatch(GET_VIEW_APPROVER);
        this.$toast.success(
          "Proposta foi Reprovada, verifique na listagem de proposta "
        );
      });
    },

    Approver() {
      let id = this.infosaprover.id;
      let status = this.infosaprover.idstatus;
      let statusAnalise = 11;
      let statusAfiançado = 9;
      let statusAssinatura = 6;

      updatePropose(
        JSON.stringify({
          id: id,
          status: status == statusAnalise ? statusAfiançado : statusAssinatura, //+- verificação de status-
        })
      ).then((item) => {
        addEvaluationtext(
          JSON.stringify({
            propose: item.data.return[0].id,
            description: this.textdefault,
            type: item.data.return[0].status,
          })
        ).then(() => {
          sendMail(4, id);
          this.$store.dispatch(GET_VIEW_APPROVER);
          this.$toast.success(
            "Proposta foi aprovada, verifique na listagem de proposta "
          );
        });
      });
    },
    viewFianca() {},
    verifyActions() {
      this.viewItems = {
        open: true,
        view: true,
        cancel: true,
      };
    },
  },
};
</script>

<style>
.mdi-thumb-up::before {
  color: #3eaf3e;
}
.mdi-thumb-down::before {
  color: #dd1f11;
}
</style>
