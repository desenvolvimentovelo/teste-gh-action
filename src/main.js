import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./routers";
import store from "@/core/store";
import vuetify from "@/plugins/vuetify";
import VueDayjs from "vue-dayjs-plugin";
import "./plugins/axios";
import "@/plugins/vuemask";
import "@/plugins/vmoney";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import dayjs from "dayjs";
import 'mapbox-gl/dist/mapbox-gl.css';

Vue.use(Toast);
Vue.config.productionTip = false;

Vue.use(VueDayjs);

Vue.filter("formatCurrency", function (value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
});

Vue.filter("formatDate", function (value) {
  return dayjs(value).format("DD/MM/YYYY");
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

