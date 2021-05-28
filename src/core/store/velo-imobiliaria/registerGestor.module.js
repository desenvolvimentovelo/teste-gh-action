// actions
export const GET_VIEW_CARD = "getViewCard";

// mutations
export const SET_VIEW_CARD = "setViewCard";

const state = {
  activeCard: 1,
  idPerson: "",
  email: "",
  itemsBreadcrumbRegisterGestor: [
    {
      text: "Registro de usuário",
      disabled: true,
      to: "/",
    },
  ],
};

const getters = {
  getActiveCard(state) {
    return state.activeCard;
  },
  getEmail(state) {
    return state.email;
  },
  getItemsBreadcrumbRegisterGestor(state) {
    return state.itemsBreadcrumbRegisterGestor;
  },
  getIdPerson(state) {
    return state.idPerson;
  },
};

const actions = {
  [GET_VIEW_CARD](context, payload) {
    context.commit(SET_VIEW_CARD, payload);
  },
};

const mutations = {
  [SET_VIEW_CARD](state, payload) {
    const { idPerson, email, viewNumberCard } = payload;

    state.idPerson = idPerson;
    state.activeCard = viewNumberCard;
    state.email = email;

    if (viewNumberCard == 2) {
      state.itemsBreadcrumbRegisterGestor.push({
        text: "Confirmar email",
        disabled: true,
      });
    }
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
