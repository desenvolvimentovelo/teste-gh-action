import AuthService from "@/core/service/auth.service";

// ACTIONS
export const GET_TOKEN = "getToken";

// MUTATIONS
export const SET_TOKEN = "setToken";

const state = {
    token: null
};

const getters = {
    getToken(state) {
        return state.token;
    }
};

const actions = {
    [GET_TOKEN](context, payload) {
        context.commit(SET_TOKEN, payload);
    }
};

const mutations = {
    [SET_TOKEN](state, token) {
        state.token = token;
        AuthService.saveToken(state.token);
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
};