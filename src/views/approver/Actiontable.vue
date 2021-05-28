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
          <v-list-item v-if="viewItems.view" @click="DetailsRealEstate()">
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
import { GET_VIEW_APPROVER_ESTATE } from "@/core/store/velo-fianca/RealEstate.module.js";
import { updateRealEstate } from "@/core/service/core.service";
export default {
  props: {
    infosaproverRealtEstate: {},
  },

  data() {
    return {
      snackbar: false,
      idrouter: false,
      texto: "Funcionalidade de visualizar está em desenvolvimento.",
      textdefault: "Sua proposta foi aprovada com sucesso",
      textdefaultfail: "Sua proposta foi aprovada com sucesso",
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
    this.$store.dispatch(GET_VIEW_APPROVER_ESTATE);
  },
  computed: {
    ...mapGetters(["getViewAprovespending"]),
  },

  methods: {
    DetailsRealEstate() {
      let id = this.infosaproverRealtEstate.id;

      this.$router.push(`/detalhes-imobiliaria/${id}`);
    },

    approverRealEstate() {
      let id = this.infosaproverRealtEstate.imob;
      updateRealEstate(
        JSON.stringify({
          id: id,
          status: 1,
        })
      ).then(() => {
        this.$store.dispatch(GET_VIEW_APPROVER_ESTATE);
        this.$toast.success(
          "Imobiliaria foi aprovada, verifique na listagem de proposta "
        );
      });
    },

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
