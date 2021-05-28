<template>
  <div>
    <dialog-comissao
      @closeDialog="objComissao.flDialogComissao = $event"
      :objComissao="objComissao"
    />

    <dialog-activator
      @closeDialog="objActivator.flDialogActivator = $event"
      :objActivator="objActivator"
    />

    <v-menu offset-y transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on" style="color: #adadad">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense min-width="50" style="padding: 0px 0">
        <v-list-item-group>
          <v-list-item
            @click="
              $router.push(
                `/imobiliaria/${$route.params.idRealEstate}/colaborador/detalhes-colaborador/${infosPerson.id_colaborador}`
              )
            "
          >
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
            v-if="viewItems.comissao"
            @click="objComissao.flDialogComissao = true"
          >
            <v-list-item-icon class="mr-1">
              <v-icon color="black" small> mdi-cash </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="black--text text-capitalize font-weight-bold"
              >
                Comissão
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-if="viewItems.activator"
            @click="objActivator.flDialogActivator = true"
          >
            <v-list-item-icon class="mr-1">
              <v-icon color="black" small> mdi-cash-multiple </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="black--text text-capitalize font-weight-bold"
              >
                Ativação
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import DialogComissao from "./dialogs/DialogComissao.vue";
import DialogActivator from "./dialogs/DialogActivator.vue";

export default {
  components: {
    DialogComissao,
    DialogActivator,
  },

  props: {
    infosPerson: {},
  },

  data() {
    return {
      objComissao: {
        id: null,
        flDialogComissao: false,
      },
      objActivator: {
        id: this.infosPerson.id_colaborador,
        flDialogActivator: false,
      },
      viewItems: {
        comissao: true,
        activator: true,
      },
    };
  },

};
</script>

<style></style>
