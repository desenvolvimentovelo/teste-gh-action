<template>
  <v-navigation-drawer
    app
    absolute
    :mini-variant="getStateSidebar"
    permanent
    style="height: 100%"
  >
    <v-list-item>
      <div class="mr-auto d-flex">
        <img
          src="@/assets/images/part1.png"
          width="30px"
          class="mr-auto"
          alt="logo velo"
        />

        <img
          src="@/assets/images/part2.png"
          width="80px"
          class="mr-auto"
          alt="logo velo"
          v-if="!getStateSidebar"
        />
      </div>

      <v-btn icon @click="changeStateSidebar()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list rounded dense>
      <v-list-item v-for="item in items" :key="item.title" link class="px-2">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_SIDEBAR } from "@/core/store/core.module.js";

export default {
  name: "Drawer",
  computed: {
    ...mapGetters(["getStateSidebar"]),
  },
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      mini: true,
      logo1: this.getStateSidebar,
    };
  },
  methods: {
    changeStateSidebar() {
      this.$store.dispatch(GET_SIDEBAR, !this.getStateSidebar);
    },
  },
};
</script>
