// action types
export const GET_ATTACHMENT = "getAttachment";
export const ADD_ATTACHMENT = "addAttachment";
export const REMOVE_ATTACHMENT = "removeAttachment";
export const RESET_VALUES_ATTACHMENT = "resetValues";

// mutation types
export const SET_ATTACHMENT = "setAttachment";
export const SET_ADD_ATTACHMENT = "setAddAttachment";
export const SET_REMOVE_ATTACHMENT = "setRemoveAttachment";
export const SET_RESET_VALUES = "setResetValues";

const state = {
  attachments:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).propertydocuments === undefined
      ? []
      : JSON.parse(sessionStorage.getItem("data")).propertydocuments,
};

const getters = {
  getAttachments(state) {
    return state.attachments;
  },
};

const actions = {
  [GET_ATTACHMENT](context, data) {
    context.commit(SET_ATTACHMENT, data);
  },
  [ADD_ATTACHMENT](context, data) {
    context.commit(SET_ADD_ATTACHMENT, data);
  },
  [REMOVE_ATTACHMENT](context, data) {
    context.commit(SET_REMOVE_ATTACHMENT, data);
  },
  [RESET_VALUES_ATTACHMENT](context) {
    context.commit(SET_RESET_VALUES);
  },
};

const mutations = {
  [SET_ADD_ATTACHMENT](state, payload) {
    state.attachments.push(payload);

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        propertydocuments: state.attachments,
      })
    );
  },
  [SET_REMOVE_ATTACHMENT](state, payload) {
    state.attachments = state.attachments.filter(({ id }) => id != payload.id);

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        propertydocuments: state.attachments,
      })
    );
  },
  [SET_ATTACHMENT](state, payload) {
    state.attachments = payload;
  },
  [SET_RESET_VALUES](state) {
    state.attachments = [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
