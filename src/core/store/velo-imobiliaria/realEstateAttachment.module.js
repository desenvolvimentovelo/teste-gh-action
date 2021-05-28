import {
  getAttachmentRealEstate,
  addPropertydocumentsRealEstate
} from "@/core/service/realestate/detailRealEstate.service.js";
import dropbox from "@/utils/dropbox";

// action types
export const GET_ATTACHMENT2 = "getAttachment2";
export const ADC_ATTACHMENT = "adcAttachment";
export const REMOV_ATTACHMENT = "removAttachment";
export const RESET_VALUES_ATTACHMENT = "resetValues";
export const GET_PATH = "getPath";
export const GET_COMPANY = "getCompany";

// mutation types
export const SET_ATTACHMENT2 = "setAttachment2";
export const SET_ADC_ATTACHMENT = "setAdcAttachment";
export const SET_REMOV_ATTACHMENT = "setRemovAttachment";
export const SET_RESET_VALUES = "setResetValues";
export const SET_PATH = "setPath";
export const SET_COMPANY = "setCompany";

const state = {
  attachments: [
    { tittle: "Regularidade CRECI", name: null, link: null, documenttype: "3" },
    { tittle: "CNPJ", name: null, link: null, documenttype: "4" },
    { tittle: "Contrato Social", name: null, link: null, documenttype: "5" },
    { tittle: "Alvará de funcionamento", name: null, link: null, documenttype: "6" },
    { tittle: "Contrato imobiliária", name: null, link: null, documenttype: "7" },
    { tittle: "Complemento", name: null, link: null, documenttype: "8" },
  ],
  path: null,
  company: null
};

const getters = {
  getAttachmentsDetail(state) {
    return state.attachments;
  },

  getPath(state) {
    return state.path;
  },

  getCompany(state) {
    return state.company;
  }
};

const actions = {
  [GET_ATTACHMENT2](context, idrealestate) {
    getAttachmentRealEstate(idrealestate)
      .then((result) => {
        if (result.data.return) {
          context.commit(SET_ATTACHMENT2, result.data.return);
        }
      });
  },
  [ADC_ATTACHMENT](context, data) {
    context.commit(SET_ADC_ATTACHMENT, data);
  },
  [REMOV_ATTACHMENT](context, attachment) {
    context.commit(SET_REMOV_ATTACHMENT, attachment);
  },
  [RESET_VALUES_ATTACHMENT](context) {
    context.commit(SET_RESET_VALUES);
  },
  [GET_PATH](context, path) {
    context.commit(SET_PATH, path);
  },
  [GET_COMPANY](context, path) {
    context.commit(SET_COMPANY, path);
  }
};

const mutations = {
  async [SET_ADC_ATTACHMENT](state, payload) {
    state.attachments[payload.index].name = payload.name;
    state.attachments[payload.index].file = payload;

    // adiciona arquivo no dropbox
    let fileUploadResponse = await dropbox().filesUpload({
      path: `${state.path}/${state.attachments[payload.index].name}`,
      contents: state.attachments[payload.index].file,
    });

    let linkFileResponse = await dropbox().sharingCreateSharedLink({
      path: fileUploadResponse.result.path_display,
    });

    // adiciona link no banco
    await createCompanyDocument(state.attachments[payload.index].name, state.company, state.attachments[payload.index].documenttype, linkFileResponse.result.url);

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        realestatedocuments: [...state.attachments],
      })
    );
  },
  [SET_REMOV_ATTACHMENT](state, index) {
    state.attachments[index].name = null;
    state.attachments[index].link = null;

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        realestatedocuments: [...state.attachments],
      })
    );
  },
  [SET_ATTACHMENT2](state, payload) {
    for (let index = 0; index < payload.length; index++) {
      state.attachments.map((att) => {
        if (att.documenttype === payload[index].documenttype) {
          att.link = payload[index].link;
          att.name = payload[index].name;
          att.id = payload[index].id;
        }
      });
    }
  },
  [SET_RESET_VALUES](state) {
    state.attachments = [];
  },
  [SET_PATH](state, payload) {
    state.path = payload;
  },
  [SET_COMPANY](state, payload) {
    state.company = payload;
  }
};

async function createCompanyDocument(name, company, documenttype, linkFileResponse) {
  let body = {
    id: null,
    name: name,
    company: company,
    documenttype: documenttype,
    link: linkFileResponse,
  };

  addPropertydocumentsRealEstate(body);
}

export default {
  state,
  actions,
  mutations,
  getters,
};
