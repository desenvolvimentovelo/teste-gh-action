<template>
  <div class="ml-0 pb-1">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn width="40" height="40" small icon v-bind="attrs" v-on="on">
          <span
            style="
              text-overflow: ellipsis;
              overflow: hidden;
              cursor: pointer;
              font-size: 1.6rem;
            "
            class="font-weight-bold"
          >
            <i class="las la-bullhorn" style="color: #40b540"></i>
          </span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="d-flex justify-space-between green">
          <span class="white--text font-weight-regular"> Ocorrências </span>

          <v-btn
            @click="dialog = !dialog"
            width="34px"
            height="34px"
            icon
            small
          >
            <v-icon size="23px" color="white"> mdi-close </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-5">
          <span class="text-capitalize font-weight-bold pb-md-2 mb-3"
            >Abaixo será listado todas as ocorrencias vinculada a essa
            pessoa</span
          >

          <v-chip
            class="ma-2 text-capitalize font-weight-bold"
            color="orange"
            label
            text-color="white"
          >
            <v-icon left> mdi-label </v-icon>
            CPF Consultado no BC sujeito a revisão
          </v-chip>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
      ocorrences:{}
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {},
};
</script>
