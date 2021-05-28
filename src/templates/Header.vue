<template>
  <v-app-bar flat app absolute color="white">
    <v-col class="pa-0 mr-auto">
      <v-app-bar-nav-icon @click="changeStateSidebar()"></v-app-bar-nav-icon>
    </v-col>

    <v-col class="pa-0 d-flex align-center justify-end">
      <div style="width: 50px" class="d-flex justify-center align-center">
        <v-btn icon>
          <v-badge medium :content="messages" :value="messages" color="red" overlap>
            <v-icon medium> mdi-bell </v-icon>
          </v-badge>
        </v-btn>
      </div>

      <v-avatar class="ml-3" width="40px" height="40px">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
    </v-col>
  </v-app-bar>
</template>

<script>
import { GET_SIDEBAR } from "@/core/store/core.module.js";
import { mapGetters } from "vuex";

export default {
  name: "AppBar",
  computed: {
    ...mapGetters(["getStateSidebar"]),
  },
  data() {
    return {
      messages: 2,
      show: true,
    };
  },
  methods: {
    changeStateSidebar() {
      this.$store.dispatch(GET_SIDEBAR, !this.getStateSidebar);
    },
  },
};
</script>
