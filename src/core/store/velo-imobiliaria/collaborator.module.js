// actions
export const GET_COLLABORATOR = "getCollaborator";

// mutations
export const SET_COLLABORATOR = "setCollaborator";

const state = {
  collaborators: [],
};

const getters = {
  getCollaborator(state) {
    return state.collaborators;
  },
};

const actions = {
  [GET_COLLABORATOR](context, payload) {
    context.commit(SET_COLLABORATOR, payload);
  },
};

const mutations = {
  [SET_COLLABORATOR](state, payload) {
    state.collaborators = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
