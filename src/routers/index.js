import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      beforeEnter: (to, from, next) => next("/proposta"),
    },
    {
      path: "/proposta",
      name: "proposta",
      component: () => "@/views/velofianca/propose/Propose.vue",
    },
    {
      path: "/escolher-tipo-proposta",
      name: "escolher-tipo-proposta",
      component: () => "@/views/velofianca/propose/ChooseTypePropose.vue",
    },
    {
      path: "/dados-inquilino",
      name: "dados-inquilino",
      component: () => "@/views/velofianca/propose/TenantData.vue",
    },
    {
      path: "/pacote-locacao",
      name: "pacote-locacao",
      component: () => "@/views/velofianca/propose/PackLocation.vue",
    },
    {
      path: "/dados-imovel",
      name: "dados-imovel",
      component: () => "@/views/velofianca/propose/PropertyDetails.vue",
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => "@/views/velofianca/propose/Checkout.vue",
    },
    {
      path: "/checkout/:id",
      name: "checkout-id",
      component: () => "@/views/velofianca/propose/Checkout.vue",
    },
    {
      path: "/aguardando-assinatura",
      name: "aguardando-assinatura",
      component: () => "@/views/velofianca/propose/AwaitingSign.vue",
    },
    {
      path: "/aguardando-analise",
      name: "aguardando-analise",
      component: () => "@/views/velofianca/propose/AwaitingAnalysis.vue",
    },
    {
      path: "/aguardando-pagamento",
      name: "aguardando-pagamento",
      component: () => "@/views/velofianca/propose/AwaitingPayment.vue",
    },
    {
      path: "/ocorrencia-retorno/:id",
      name: "ocorrencia-retorno-id",
      component: () => "@/views/velofianca/propose/OccurrenceReturn.vue",
    },
    {
      path: "/attachment",
      name: "attachment",
      component: () => "@/views/velofianca/propose/Attachment.vue",
    },
    {
      path: "/payment",
      name: "payment",
      component: () => "@/views/velofianca/payment/Payment.vue",
    },
    {
      path: "/payment-card",
      name: "payment-card",
      component: () => "@/views/velofianca/payment/PaymentCard.vue",
    },
    {
      path: "/simulador-locacao",
      name: "simulador-locacao",
      component: () => "@/views/velofianca/simulator/LocationSimulation.vue",
    },
    {
      path: "/simulador-resultado/:id",
      name: "simulador-resultado",
      component: () => "@/views/velofianca/simulator/ResultSimulation.vue",
    },
    {
      path: "/imobiliarias",
      name: "imobiliarias",
      component: () => "@/views/realestate/RealEstate.vue",
    },
    {
      path: "/imobiliaria/:id",
      name: "imobiliaria-id",
      component: () => "@/views/realestate/RealEstateDetail.vue",
    },
    {
      path: "/detalhes-colaborador/:id",
      name: "colaborador-novo",
      component: () => "@/views/realestate/DetailsCollaborator.vue",
    },
    {
      path: "/imobiliaria/:idRealEstate/colaborador",
      name: "colaborador",
      component: () => "@/views/realestate/Collaborator.vue",
    },
    {
      path: "/imobiliaria/:idRealEstate/colaborador/detalhes-colaborador/:id",
      name: "detalhes-colaborador-id",
      component: () => "@/views/realestate/DetailsCollaborator.vue",
    },
    {
      path: "/usuario",
      name: "usuario",
      component: () => "@/views/realestate/RegisterGestor.vue",
    },
    {
      path: "/confirmar-email",
      name: "confirmar-email",
      component: () => "@/views/realestate/ConfirmationEmail.vue",
    },
    {
      path: "/registro-executivo",
      name: "registro-executivo",
      component: () => "@/views/welcome/SalesExecutive.vue",
    },
    {
      path: "/registro-imobiliaria",
      name: "registro-imobiliaria",
      component: () => "@/views/realestate/Register.vue",
    },
    {
      path: "/imobiliaria-contrato-assinatura",
      name: "imobiliaria-contrato-assinatura",
      component: () => "@/views/realestate/ContractSign.vue",
    },
    {
      path: "/imobiliaria-aguardando-aprovacao",
      name: "imobiliaria-aguardando-aprovacao",
      component: () => "@/views/realestate/RealEstateWaitingAproves.vue",
    },
    {
      path: "/aprovador",
      name: "aprovador",
      component: () => "@/views/approver/Approver.vue",
    },
    {
      path: "/aprovador/:id",
      name: "aprovador-id",
      component: () => "@/views/approver/ApproverDetails.vue",
    },
    {
      path: "/detalhes-imobiliaria/:id",
      name: "detalhes-imobiliaria-id",
      component: () => "@/views/approver/DetailApproverRealestate.vue",
    },
    {
      path: "/bem-vindo",
      name: "bem-vindo",
      component: () => "@/views/welcome/Welcome.vue",
    },
    {
      path: "/trocar-credencial",
      name: "trocar-credencial",
      component: () => "@/views/welcome/ChangeCredential.vue",
    },
    {
      path: "/fianca",
      name: "fianca",
      component: () => "@/views/velofianca/fianca/Fianca.vue",
    },
    {
      path: "/planos",
      name: "planos",
      component: () => "@/views/realestate/Plans.vue",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const parms = new URL(window.location.href);
  if (parms.searchParams.get("token") !== null) {
    localStorage.setItem("session", true);
    localStorage.setItem("token", parms.searchParams.get("token"));
  }

  if (to.name === "usuario" || localStorage.getItem("token")) {
    next();
  } else {
    window.location.replace("/sys/login.html");
  }
});

export default router;
