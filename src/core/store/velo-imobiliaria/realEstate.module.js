// actions
export const GET_LIST_REALESTATE = "getListRealestate";

// mutations
export const SET_LIST_REALESTATE = "setListRealestate";

const state = {
  listRealestates: []
};

const getters = {
  getListRealestates(state) {
    return state.listRealestates;
  }
};

const actions = {
  [GET_LIST_REALESTATE](context, payload) {
    context.commit(SET_LIST_REALESTATE, payload);
  }
};

const mutations = {
  [SET_LIST_REALESTATE](state, payload) {
    state.listRealestates = payload;
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};
