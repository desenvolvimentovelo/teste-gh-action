import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

const URL_VELO = process.env.VUE_APP_VELO_API_URL;
const URL_EASINGJOB = process.env.VUE_APP_EASINGJOB_API;
const URL_VIACEP = process.env.VUE_APP_VIACEP_API;

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
  },

  setToken() {
    let parms = new URL(window.location.href);
    if (parms.searchParams.get("token") !== null)
      localStorage.setItem("token", parms.searchParams.get("token"));

    return localStorage.getItem("token");
  },

  get(resource) {
    return Vue.axios
      .get(`${URL_VELO}/${resource}`, {
        params: {
          token: this.setToken(),
        },
      })
      .catch((err) => {
        console.log(
          "%cMyProject%cline:27%cerr",
          "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
          "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
          "color:#fff;background:rgb(248, 147, 29);padding:3px;border-radius:2px",
          err
        );
      });
  },

  getViaCEP(CEP) {
    return Vue.axios
      .get(`${URL_VIACEP}/${CEP}/json/`, {
        params: {
          token: this.setToken(),
        },
      })
      .catch((err) => {
        console.log(
          "%cMyProject%cline:45%cerr",
          "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
          "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
          "color:#fff;background:rgb(3, 38, 58);padding:3px;border-radius:2px",
          err
        );
      });
  },

  post(resource, params) {
    return Vue.axios
      .post(`${URL_VELO}/${resource}`, params, {
        params: {
          token: this.setToken(),
        },
      })
      .catch((err) => {
        console.log(
          "%cMyProject%cline:63%cerr",
          "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
          "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
          "color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px",
          err
        );
      });
  },

  postEasingJob(resource, params) {
    return Vue.axios
      .post(`${URL_EASINGJOB}/${resource}`, params, {
        params: {
          token: this.setToken(),
        },
      })
      .catch((err) => {
        console.log(
          "%cMyProject%cline:76%cerr",
          "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
          "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
          "color:#fff;background:rgb(17, 63, 61);padding:3px;border-radius:2px",
          err
        );
      });
  },

  put(resource, params) {
    return Vue.axios
      .put(`${URL_VELO}/${resource}`, params, {
        params: {
          token: this.setToken(),
        },
      })
      .catch((err) => {
        console.log(
          "%cMyProject%cline:89%cerr",
          "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
          "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
          "color:#fff;background:rgb(229, 187, 129);padding:3px;border-radius:2px",
          err
        );
      });
  },

  delete(resource, params) {
    return Vue.axios
      .delete(`${URL_VELO}/${resource}&token=${this.setToken()}`, params)
      .catch((err) => {
        console.log(
          "%cMyProject%cline:117%cerr",
          "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
          "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
          "color:#fff;background:rgb(39, 72, 98);padding:3px;border-radius:2px",
          err
        );
      });
  },
};

export default ApiService;
