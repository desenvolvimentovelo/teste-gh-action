import ApiService from "@/core/service/api.service";
import { CapitalizeString } from "@/utils/utils.js";
import { organizePersons } from "@/utils/utils";

// actions
export const GET_PERSONS = "getPersons";
export const ADD_PERSONS = "addPersons";
export const GET_VERIFY_EXIST_RESPONSIBLE = "getVerifyExistResponsible";
export const EDIT_PERSONS = "editPersons";
export const GET_PERSON_TYPE = "getPersonType";
export const REMOVE_PERSONS = "removePersons";
export const RESET_VALUES_TENANT = "resetValues";

// mutations
export const SET_PERSONS = "setPersons";
export const SET_ADD_PERSONS = "setAddPersons";
export const SET_VERIFY_EXIST_RESPONSIBLE = "setVerifyExistResponsible";
export const SET_EDIT_PERSONS = "setEditPersons";
export const SET_PERSON_TYPE = "setPersonType";
export const SET_REMOVE_PERSONS = "setRemovePersons";
export const SET_RESET_VALUES = "setResetValues";

const state = {
  allItensTypeResponsible: ["Responsável", "Corresponsável"],

  persons:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).persons === undefined
      ? []
      : JSON.parse(sessionStorage.getItem("data")).persons,

  itensTypeResponsible:
    JSON.parse(sessionStorage.getItem("data")) === null ||
    JSON.parse(sessionStorage.getItem("data")).itensTypeResponsible ===
      undefined
      ? ["Responsável", "Corresponsável"]
      : JSON.parse(sessionStorage.getItem("data")).itensTypeResponsible,
};

const getters = {
  getItensTypeResponsible(state) {
    return state.itensTypeResponsible;
  },
  getAllItensTypeResponsible(state) {
    return state.allItensTypeResponsible;
  },
  getPersons(state) {
    return organizePersons(state.persons);
  },
};

const actions = {
  [ADD_PERSONS](context, data) {
    context.commit(SET_ADD_PERSONS, data);
  },
  [GET_VERIFY_EXIST_RESPONSIBLE](context) {
    context.commit(SET_VERIFY_EXIST_RESPONSIBLE);
  },
  [EDIT_PERSONS](context, data) {
    context.commit(SET_EDIT_PERSONS, data);
  },
  [GET_PERSON_TYPE](context) {
    ApiService.get("fiancavelo/api/persontype.php").then(({ data }) => {
      context.commit(SET_PERSON_TYPE, data.return);
      context.commit(SET_VERIFY_EXIST_RESPONSIBLE);
    });
  },
  [REMOVE_PERSONS](context, id) {
    context.commit(SET_REMOVE_PERSONS, id);
  },
  [RESET_VALUES_TENANT](context) {
    context.commit(SET_RESET_VALUES);
  },
  [GET_PERSONS](context, payload) {
    context.commit(SET_PERSONS, payload);
  },
};

const mutations = {
  [SET_ADD_PERSONS](state, payload) {
    if (payload.type === "Responsável" || payload.type === "Empresa") {
      state.persons.unshift({
        ...payload,
        name: CapitalizeString(payload.name),
        rental: payload.rental.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      });
    } else {
      state.persons.push({
        ...payload,
        name: CapitalizeString(payload.name),
        rental: payload.rental.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      });
    }

    state.persons = organizePersons(state.persons);

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        persons: state.persons,
      })
    );
  },
  [SET_VERIFY_EXIST_RESPONSIBLE](state) {
    let result = state.persons.filter(({ type }) => type === "Responsável");

    if (result.length === 0) {
      state.itensTypeResponsible = state.allItensTypeResponsible;
    } else {
      let result = state.allItensTypeResponsible.filter(
        (item) => item === "Corresponsável"
      );

      state.itensTypeResponsible = result;
    }
  },
  [SET_EDIT_PERSONS](state, payload) {
    const index = state.persons.findIndex((p) => p.id === payload.id);

    let cloneArr = Array.from(state.persons);

    cloneArr[index] = payload;

    state.persons = cloneArr;
  },
  [SET_PERSON_TYPE](state, payload) {
    let result = payload.map(({ nome }) => nome);
    state.allItensTypeResponsible = result;
  },
  [SET_REMOVE_PERSONS](state, id) {
    const index = state.persons.findIndex((p) => p.id === id);
    state.persons.splice(index, 1);

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        persons: state.persons,
      })
    );
  },
  [SET_RESET_VALUES](state) {
    state.persons = [];
    state.itensTypeResponsible = state.allItensTypeResponsible;
  },
  [SET_PERSONS](state, payload) {
    const formatItensArray = payload.map((item) => {
      return {
        ...item,
        name: CapitalizeString(item.name),
        rental: Number(item.rental).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      };
    });

    state.persons = organizePersons(formatItensArray);

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        persons: state.persons,
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
