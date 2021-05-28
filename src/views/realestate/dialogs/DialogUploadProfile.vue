<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          style="width: 112px; height: 112px"
          icon
          v-bind="attrs"
          v-on="on"
        >
          <img
            src="https://dummyimage.com/160x160/666/fff"
            alt="Profile"
            class="rounded-circle"
            style="width: 112px; height: 112px"
          />
        </v-btn>
      </template>

      <uploadProfile />
    </v-dialog>
  </div>
</template>

<script>
import uploadProfile from "../../components/widgets/UploadProfile";

export default {
  data() {
    return {
      dialog: false,
      options: {
        height: 350,
      },
    };
  },

  components: {
    uploadProfile,
  },
};
</script>

