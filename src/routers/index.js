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
      component: () =>
        import(
          /* webpackChunkName: "proposta" */ "@/views/velofianca/propose/Propose.vue"
        ),
    },
    {
      path: "/escolher-tipo-proposta",
      name: "escolher-tipo-proposta",
      component: () =>
        import(
          /* webpackChunkName: "escolher-tipo-proposta" */ "@/views/velofianca/propose/ChooseTypePropose.vue"
        ),
    },
    {
      path: "/dados-inquilino",
      name: "dados-inquilino",
      component: () =>
        import(
          /* webpackChunkName: "dados-inquilino" */ "@/views/velofianca/propose/TenantData.vue"
        ),
    },
    {
      path: "/pacote-locacao",
      name: "pacote-locacao",
      component: () =>
        import(
          /* webpackChunkName: "pacote-locacao" */ "@/views/velofianca/propose/PackLocation.vue"
        ),
    },
    {
      path: "/dados-imovel",
      name: "dados-imovel",
      component: () =>
        import(
          /* webpackChunkName: "dados-imovel" */ "@/views/velofianca/propose/PropertyDetails.vue"
        ),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () =>
        import(
          /* webpackChunkName: "checkout" */ "@/views/velofianca/propose/Checkout.vue"
        ),
    },
    {
      path: "/checkout/:id",
      name: "checkout-id",
      component: () =>
        import(
          /* webpackChunkName: "checkout-id" */ "@/views/velofianca/propose/Checkout.vue"
        ),
    },
    {
      path: "/aguardando-assinatura",
      name: "aguardando-assinatura",
      component: () =>
        import(
          /* webpackChunkName: "aguardando-assinatura" */ "@/views/velofianca/propose/AwaitingSign.vue"
        ),
    },
    {
      path: "/aguardando-analise",
      name: "aguardando-analise",
      component: () =>
        import(
          /* webpackChunkName: "aguardando-analise" */ "@/views/velofianca/propose/AwaitingAnalysis.vue"
        ),
    },
    {
      path: "/aguardando-pagamento",
      name: "aguardando-pagamento",
      component: () =>
        import(
          /* webpackChunkName: "aguardando-pagamento" */ "@/views/velofianca/propose/AwaitingPayment.vue"
        ),
    },
    {
      path: "/ocorrencia-retorno/:id",
      name: "ocorrencia-retorno-id",
      component: () =>
        import(
          /* webpackChunkName: "ocorrencia-retorno-id" */ "@/views/velofianca/propose/OccurrenceReturn.vue"
        ),
    },
    {
      path: "/attachment",
      name: "attachment",
      component: () =>
        import(
          /* webpackChunkName: "attachment" */ "@/views/velofianca/propose/Attachment.vue"
        ),
    },
    {
      path: "/payment",
      name: "payment",
      component: () =>
        import(
          /* webpackChunkName: "payment" */ "@/views/velofianca/payment/Payment.vue"
        ),
    },
    {
      path: "/payment-card",
      name: "payment-card",
      component: () =>
        import(
          /* webpackChunkName: "payment-card" */ "@/views/velofianca/payment/PaymentCard.vue"
        ),
    },
    {
      path: "/simulador-locacao",
      name: "simulador-locacao",
      component: () =>
        import(
          /* webpackChunkName: "simulador-locacao" */ "@/views/velofianca/simulator/LocationSimulation.vue"
        ),
    },
    {
      path: "/simulador-resultado/:id",
      name: "simulador-resultado",
      component: () =>
        import(
          /* webpackChunkName: "simulador-resultado" */ "@/views/velofianca/simulator/ResultSimulation.vue"
        ),
    },
    {
      path: "/imobiliarias",
      name: "imobiliarias",
      component: () =>
        import(
          /* webpackChunkName: "imobiliarias" */ "@/views/realestate/RealEstate.vue"
        ),
    },
    {
      path: "/imobiliaria/:id",
      name: "imobiliaria-id",
      component: () =>
        import(
          /* webpackChunkName: "imobiliaria-id" */ "@/views/realestate/RealEstateDetail.vue"
        ),
    },
    {
      path: "/detalhes-colaborador/:id",
      name: "colaborador-novo",
      component: () =>
        import(
          /* webpackChunkName: "detalhes-colaborador-novo" */ "@/views/realestate/DetailsCollaborator.vue"
        ),
    },
    {
      path: "/imobiliaria/:idRealEstate/colaborador",
      name: "colaborador",
      component: () =>
        import(
          /* webpackChunkName: "colaborador" */ "@/views/realestate/Collaborator.vue"
        ),
    },
    {
      path: "/imobiliaria/:idRealEstate/colaborador/detalhes-colaborador/:id",
      name: "detalhes-colaborador-id",
      component: () =>
        import(
          /* webpackChunkName: "detalhes-colaborador-id" */ "@/views/realestate/DetailsCollaborator.vue"
        ),
    },
    {
      path: "/usuario",
      name: "usuario",
      component: () =>
        import(
          /* webpackChunkName: "usuario" */ "@/views/realestate/RegisterGestor.vue"
        ),
    },
    {
      path: "/confirmar-email",
      name: "confirmar-email",
      component: () =>
        import(
          /* webpackChunkName: "confirmar-email" */ "@/views/realestate/ConfirmationEmail.vue"
        ),
    },
    {
      path: "/registro-executivo",
      name: "registro-executivo",
      component: () =>
        import(/* webpackChunkName: "" */ "@/views/welcome/SalesExecutive.vue"),
    },
    {
      path: "/registro-imobiliaria",
      name: "registro-imobiliaria",
      component: () =>
        import(
          /* webpackChunkName: "registro-imobiliaria" */ "@/views/realestate/Register.vue"
        ),
    },
    {
      path: "/imobiliaria-contrato-assinatura",
      name: "imobiliaria-contrato-assinatura",
      component: () =>
        import(
          /* webpackChunkName: "imobiliaria-contrato-assinatura" */ "@/views/realestate/ContractSign.vue"
        ),
    },
    {
      path: "/imobiliaria-aguardando-aprovacao",
      name: "imobiliaria-aguardando-aprovacao",
      component: () =>
        import(
          /* webpackChunkName: "imobiliaria-aguardando-aprovacao" */ "@/views/realestate/RealEstateWaitingAproves.vue"
        ),
    },
    {
      path: "/aprovador",
      name: "aprovador",
      component: () =>
        import(
          /* webpackChunkName: "aprovador" */ "@/views/approver/Approver.vue"
        ),
    },
    {
      path: "/aprovador/:id",
      name: "aprovador-id",
      component: () =>
        import(
          /* webpackChunkName: "aprovador-id" */ "@/views/approver/ApproverDetails.vue"
        ),
    },
    {
      path: "/detalhes-imobiliaria/:id",
      name: "detalhes-imobiliaria-id",
      component: () =>
        import(
          /* webpackChunkName: "detalhes-imobiliaria-id" */ "@/views/approver/DetailApproverRealestate.vue"
        ),
    },
    {
      path: "/bem-vindo",
      name: "bem-vindo",
      component: () =>
        import(
          /* webpackChunkName: "bem-vindo" */ "@/views/welcome/Welcome.vue"
        ),
    },
    {
      path: "/trocar-credencial",
      name: "trocar-credencial",
      component: () =>
        import(
          /* webpackChunkName: "trocar-credencial" */ "@/views/welcome/ChangeCredential.vue"
        ),
    },
    {
      path: "/fianca",
      name: "fianca",
      component: () =>
        import(
          /* webpackChunkName: "fianca" */ "@/views/velofianca/fianca/Fianca.vue"
        ),
    },
    {
      path: "/planos",
      name: "planos",
      component: () =>
        import(/* webpackChunkName: "planos" */ "@/views/realestate/Plans.vue"),
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
