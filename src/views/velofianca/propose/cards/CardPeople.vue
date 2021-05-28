<template>
  <div>
    <v-card
      outlined
      elevation="1"
      class="my-1 mx-lg-3 elevation-2 container-card"
      style="  
        width: 220px;
        min-height: 291px;
        height: 97% !important;
        border-radius: 12px;
        margin: auto !important;
      "
    >
      <v-card-actions class="d-flex justify-end">
        <DialogDeletePeople :person="person" :index="index" />
      </v-card-actions>

      <v-col align="center" class="pt-0 pb-8">
        <v-avatar size="100" class="mb-3">
          <img :src="person.img || getAvatarDefault(person.name)" />
        </v-avatar>

        <h5 style="color: #707070">{{ person.name }}</h5>

        <h5 class="grey--text font-weight-regular">
          {{ person.type }}
        </h5>

        <div class="pt-4">
          <DialogResponsavel
            :isEditModal="true"
            :person="person"
            :index="index"
          />
        </div>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import DialogResponsavel from "../dialogs/DialogResponsavel.vue";
import DialogDeletePeople from "../dialogs/DialogDeletePeople.vue";
import { getAvatarDefault } from "@/utils/utils.js";

export default {
  props: {
    person: {
      type: Object,
    },
    index: Number,
  },
  components: {
    DialogResponsavel,
    DialogDeletePeople,
  },

  methods: {
    getAvatarDefault,
  },

  data() {
    return {
      dialog: false,
    };
  },
};
</script>
