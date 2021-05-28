// actions
export const GET_REDIRECT = "getRedirect";
export const GET_ITENS_BREADCRUMB = "getItensBreadcrumb";
export const VIEW_PAGE = "viewPage";
export const GET_REALESTATE = "getRealEstate";
export const GET_LOCALIZATION = "getLocalization";

// mutations
export const SET_REDIRECT = "setRedirect";
export const SET_ITENS_BREADCRUMB = "setItensBreadcrumb";
export const SET_VIEW_PAGE = "setViewPage";
export const SET_REALESTATE = "setRealEstate";
export const SET_LOCALIZATION = "setLocalization";

const state = {
  viewPage: 1,
  itemsBreadcrumb: [
    {
      text: "Dados da imobiliária",
      disabled: true,
      to: "/",
    },
  ],
  realEstateData: {},
  localizationData: {},
  redirect:
    sessionStorage.getItem("redirect") === null
      ? false
      : sessionStorage.getItem("redirect"),
};

const getters = {
  getViewPage(state) {
    return state.viewPage;
  },
  getItemsBreadcrumb(state) {
    return state.itemsBreadcrumb;
  },
  getRealEstateData(state) {
    return state.realEstateData;
  },
  getLocalizationData(state) {
    return state.localizationData;
  },
  getRedirect(state) {
    return state.redirect;
  },
};

const actions = {
  [VIEW_PAGE](context, payload) {
    context.commit(SET_VIEW_PAGE, payload);
  },
  [GET_REALESTATE](context, payload) {
    context.commit(SET_REALESTATE, payload);
  },
  [GET_LOCALIZATION](context, payload) {
    context.commit(SET_LOCALIZATION, payload);
  },
  [GET_ITENS_BREADCRUMB](context, payload) {
    context.commit(SET_ITENS_BREADCRUMB, payload);
  },
  [GET_REDIRECT](context, payload) {
    context.commit(SET_REDIRECT, payload);
  },
};

const mutations = {
  [SET_VIEW_PAGE](state, payload) {
    state.viewPage = payload;

    if (state.redirect) {
      if (state.viewPage === 1) {
        state.itemsBreadcrumb = [
          {
            text: "Imobiliárias",
            disabled: false,
            to: "/imobiliarias",
          },
          {
            text: "Dados da imobiliária",
            disabled: true,
            to: "/",
          },
        ];
      } else {
        state.itemsBreadcrumb = [
          {
            text: "Imobiliárias",
            disabled: false,
            to: "/imobiliarias",
          },
          {
            text: "Dados da imobiliária",
            disabled: false,
            to: "/registro-imobiliaria",
          },
          {
            text: "Detalhes da localização",
            disabled: true,
            to: "/",
          },
        ];
      }
    } else {
      if (state.viewPage === 1) {
        state.itemsBreadcrumb = [
          {
            text: "Dados da imobiliária",
            disabled: true,
            to: "/",
          },
        ];
      } else {
        state.itemsBreadcrumb = [
          {
            text: "Dados da imobiliária",
            disabled: false,
            to: "/registro-imobiliaria",
          },
          {
            text: "Detalhes da localização",
            disabled: true,
            to: "/",
          },
        ];
      }
    }
  },
  [SET_REALESTATE](state, payload) {
    state.realEstateData = payload;
  },
  [SET_LOCALIZATION](state, payload) {
    state.localizationData = payload;
  },
  [SET_ITENS_BREADCRUMB](state, payload) {
    state.itemsBreadcrumb = payload;
  },
  [SET_REDIRECT](state, payload) {
    state.redirect = payload;

    sessionStorage.setItem("redirect", payload);
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
