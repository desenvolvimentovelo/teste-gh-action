import {
  getAllProposeStatus,
} from "@/core/service/core.service.js";

// action types
export const HANDLE_ACTIVATOR = "handleActivator";
export const GET_FILTER_DATE = "getFilterDate";
export const GET_STATE_FILTER = "getStateFilter";
export const GET_PROPOSE_STATUS = "getProposeStatus";
export const GET_VIEW_PROPOSE = "getViewPropose";

export const ADD_PROPOSE = "addPropose";
export const REMOVE_PROPOSE = "removePropose";
export const GET_INFO_PROPOSE = "getInfoPropose";

// mutation types
export const SET_INFO_PROPOSE = "setInfoPropose";
export const SET_HANDLE_ACTIVATOR = "setHandleActivator";
export const SET_FILTER_DATE = "setFilterDate";
export const SET_STATE_FILTER = "setStateFilter";
export const SET_PROPOSE_STATUS = "setProposeStatus";
export const SET_VIEW_PROPOSE = "setViewPropose";
export const SET_PROPOSE = "setPropose";

const state = {
  viewProposes: [],
  viewProposesactive: [],
  filteredProposes: [],
  filterActivated: false,
  proposeStatus: [
    "Todos",
    "Iniciada",
    "Aguardando Documentos",
    "Em avaliação",
    "Reprovado",
    "Em assinatura",
    "Pagamento",
    "Ativada",
    "Afiançado",
    "Cancelada",
  ],
  proposes: [],
  activator:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).objectPropose === undefined
      ? null
      : JSON.parse(sessionStorage.getItem("data")).objectPropose.activator,
  infoPropose: [],
  loadingInfos: true,
  allProposes: [],
};

const getters = {
  getViewPropose(state) {
    return state.viewProposes;
  },
  getFilter(state) {
    return state.filterActivated;
  },
  getFilteredProposes(state) {
    return state.filteredProposes;
  },
  getProposeStatus(state) {
    return state.proposeStatus;
  },
  getActivator(state) {
    return state.activator;
  },
  getInfoPropose(state) {
    return state.infoPropose;
  },
  getLoadingInfos(state) {
    return state.loadingInfos;
  },

  getAllProposesState(state) {
    return state.allProposes;
  },
};

const actions = {
  async [ADD_PROPOSE](context, data) {
    context.commit(SET_PROPOSE, data);
  },
  [REMOVE_PROPOSE](context, id) {
    let removeItem = context.state.allProposes.map((item) => {
      if (item.id != id) {
        return item;
      }
    });

    let removeUndefined = removeItem.filter((item) => item !== undefined);

    context.commit(SET_INFO_PROPOSE, removeUndefined);
    context.commit(SET_VIEW_PROPOSE, removeUndefined);
  },
  [GET_FILTER_DATE](context, data) {
    context.commit(SET_FILTER_DATE, data);
  },
  [GET_STATE_FILTER](context, boolean) {
    context.commit(SET_STATE_FILTER, boolean);
  },
  [GET_PROPOSE_STATUS](context) {
    getAllProposeStatus().then(({ data }) => {
      context.commit(SET_PROPOSE_STATUS, data.return);
    });
  },
  [GET_VIEW_PROPOSE](context, payload) {
    context.commit(SET_VIEW_PROPOSE, payload);
    context.commit(SET_INFO_PROPOSE, payload);
  },

  [HANDLE_ACTIVATOR](context, payload) {
    context.commit(SET_HANDLE_ACTIVATOR, payload);
  },
  [GET_INFO_PROPOSE](context, payload) {
    context.commit(SET_INFO_PROPOSE, payload);
  },
};

const mutations = {
  [SET_FILTER_DATE](state, payload) {
    state.viewProposes = payload;
    state.viewProposesactive = payload;
  },
  [SET_STATE_FILTER](state, boolean) {
    state.filterActivated = boolean;
  },
  [SET_PROPOSE_STATUS](state, payload) {
    let result = payload.map(({ name }) => name);

    state.proposeStatus = result;
  },
  [SET_VIEW_PROPOSE](state, payload) {
    state.viewProposes = payload;
    state.viewProposesactive = payload;
    state.allProposes = payload;
    state.filteredProposes = payload;
  },

  [SET_PROPOSE](state, payload) {
    state.proposes.push(payload);
  },
  [SET_HANDLE_ACTIVATOR](state, payload) {
    state.activator = payload;

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        objectPropose: {
          ...JSON.parse(sessionStorage.getItem("data")).objectPropose,
          activator: payload,
        },
      })
    );
  },
  [SET_INFO_PROPOSE](state, payload) {
    let formatData = [...payload, { status: "Todos" }];

    let result = state.proposeStatus.map((item) => {
      let totStatusSpecific = formatData.filter(
        ({ status }) => status === item
      );

      if (totStatusSpecific.length > 0) {
        switch (item.toUpperCase()) {
          case "TODOS":
            return {
              statusName: item,
              percentage: payload / 100,
              total: payload.length,
              color: "#666",
            };

          case "AGUARDANDO DOCUMENTOS":
            return {
              total: totStatusSpecific.length,
              statusName: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              color: "#172e96",
            };

          case "EM AVALIAÇÃO":
            return {
              statusName: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              total: totStatusSpecific.length,
              color: "#c2ce1b",
            };

          case "PAGAMENTO":
            return {
              statusName: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              total: totStatusSpecific.length,
              color: "#9b3ee7",
            };

          case "REPROVADO":
            return {
              statusName: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              total: totStatusSpecific.length,
              color: "#f36c33",
            };

          case "ATIVADA":
            return {
              statusName: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              total: totStatusSpecific.length,
              color: "#36a2eb",
            };

          case "EM ASSINATURA":
            return {
              statusName: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              total: totStatusSpecific.length,
              color: "#bb840e",
            };

          case "INICIADA":
            return {
              statusName: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              total: totStatusSpecific.length,
              color: "#ff00c3",
            };

          case "AFIANÇADO":
            return {
              total: totStatusSpecific.length,
              statusName: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              color: "#40b540",
            };

          case "CANCELADA":
            return {
              total: totStatusSpecific.length,
              statusName: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              color: "#f30000",
            };

          default:
            throw new TypeError(
              `O status ${status} não existe como uma opção no switch!`,
              "propose.module.js"
            );
        }
      } else {
        return {
          statusName: item,
          percentage: 0,
          total: 0,
          color: "primary",
        };
      }
    });

    state.infoPropose = result;

    state.loadingInfos = false;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
