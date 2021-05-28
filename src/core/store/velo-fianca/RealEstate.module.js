import {
    getRealEstateAll,
} from "@/core/service/core.service.js";

export const GET_VIEW_APPROVER_ESTATE = "getRealEstateAll";

// mutation types

export const SET_VIEW_APPROVER_ESTATE = "setViewApproverEstate";

const state = {
  viewApproverEstate: [],


};

const getters = {

  getRealEstateAll() {
    return state.viewApproverEstate
  }
};

const actions = {

[GET_VIEW_APPROVER_ESTATE](context) {
     getRealEstateAll().then(({ data }) => {
      context.commit(SET_VIEW_APPROVER_ESTATE, data.return);
    });
  },
 
};

const mutations = {
 
  [SET_VIEW_APPROVER_ESTATE](state, payload) {
    state.viewApproverEstate = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
