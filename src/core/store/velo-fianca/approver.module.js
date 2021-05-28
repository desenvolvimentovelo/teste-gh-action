import {
  getViewAprovespending,
} from "@/core/service/core.service.js";

export const GET_VIEW_APPROVER = "getViewAprovespending";

// mutation types
export const SET_VIEW_APPROVER = "setViewApprover";

const state = {
  viewApprover: []
};

const getters = {
  getViewAprovespending() {
    return state.viewApprover
  }
};

const actions = {
  [GET_VIEW_APPROVER](context) {
    getViewAprovespending().then(({ data }) => {
      context.commit(SET_VIEW_APPROVER, data.return);
    });
  },

};

const mutations = {
  [SET_VIEW_APPROVER](state, payload) {
    state.viewApprover = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
