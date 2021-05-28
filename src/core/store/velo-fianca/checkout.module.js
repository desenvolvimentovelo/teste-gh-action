// action types
export const GET_REMOVE_ATTACHMENT = "getRemoveAttachment";
export const GET_RESPONSIBLE_DEFAULT = "getResponsibleDefault";
export const GET_VIEW_ATTACHMENT = "getViewAttachment";
export const GET_ATTACHMENT_CHECKOUT_END = "getAttachmentCheckoutEnd";
export const MOUNT_ATTACHMENT_CHECKOUT_END = "mountAttachmentCheckoutEnd";
export const RESET_VALUES_ATTACHMENT_CHECKOUT_END = "resetValuesCheckoutEnd";

// mutation types
export const SET_REMOVE_ATTACHMENT_CHECKOUT_END =
  "setRemoveAttachmentCheckoutend";
export const SET_RESPONSIBLE_DEFAULT = "setResponsibleDefault";
export const SET_VIEW_ATTACHMENT = "setViewAttachment";
export const SET_MOUNT_ATTACHMENT_CHECKOUT_END =
  "setMountAttachmentCheckoutEnd";
export const SET_ATTACHMENT_CHECKOUT_END = "setAttachmentCheckoutEnd";
export const SET_RESET_VALUES = "setResetValues";

const state = {
  attachmentsCheckoutEnd: [null, null],
  viewAttachments: {
    contractLocation: false,
    surveyLocation: false,
  },
  responsibleDefault: null,
};

const getters = {
  getAttachmentsCheckoutEnd(state) {
    return state.attachmentsCheckoutEnd;
  },
  getViewAttachments(state) {
    return state.viewAttachments;
  },
  getResponsibleDefault(state) {
    return state.responsibleDefault;
  },
};

const actions = {
  [MOUNT_ATTACHMENT_CHECKOUT_END](context, data) {
    context.commit(SET_MOUNT_ATTACHMENT_CHECKOUT_END, data);
  },
  [GET_ATTACHMENT_CHECKOUT_END](context, data) {
    context.commit(SET_ATTACHMENT_CHECKOUT_END, data);
  },
  [GET_REMOVE_ATTACHMENT](context, data) {
    context.commit(SET_REMOVE_ATTACHMENT_CHECKOUT_END, data);
  },
  [GET_VIEW_ATTACHMENT](context, data) {
    context.commit(SET_VIEW_ATTACHMENT, data);
  },
  [RESET_VALUES_ATTACHMENT_CHECKOUT_END](context) {
    context.commit(SET_RESET_VALUES);
  },
  [GET_RESPONSIBLE_DEFAULT](context, payload) {
    context.commit(SET_RESPONSIBLE_DEFAULT, payload);
  },
};

const mutations = {
  [SET_MOUNT_ATTACHMENT_CHECKOUT_END](state, item) {
    state.attachmentsCheckoutEnd[item.index] = item;

    if (item.index === 0) {
      state.viewAttachments = {
        ...state.viewAttachments,
        contractLocation: !state.viewAttachments.contractLocation,
      };
    } else if (item.index === 1) {
      state.viewAttachments = {
        ...state.viewAttachments,
        surveyLocation: !state.viewAttachments.surveyLocation,
      };
    }
  },
  [SET_RESET_VALUES](state) {
    state.attachmentsCheckoutEnd = [null, null];
    state.viewAttachments = {
      contractLocation: false,
      surveyLocation: false,
    };
  },
  [SET_ATTACHMENT_CHECKOUT_END](state, payload) {
    state.attachmentsCheckoutEnd = payload;
  },
  [SET_VIEW_ATTACHMENT](state, payload) {
    state.viewAttachments = payload;
  },
  [SET_RESPONSIBLE_DEFAULT](state, payload) {
    state.responsibleDefault = payload;
  },
  [SET_REMOVE_ATTACHMENT_CHECKOUT_END](state, { index }) {
    const arrTmp = Array.from(state.attachmentsCheckoutEnd);

    arrTmp.splice(index, 1, null);

    if (index === 0) {
      state.viewAttachments = {
        ...state.viewAttachments,
        contractLocation: !state.viewAttachments.contractLocation,
      };
    } else if (index === 1) {
      state.viewAttachments = {
        ...state.viewAttachments,
        surveyLocation: !state.viewAttachments.surveyLocation,
      };
    }

    state.attachmentsCheckoutEnd = arrTmp;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
