import ApiService from "@/core/service/api.service";

// action types
export const GET_AFIANCAMENTO = "getAfiancamento";
export const GET_PAYMENT_SELECTED = "getPaymentSelected";
export const GET_VALUE_TOTAL = "getTotalValue";
export const GET_SUBTEXT = "getSubtext";
export const GET_TOTAL_VALUE_PROPOSE = "getTotalValueDb";
export const GET_ACTIVATION_VALUE = "getActivationValue";
export const GET_VIEW_PROPOSE_COMPLETE = "getViewProposeComplete";

// mutation types
export const SET_AFIANCAMENTO = "setAfiancamento";
export const SET_PAYMENT_SELECTED = "setPaymentSelected";
export const SET_VALUE_TOTAL = "setValueTotal";
export const SET_SUBTEXT = "setSubtext";
export const SET_TOTAL_VALUE_PROPOSE = "setTotalValueDb";
export const SET_ACTIVATION_VALUE = "setActivationValue";
export const SET_VIEW_PROPOSE_COMPLETE = "setViewProposeComplete";

const state = {
  paymentSelected: "Assinatura",
  valueTotal: 0,
  activatedPlatformValue: 0,
  subtext: "Valor Mensal",
  afiancamento: 0,
  percentage: 10,
  parcela: 12,
  packValuePropose: null,
  completeViewPropose: { name: ''},
  billingState: null
};

const getters = {
  getPaymentSelected(state) {
    return state.paymentSelected;
  },
  getValueTotal(state) {
    return state.valueTotal;
  },
  getActivatedPlatformValue(state) {
    return state.activatedPlatformValue;
  },
  getSubtext(state) {
    return state.subtext;
  },
  getAfiancamento(state) {
    return state.afiancamento;
  },
  getOldValues(state) {
    return state.oldValues;
  },
  getPercentage(state) {
    return state.percentage;
  },
  getParcela(state) {
    return state.parcela;
  },
  getPackValuePropose(state){
    return state.packValuePropose;
  },
  getCompleteViewPropose(state){
    return state.completeViewPropose;
  },
};

const actions = {
  [GET_PAYMENT_SELECTED](context, payload) {
    context.commit(SET_PAYMENT_SELECTED, payload);
  },
  [GET_VALUE_TOTAL](context) {
    context.commit(SET_VALUE_TOTAL);
  },
  [GET_SUBTEXT](context, payload) {
    context.commit(SET_SUBTEXT, payload);
  },
  [GET_AFIANCAMENTO](context, payload) {
    context.commit(SET_AFIANCAMENTO, payload);
  },
  async [GET_TOTAL_VALUE_PROPOSE](context, params) {
    await ApiService.get(
      `fiancavelo/api/packvalues.php?where=propose&value=${params.propose}`
    ).then(({ data }) => {
      context.commit(SET_TOTAL_VALUE_PROPOSE, data.return);
    });
  },
  async [GET_ACTIVATION_VALUE](context, params){
    await ApiService.get(
      `fiancavelo/api/propose.php?id=${params.propose}`
    ).then(async ({ data }) => {
      let activator = data.return[0].activator;
      await ApiService.get(
        `fiancavelo/api/activator.php?id=${activator}`
      ).then(({data})=> {
        context.commit(SET_ACTIVATION_VALUE, parseFloat(data.return[0].value));
      })
    });
  },
  async [GET_VIEW_PROPOSE_COMPLETE](context, params){
    await ApiService.get(
      `fiancavelo/api/viewproposecomplete.php?where=hash&value=${params.propose}`
    ).then(({data})=>{
      context.commit(SET_VIEW_PROPOSE_COMPLETE, data.return[0]);
    });
  },
};

const mutations = {
  [SET_PAYMENT_SELECTED](state, payload) {
    state.paymentSelected = payload;
  },
  [SET_VALUE_TOTAL](state) {
    state.valueTotal = parseFloat(state.afiancamento) + parseFloat(state.activatedPlatformValue);
  },
  [SET_SUBTEXT](state, payload) {
    state.subtext = payload;
  },
  [SET_AFIANCAMENTO](state, payload) {
    state.afiancamento = payload;
  },
  [SET_TOTAL_VALUE_PROPOSE](state, payload){
    state.packValuePropose = payload;
  },
  [SET_ACTIVATION_VALUE](state, payload){
    state.activatedPlatformValue = payload;
  },
  [SET_VIEW_PROPOSE_COMPLETE](state, payload){
    state.completeViewPropose = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
