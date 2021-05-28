import {
  getViewProposeactive,
  getAllFiancaStatus,
} from "@/core/service/core.service.js";

// action types
export const GET_FILTER_FIANCA_DATE = "getFilterDate";
export const GET_STATE_FILTER_FIANCA = "getStateFilter";
export const GET_FIANCA_STATUS = "getFiancaStatus";
export const GET_VIEW_PROPOSE_ACTIVE = "getViewProposeactive";

export const GET_INFO_FIANCA = "getInfoFianca";

// mutation types
export const SET_INFO_FIANCA = "setInfoFianca";
export const SET_FILTER_DATE_FIANCA = "setFilterDate";
export const SET_STATE_FILTER = "setStateFilter";
export const SET_FIANCA_STATUS = "setFiancaStatus";
export const SET_VIEW_PROPOSE_ACTIVE = "setViewProposeActive";

const state = {
  viewProposesactive: [],
  filteredFianca: [],
  filterActivated: false,
  fiancaStatus: ["Todos", "Regular", "Conferência", "Ocorrência", "Cancelada"],
  proposes: [],
  infoFianca: [],
  loadingInfosFianca: true,
  allProposes: [],
};

const getters = {
  getFilteredFianca(state) {
    return state.filteredFianca;
  },
  getInfoFianca(state) {
    return state.infoFianca;
  },
  getFiancaStatus(state) {
    return state.fiancaStatus;
  },
  getLoadingInfosFianca(state) {
    return state.loadingInfosFianca;
  },
  getViewProposeactive() {
    return state.viewProposesactive;
  },
};

const actions = {
  [GET_FILTER_FIANCA_DATE](context, data) {
    context.commit(SET_FILTER_DATE_FIANCA, data);
  },

  [GET_STATE_FILTER_FIANCA](context, boolean) {
    context.commit(SET_STATE_FILTER, boolean);
  },
  [GET_FIANCA_STATUS](context) {
    getAllFiancaStatus().then(({ data }) => {
      context.commit(SET_FIANCA_STATUS, data.return);
    });
  },

  [GET_VIEW_PROPOSE_ACTIVE](context) {
    getViewProposeactive().then(({ data }) => {
      context.commit(SET_VIEW_PROPOSE_ACTIVE, data.return);
      context.commit(SET_INFO_FIANCA, data.return);
    });
  },

  [GET_INFO_FIANCA](context, data) {
    // context.commit(SET_INFO_FIANCA, data.return);
    
  },
};

const mutations = {
  [SET_FILTER_DATE_FIANCA](state, payload) {
    state.viewProposesactive = payload;
  },
  [SET_STATE_FILTER](state, boolean) {
    state.filterActivated = boolean;
  },
  [SET_FIANCA_STATUS](state, payload) {
    let result = payload.map(({ name }) => name);

    state.fiancaStatus = result;
  },

  [SET_VIEW_PROPOSE_ACTIVE](state, payload) {
    state.viewProposesactive = payload;
    state.filteredFianca = payload;
  },
  [SET_INFO_FIANCA](state, payload) {
    let formatData = [{ statusname: "Todos" }, ...payload];

    let result = state.fiancaStatus.map((item) => {
      let totStatusSpecific = formatData.filter(
        ({ statusname }) => statusname.toUpperCase() === item.toUpperCase()
      );
      if (totStatusSpecific.length > 0) {
        switch (item.toUpperCase()) {
          case "REGULAR":
            return {
              total: totStatusSpecific.length,
              statusname: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              color: "#40b540",
            };

          case "OCORRÊNCIA":
            return {
              statusname: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              total: totStatusSpecific.length,
              color: "#567e0c8f",
            };

          case "CONFERÊNCIA":
            return {
              statusname: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              total: totStatusSpecific.length,
              color: "#12a0f3",
            };
          case "CANCELADA":
            return {
              total: totStatusSpecific.length,
              statusname: item,
              percentage:
                (Number(totStatusSpecific.length) / Number(payload.length)) *
                100,
              color: "#f30000  ",
            };

          case "TODOS":
            return {
              statusname: item,
              percentage: payload / 100,
              total: payload.length,
              color: "#666",
            };
          default:
            throw new TypeError(
              `O status ${item} não existe como uma opção no switch!`,
              "fianca.module.js"
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

    state.infoFianca = result;

    state.loadingInfosFianca = false;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
