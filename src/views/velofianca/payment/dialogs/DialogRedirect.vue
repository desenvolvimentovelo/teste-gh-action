<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialogAwait" width="500">
      <v-card class="py-5">
        <v-card-text class="d-flex justify-center align-center flex-column">
          <span class="text-h5 text-center">
            Você será redirecionado para o pagamento
          </span>

          <v-progress-circular
            indeterminate
            color="primary"
            class="mt-3"
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogAwait: false,
    };
  },

  methods:{
    openAwaiting(){
      this.dialogAwait = true;
    },
    closeAwaiting(){
      this.dialogAwait = false;
    }
  }
};
</script>
