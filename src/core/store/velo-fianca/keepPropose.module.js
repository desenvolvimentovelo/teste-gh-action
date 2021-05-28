import {
  getViewcheckout,
  getPackvaluesId,
  getPropertyId,
  getPropertyDocumentsId,
} from "@/core/service/velo-fianca/checkout.service.js";
import { ADD_PERSONS } from "@/core/store/velo-fianca/tenant.module.js";
import {
  GET_ATTACHMENT_CHECKOUT_END,
  GET_VIEW_ATTACHMENT,
} from "@/core/store/velo-fianca/checkout.module.js";
import {
  personActions,
  companyActions,
  getPackType,
} from "@/core/service/core.service.js";
import {
  GET_TOTAL_VALUE,
  GET_LOCATIONS,
  GET_NEW_TYPES_PACK_LOCATION,
  GET_ITENS_PACKAGE,
  GET_LIST_REALTORS,
  GET_REALTOR_ADMIN,
  GET_PERCENTAGE_PLAN,
  GET_VALUE_ACTIVATOR,
  GET_ACTIVATOR_ITEM_ACTIVE,
} from "@/core/store/velo-fianca/packLocation.module.js";
import {
  GET_ADDRESS,
  GET_LOCALIZATION,
} from "@/core/store/velo-fianca/propertyDetails.module.js";
import { GET_LOADING } from "@/core/store/core.module.js";
import { getSessionUser } from "@/core/service/core.service";
import {
  getListCollaborator,
  getInfosPlan,
} from "@/core/service/velo-fianca/packLocation.service";
import { GET_ATTACHMENT } from "./attachment.module";

export const GET_KEEP_PROPOSE = "getKeepPropose";
export const GET_KEEP_PROPOSE_PERSONS = "getKeepProposePersons";
export const GET_KEEP_PROPOSE_COMPANY = "getKeepProposeCompany";
export const GET_KEEP_PROPOSE_PACK_VALUES = "getKeepProposePackValues";
export const GET_UPDATE_SESSION_STORAGE = "getUpdateSessionStorage";

// mutation types
export const SET_ID_PROPERTY = "setIdProperty";
export const SET_INFOS_STEP_PROPOSE = "setInfosStepPropose";
export const UPDATE_SESSION_STORAGE = "updateSessionStorage";
export const SET_KEEP_PROPOSE = "setKeepPropose";
export const SET_KEEP_PROPOSE_PERSONS = "setKeepProposePersons";
export const SET_KEEP_PROPOSE_COMPANY = "setKeepProposeCompany";
export const SET_KEEP_PROPOSE_PACK_VALUES = "setKeepProposePackValues";
export const SET_KEEP_PROPOSE_ALL_PACK_VALUES = "setKeepProposeAllPackValues";
export const SET_KEEP_PROPOSE_PROPERTY = "setKeepProposeProperty";
export const SET_KEEP_PROPOSE_REALTOR = "setKeepProposeRealtor";
export const SET_KEEP_PROPOSE_PLANS = "setKeepProposePlans";
export const SET_KEEP_DOCUMENT_PROPERTY = "setKeepDocumentProperty";

const state = {
  idProperty: null,
};

const getters = {
  getIdProperty(state) {
    return state.idProperty;
  },
};

const actions = {
  // Context é o que da acesso as variáveis do Vuex
  // Self é o "this" que contém o acesso para a variáveis globais do vue
  async [GET_KEEP_PROPOSE](context, self) {
    self.$store.dispatch(GET_LOADING, true);

    const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));
    const idPropose = sessionStorageItem.objectPropose.id;
    sessionStorage.removeItem("redirect");

    const [viewcheckout, userlogged] = await Promise.all([
      getViewcheckout(idPropose),
      getSessionUser(),
    ]);

    context.commit(SET_INFOS_STEP_PROPOSE, {
      context,
      self,
      data: {
        viewcheckout: viewcheckout.data.return[0],
        userlogged: userlogged.data.return[0],
      },
    });

    context.commit(UPDATE_SESSION_STORAGE, {
      key: "objectPropose",
      data: sessionStorageItem.objectPropose,
    });
  },
  [GET_UPDATE_SESSION_STORAGE](context, payload) {
    context.commit(UPDATE_SESSION_STORAGE, payload);
  },
};

const mutations = {
  [SET_INFOS_STEP_PROPOSE](_, payload) {
    const { context, self, data } = payload;
    const { viewcheckout, userlogged } = data;
    const {
      id,
      person,
      company,
      packvalues,
      property,
      type,
      activatorvalue,
      activator,
      realtor,
      propertydocuments,
    } = viewcheckout;

    context.commit(SET_ID_PROPERTY, property);

    person &&
      context.commit(SET_KEEP_PROPOSE_PERSONS, {
        self,
        data: { idPropose: id },
      });
    company &&
      context.commit(SET_KEEP_PROPOSE_COMPANY, {
        self,
        data: { idPropose: id },
      });
    packvalues
      ? context.commit(SET_KEEP_PROPOSE_PACK_VALUES, {
          self,
          context,
          data: { idPackValues: packvalues },
        })
      : context.commit(SET_KEEP_PROPOSE_ALL_PACK_VALUES, {
          self,
          context,
        });
    property &&
      context.commit(SET_KEEP_PROPOSE_PROPERTY, {
        context,
        self,
        data: { idPropertys: property },
      });
    propertydocuments &&
      context.commit(SET_KEEP_DOCUMENT_PROPERTY, {
        context,
        self,
        data: { idPropertyDocuments: propertydocuments },
      });
    context.commit(SET_KEEP_PROPOSE_REALTOR, {
      context,
      self,
      data: {
        idrealtor: realtor,
        idadmin: userlogged.idcollaborator,
        realestate_user: userlogged.realestate_user,
      },
    });
    context.commit(SET_KEEP_PROPOSE_PLANS, {
      self,
      data: {
        idCompany: userlogged.realestate_user,
        type,
        activator,
        activatorvalue,
      },
    });
  },
  [SET_ID_PROPERTY](state, payload) {
    state.idProperty = payload;
  },
  [SET_KEEP_PROPOSE_PERSONS](_, payload) {
    const { self, data } = payload;
    const { idPropose } = data;

    personActions.getPersonPropose(idPropose).then((response) => {
      response.data.return.forEach((item) => {
        self.$store.dispatch(ADD_PERSONS, item);
      });
    });
  },
  [SET_KEEP_PROPOSE_COMPANY](_, payload) {
    const { self, data } = payload;
    const { idPropose } = data;

    companyActions.getCompanyPropose(idPropose).then((response) => {
      response.data.return.forEach((item) => {
        self.$store.dispatch(ADD_PERSONS, item);
      });
    });
  },
  [SET_KEEP_PROPOSE_PACK_VALUES](_, payload) {
    const { self, context, data } = payload;
    const { idPackValues } = data;

    Promise.all([getPackvaluesId(idPackValues), getPackType()]).then(
      (responses) => {
        const [packvalues, packtype] = responses;

        const packValuesArray = packvalues.data.return.map((item) => {
          const idPackTypes = packtype.data.return.filter(
            ({ id }) => id === item.packtype
          );

          const { id, name } = idPackTypes[0];

          return {
            ...item,
            type: {
              id,
              name,
            },
            value: Number(item.value).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
          };
        });

        const cloneArr = packtype.data.return;
        packValuesArray.forEach((item) => {
          const index = cloneArr.findIndex(
            ({ name }) => name === item.type.name
          );
          cloneArr.splice(index, 1);
        });

        context.commit(UPDATE_SESSION_STORAGE, {
          key: "packageLocations",
          data: packValuesArray,
        });
        context.commit(UPDATE_SESSION_STORAGE, {
          key: "itensTypePackage",
          data: cloneArr,
        });

        self.$store.dispatch(GET_LOCATIONS, packValuesArray);
        self.$store.dispatch(GET_NEW_TYPES_PACK_LOCATION, cloneArr);
        self.$store.dispatch(GET_TOTAL_VALUE);
      }
    );
  },
  [SET_KEEP_PROPOSE_ALL_PACK_VALUES](_, payload) {
    const { self, context } = payload;

    getPackType().then(({ data }) => {
      const raw = data.return.map(({ id, name }) => ({
        value: {
          id,
          name,
        },
      }));

      self.$store.dispatch(GET_ITENS_PACKAGE, raw);
      context.commit(UPDATE_SESSION_STORAGE, {
        key: "itensTypePackage",
        data: raw,
      });
    });
  },
  [SET_KEEP_PROPOSE_PROPERTY](_, payload) {
    const { context, self, data } = payload;
    const { idPropertys } = data;

    getPropertyId(idPropertys).then((propertys) => {
      const { geolocation } = propertys.data.return[0];

      context.commit(UPDATE_SESSION_STORAGE, {
        key: "address",
        data: propertys.data.return[0],
      });

      self.$store.dispatch(GET_ADDRESS, propertys.data.return[0]);
      self.$store.dispatch(
        GET_LOCALIZATION,
        geolocation.split(",").map((item) => Number(item))
      );
      self.$store.dispatch(GET_LOADING, false);
    });
  },
  [SET_KEEP_PROPOSE_REALTOR](_, payload) {
    const { context, self, data } = payload;
    const { idrealtor, idadmin, realestate_user } = data;

    getListCollaborator(realestate_user).then(({ data }) => {
      const getIdRealtor = idrealtor === null ? idadmin : idrealtor;

      self.$store.dispatch(GET_LIST_REALTORS, data.return);
      self.$store.dispatch(GET_REALTOR_ADMIN, getIdRealtor);

      context.commit(UPDATE_SESSION_STORAGE, {
        key: "realtorInfos",
        data: {
          ...JSON.parse(sessionStorage.getItem("data")).realtorInfos,
          list: data.return,
          active: getIdRealtor,
        },
      });
    });
  },
  [SET_KEEP_PROPOSE_PLANS](_, payload) {
    const { self, data } = payload;
    const { idCompany, type, activator, activatorvalue } = data;

    getInfosPlan(idCompany, type).then(({ data }) => {
      self.$store.dispatch(
        GET_PERCENTAGE_PLAN,
        parseInt(data.return[0].percent)
      );

      self.$store.dispatch(GET_ACTIVATOR_ITEM_ACTIVE, activator);

      self.$store.dispatch(GET_VALUE_ACTIVATOR, activatorvalue);

      self.$store.dispatch(GET_TOTAL_VALUE);

      self.$store.dispatch(GET_LOADING, false);
    });
  },
  [SET_KEEP_DOCUMENT_PROPERTY](_, payload) {
    const { self, data } = payload;
    const { idPropertyDocuments } = data;

    getPropertyDocumentsId(idPropertyDocuments).then(({ data }) => {
      var arrTmp = [null, null];
      var viewTmp = {
        contractLocation: false,
        surveyLocation: false,
      };

      data.return.map((item) => {
        if (Number(item.documenttype) === 1) {
          arrTmp[0] = {
            ...item,
            type: "Contrato de locação",
          };

          viewTmp.contractLocation = true;
        } else {
          arrTmp[1] = {
            ...item,
            type: "Vistoria de locação",
          };

          viewTmp.surveyLocation = true;
        }
      });

      self.$store.dispatch(GET_ATTACHMENT_CHECKOUT_END, arrTmp);
      self.$store.dispatch(GET_VIEW_ATTACHMENT, viewTmp);
      self.$store.dispatch(GET_ATTACHMENT, data.return);
    });
  },
  [UPDATE_SESSION_STORAGE](_, payload) {
    const { key, data } = payload;

    sessionStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("data")),
        [key]: data,
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
