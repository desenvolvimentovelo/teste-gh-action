<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  mounted() {
    let parms = new URL(window.location.href);
    if (parms.searchParams.get("token") !== null)
      localStorage.setItem("token", parms.searchParams.get("token"));
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/_global.scss";

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(128, 128, 128, 0.822);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #b3b3b3;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7a7a7a;
}
</style>
