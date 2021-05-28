import ApiService from "@/core/service/api.service";
import { newHashToken } from "@/utils/utils.js";

// ACTIONS
export const GET_CREATE_PROPOSE = "getCreatePropose";
export const GET_SIDEBAR = "getSidebar";
export const GET_TOT_STEPS = "getTotSteps";
export const GET_LOADING = "getLoading";
export const RESET_OBJECT_PROPOSE = "resetObjectPropose";
export const GET_OBJECT_PROPOSE = "getObjectPropose";
export const GET_SIGN_LINK = "getSignLink";
export const GET_RANDOM_HASH = "getRandomHash";
export const GET_HANDLE_STEP = "getHandleStep";
export const GET_PROPOSE_TYPE = "getProposeType";

// MUTATIONS
export const SET_CREATE_PROPOSE = "setCreatePropose";
export const SET_SIDEBAR = "setSidebar";
export const SET_TOT_STEPS = "setTotSteps";
export const SET_LOADING = "setLoading";
export const SET_RESET_OBJECT_PROPOSE = "setResetObjectPropose";
export const SET_OBJECT_PROPOSE = "setObjectPropose";
export const SET_RANDOM_HASH = "setRandomHash";
export const SET_HANDLE_STEP = "setHandleStep";
export const SET_PROPOSE_TYPE = "setProposeType";
export const SET_SIGN_LINK = "setSignLink";

const state = {
  stateSidebar: true,
  HashToken: "",
  indexStepper: 3,
  progressWidth: 15,
  errors: null,
  plans: [],
  proposeType: [],
  documentLink: null,
  totSteps: 0,
  currentStep: 0,
  loading: false,
  allStates: [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RO",
    "RS",
    "RR",
    "SC",
    "SE",
    "SP",
    "TO",
  ],

  objPropose:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).objectPropose === undefined
      ? {
          id: null,
          idtype: null,
          status: null,
          step: null,
          activator: null,
          externalref: null,
          hash: null,
          active: null,
        }
      : JSON.parse(sessionStorage.getItem("data")).objectPropose,
};

const getters = {
  getRandomHash(state) {
    return state.HashToken;
  },
  getProposeType() {
    return state.proposeType;
  },
  getIndexStepper(state) {
    return state.indexStepper;
  },
  getProgressWidth(state) {
    return state.progressWidth;
  },
  getActualyPropose(state) {
    return state.objPropose;
  },
  getTotSteps(state) {
    return state.totSteps;
  },
  getCurrentStep(state) {
    return state.currentStep;
  },
  getDocumentLink(state) {
    return state.documentLink;
  },
  getLoading(state) {
    return state.loading;
  },
  getAllStates(state) {
    return state.allStates;
  },
  getStateSidebar(state) {
    return state.stateSidebar;
  },
};

const actions = {
  [GET_PROPOSE_TYPE](context) {
    ApiService.get(
      "fiancavelo/api/proposetype.php?order=`order`&ordination=asc"
    ).then(({ data }) => {
      context.commit(SET_PROPOSE_TYPE, data.return);
    });
  },
  [GET_LOADING](context, payload) {
    context.commit(SET_LOADING, payload);
  },
  [GET_HANDLE_STEP](context, data) {
    context.commit(SET_HANDLE_STEP, data);
  },
  [GET_RANDOM_HASH](context) {
    let hash = newHashToken();

    ApiService.post("fiancavelo/api/proposedocument.php", {
      type: 1,
      propose: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
      link: `${process.env.VUE_APP_VELO_API_URL}/velosign/viewdoc.html?document=${hash}`,
    });

    context.commit(SET_RANDOM_HASH, hash);
  },
  [GET_TOT_STEPS](context, data) {
    context.commit(SET_TOT_STEPS, data);
  },
  async [GET_SIGN_LINK](context, params) {
    await ApiService.get(
      `fiancavelo/api/proposedocument.php?where=propose&value=${params.propose}`
    ).then(({ data }) => {
      context.commit(SET_SIGN_LINK, data.return);
    });
  },
  [GET_OBJECT_PROPOSE](context, payload) {
    context.commit(SET_OBJECT_PROPOSE, payload);
  },
  [RESET_OBJECT_PROPOSE](context) {
    context.commit(SET_RESET_OBJECT_PROPOSE);
  },
  [GET_SIDEBAR](context, payload) {
    context.commit(SET_SIDEBAR, payload);
  },
};

const mutations = {
  [SET_HANDLE_STEP](state, step) {
    state.progressWidth = Math.round((100 / state.totSteps) * step);
    state.currentStep = step;
  },
  [SET_PROPOSE_TYPE](state, payload) {
    state.proposeType = payload;
  },
  [SET_RANDOM_HASH](state, payload) {
    state.HashToken = payload;
  },
  [SET_SIGN_LINK](state, payload) {
    state.documentLink = payload;
  },
  [SET_OBJECT_PROPOSE](state, payload) {
    state.objPropose = payload;
  },
  [SET_LOADING](state, payload) {
    state.loading = payload;
  },
  [SET_RESET_OBJECT_PROPOSE](state) {
    state.objPropose = {
      id: null,
      idtype: null,
      status: null,
      step: null,
      activator: null,
      externalref: null,
      active: null,
    };
  },
  [SET_TOT_STEPS](state, payload) {
    state.totSteps = payload;
  },
  [SET_SIDEBAR](state, payload) {
    state.stateSidebar = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
