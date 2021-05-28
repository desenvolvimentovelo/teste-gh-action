import Vue from "vue";
import Vuex from "vuex";

import coreModule from "@/core/store/core.module.js";
import authModule from "@/core/store/auth.module.js";

import keepProposeModule from "./velo-fianca/keepPropose.module";
import proposeModule from "./velo-fianca/propose.module.js";
import paymentModule from "./velo-fianca/payment.module.js";
import packLocationModule from "./velo-fianca/packLocation.module.js";
import propertyDetails from "./velo-fianca/propertyDetails.module.js";
import tenantModule from "./velo-fianca/tenant.module.js";
import checkoutModule from "./velo-fianca/checkout.module.js";
import attachmentModule from "./velo-fianca/attachment.module.js";
import fiancaModule from "./velo-fianca/fianca.module.js";
import approverModule from "./velo-fianca/approver.module.js";
import realestateModule from "./velo-fianca/RealEstate.module.js";

import realEstateModule from "./velo-imobiliaria/realEstate.module.js";
import registerRealEstateModule from "./velo-imobiliaria/register.module.js";
import collaborator from "./velo-imobiliaria/collaborator.module.js";
import realEstateAttachmentModule from "./velo-imobiliaria/realEstateAttachment.module.js";
import registerGestorModule from "./velo-imobiliaria/registerGestor.module.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    coreModule,
    authModule,

    // Fiança
    proposeModule,
    packLocationModule,
    paymentModule,
    propertyDetails,
    tenantModule,
    checkoutModule,
    attachmentModule,
    fiancaModule,
    approverModule,
    realestateModule,
    keepProposeModule,

    // Imobiliária
    realEstateModule,
    registerRealEstateModule,
    realEstateAttachmentModule,
    registerGestorModule,

    // Colaborador
    collaborator,
  },
});
