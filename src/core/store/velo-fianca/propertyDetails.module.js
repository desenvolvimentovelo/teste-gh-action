import { verifyTypeProperty } from "@/utils/utils.js";

// actions
export const GET_ADDRESS = "getAddress2";
export const GET_LOCALIZATION = "getLocalization";
export const GET_TYPES_PROPERTY = "getTypesProperty";
export const RESET_VALUES_DETAIL = "resetValues";

// mutations
export const SET_ADDRESS = "setAddress";
export const SET_LOCALIZATION = "setLocalization";
export const SET_TYPES_PROPERTY = "setTypesProperty";
export const SET_RESET_VALUES = "setResetValues";

const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

const state = {
  typesProperty:
    sessionStorageItem === null ||
    sessionStorageItem.listTypePropose === undefined
      ? verifyTypeProperty()
      : sessionStorageItem.listTypePropose,

  address:
    sessionStorageItem === null || sessionStorageItem.address === undefined
      ? {
          street: null,
          number: null,
          neighborhood: null,
          city: null,
          state: null,
          geolocation: "-47.16855131497132, -17.239525883340377",
        }
      : sessionStorageItem.address,

  localization:
    sessionStorageItem === null || sessionStorageItem.address === undefined
      ? [-47.16855131497132, -17.239525883340377]
      : sessionStorageItem.address.geolocation
          .split(",")
          .map((item) => Number(item)),
};

const getters = {
  getAddress(state) {
    return state.address;
  },
  getLocalization(state) {
    return state.localization;
  },
  getListTypesProperty(state) {
    return state.typesProperty;
  },
};

const actions = {
  [GET_ADDRESS](context, data) {
    context.commit(SET_ADDRESS, data);
  },
  [GET_LOCALIZATION](context, data) {
    context.commit(SET_LOCALIZATION, data);
  },
  [GET_TYPES_PROPERTY](context, payload) {
    context.commit(SET_TYPES_PROPERTY, payload);
  },
  [RESET_VALUES_DETAIL](context) {
    context.commit(SET_RESET_VALUES);
  },
};

const mutations = {
  async [SET_ADDRESS](state, payload) {
    state.address = payload;

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        address: {
          ...payload,
          geolocation: String(payload.geolocation),
        },
      })
    );
  },
  [SET_LOCALIZATION](state, payload) {
    state.localization = payload;
  },
  [SET_TYPES_PROPERTY](state, payload) {
    state.typesProperty = payload;
  },
  [SET_RESET_VALUES](state) {
    state.address = null;
    state.localization = [-47.16855131497132, -17.239525883340377];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
