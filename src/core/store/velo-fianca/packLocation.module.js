import ApiService from "@/core/service/api.service";
import { unformatString } from "@/utils/utils.js";

// action types
export const GET_ACTIVATOR_ITEM_ACTIVE = "getActivatorItemActive";
export const GET_PERCENTAGE_PLAN = "getPercentagePlan";
export const GET_VALUE_ACTIVATOR = "getValueActivator";
export const GET_REALTOR_ADMIN = "getRealtorAdmin";
export const GET_LIST_REALTORS = "getListRealtors";
export const GET_NEW_TYPES_PACK_LOCATION = "getNewTypesPackLocation";
export const GET_PLANS = "getPlans";
export const GET_ITENS_PACKAGE = "getItensTypePackage";
export const GET_TOTAL_VALUE = "getTotalValue";
export const GET_LOCATIONS = "getLocations";
export const ADD_LOCATIONS = "addLocations";
export const RESET_VALUES_LOCATION = "resetValues";

// mutation types
export const SET_ACTIVATOR_ITEM_ACTIVE = "setActivatorItemActive";
export const SET_PERCENTAGE_PLAN = "setPercentagePlan";
export const SET_VALUE_ACTIVATOR = "setValueActivator";
export const SET_REALTOR_ADMIN = "setRealtorAdmin";
export const SET_LIST_REALTORS = "setListRealtors";
export const SET_NEW_TYPES_PACK_LOCATION = "setNewTypesPackLocation";
export const SET_PLANS = "setPlans";
export const SET_ITENS_PACKAGE = "setItensTypePackage";
export const SET_TOTAL_VALUE = "setTotalValue";
export const SET_ADD_LOCATIONS = "setAddLocations";
export const SET_LOCATIONS = "setLocations";
export const SET_RESET_VALUES = "setResetValues";

const state = {
  itensTypePackage:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).itensTypePackage === undefined
      ? []
      : JSON.parse(sessionStorage.getItem("data")).itensTypePackage,
  vlTotal:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).vlTotal === undefined
      ? "R$ 0,00"
      : JSON.parse(sessionStorage.getItem("data")).vlTotal,
  vlTotalAfiancamento:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).vlTotalAfiancamento === undefined
      ? "R$ 0,00"
      : JSON.parse(sessionStorage.getItem("data")).vlTotalAfiancamento,
  packageLocations:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).packageLocations === undefined
      ? []
      : JSON.parse(sessionStorage.getItem("data")).packageLocations,
  plans:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).plans === undefined
      ? []
      : JSON.parse(sessionStorage.getItem("data")).plans,
  realtors:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).realtorInfos === undefined
      ? []
      : JSON.parse(sessionStorage.getItem("data")).realtorInfos.list,
  realtorActive:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).realtorInfos === undefined
      ? []
      : JSON.parse(sessionStorage.getItem("data")).realtorInfos.active,
  valueActivator:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).objectPropose === undefined ||
    JSON.parse(sessionStorage.getItem("data")).objectPropose.activatorValue ===
      undefined
      ? 0
      : JSON.parse(sessionStorage.getItem("data")).objectPropose.activatorValue,
  activatorItemActive:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).objectPropose === undefined ||
    JSON.parse(sessionStorage.getItem("data")).objectPropose.activator ===
      undefined
      ? ""
      : JSON.parse(sessionStorage.getItem("data")).objectPropose.activator,
  percentagePlan:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).percentagePlan === undefined
      ? 0
      : JSON.parse(sessionStorage.getItem("data")).percentagePlan,
};

const getters = {
  getItensTypePackage(state) {
    return state.itensTypePackage;
  },
  getVlTotal(state) {
    return state.vlTotal;
  },
  getPackageLocations(state) {
    return state.packageLocations;
  },
  getPlans(state) {
    return state.plans;
  },
  getListRealtors(state) {
    return state.realtors;
  },
  getActiveRealtor(state) {
    return state.realtorActive;
  },
  getValueActivator(state) {
    return state.valueActivator;
  },
  getPercentagePlan(state) {
    return state.percentagePlan;
  },
  getVlTotalAfiancamento(state) {
    return state.vlTotalAfiancamento;
  },
  getActivatorItemActive(state) {
    return state.activatorItemActive;
  },
};

const actions = {
  [GET_NEW_TYPES_PACK_LOCATION](context, payload) {
    context.commit(SET_NEW_TYPES_PACK_LOCATION, payload);
  },
  [GET_ITENS_PACKAGE](context, payload) {
    context.commit(SET_ITENS_PACKAGE, payload);
  },
  [GET_TOTAL_VALUE](context) {
    context.commit(SET_TOTAL_VALUE);
  },
  [ADD_LOCATIONS](context, data) {
    context.commit(SET_ADD_LOCATIONS, data);
  },
  [GET_LOCATIONS](context, payload) {
    context.commit(SET_LOCATIONS, payload);
  },
  [GET_PLANS](context) {
    ApiService.get("fiancavelo/api/activator.php")
      .then(({ data }) => context.commit(SET_PLANS, data.return))
      .catch(() => []);
  },
  [RESET_VALUES_LOCATION](context) {
    context.commit(SET_RESET_VALUES);
  },
  [GET_LIST_REALTORS](context, payload) {
    context.commit(SET_LIST_REALTORS, payload);
  },
  [GET_REALTOR_ADMIN](context, payload) {
    context.commit(SET_REALTOR_ADMIN, payload);
  },
  [GET_VALUE_ACTIVATOR](context, payload) {
    context.commit(SET_VALUE_ACTIVATOR, payload);
  },
  [GET_PERCENTAGE_PLAN](context, payload) {
    context.commit(SET_PERCENTAGE_PLAN, payload);
  },
  [GET_ACTIVATOR_ITEM_ACTIVE](context, payload) {
    context.commit(SET_ACTIVATOR_ITEM_ACTIVE, payload);
  },
};

const mutations = {
  [SET_ITENS_PACKAGE](state, payload) {
    state.itensTypePackage = payload;

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        itensTypePackage: payload,
      })
    );
  },
  [SET_TOTAL_VALUE](state) {
    if (state.packageLocations.length > 0) {
      const unformatteds = state.packageLocations.map((item) =>
        unformatString(item.value, "pt-BR")
      );

      const sumTotal = unformatteds.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );

      const sumPercentagePlan = (
        (sumTotal * state.percentagePlan) /
        100
      ).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      state.vlTotal = sumTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      state.vlTotalAfiancamento = sumPercentagePlan.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else {
      state.vlTotal = "R$ 0,00";
      state.vlTotalAfiancamento = "R$ 0,00";
    }

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        vlTotal: state.vlTotal,
        vlTotalAfiancamento: state.vlTotalAfiancamento,
      })
    );
  },
  [SET_ADD_LOCATIONS](state, payload) {
    state.packageLocations.push(payload);
  },
  [SET_LOCATIONS](state, payload) {
    state.packageLocations = payload;
  },
  [SET_PLANS](state, payload) {
    state.plans = payload;

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        plans: payload,
      })
    );
  },
  [SET_RESET_VALUES](state) {
    state.packageLocations = [];
    state.itensTypePackage = [];
    state.vlTotal = "R$ 0,00";
    state.valueActivator = 0;
    state.vlTotalAfiancamento = "R$ 0,00";
    state.activatorItemActive = "";
  },
  [SET_LIST_REALTORS](state, payload) {
    state.realtors = payload;
  },
  [SET_REALTOR_ADMIN](state, payload) {
    state.realtorActive = payload;

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        realtorInfos: {
          ...JSON.parse(sessionStorage.getItem("data")).realtorInfos,
          active: payload,
        },
      })
    );
  },

  [SET_NEW_TYPES_PACK_LOCATION](state, payload) {
    state.itensTypePackage = payload.map(({ id, name }) => ({
      value: {
        id,
        name,
      },
    }));

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        itensTypePackage: state.itensTypePackage,
      })
    );
  },
  [SET_VALUE_ACTIVATOR](state, payload) {
    state.valueActivator = payload;

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        objectPropose: {
          ...JSON.parse(sessionStorage.getItem("data")).objectPropose,
          activatorValue: payload,
        },
      })
    );
  },
  [SET_PERCENTAGE_PLAN](state, payload) {
    state.percentagePlan = payload;

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        percentagePlan: payload,
      })
    );
  },
  [SET_ACTIVATOR_ITEM_ACTIVE](state, payload) {
    state.activatorItemActive = String(payload);

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        objectPropose: {
          ...JSON.parse(sessionStorage.getItem("data")).objectPropose,
          activator: String(payload),
        },
      })
    );
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
