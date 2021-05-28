<template>
  <v-app>
    <AppBar />
    <Drawer />
  </v-app>
</template>

<script>
export default {
  name: "Index",
  components: {
    AppBar: () => import("@/templates/Header.vue"),
    Drawer: () => import("@/templates/Sidebar.vue"),
  },
};
</script>

<style></style>
