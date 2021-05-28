import ApiService from "@/core/service/api.service";

export function sendMail(idPropose, type) {
  return ApiService.get(
    `fiancavelo/api/sendmail.php?type=${type}&idPropose=${idPropose}`
  );
}

export function updateStepPropose(step) {
  ApiService.put(
    "fiancavelo/api/propose.php",
    JSON.stringify({
      id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
      step: step,
    })
  );

  sessionStorage.setItem(
    "data",
    JSON.stringify({
      ...JSON.parse(sessionStorage.getItem("data")),
      objectPropose: {
        ...JSON.parse(sessionStorage.getItem("data")).objectPropose,
        step,
      },
    })
  );
}

export function updateTypePropose(typePropose) {
  ApiService.put(
    "fiancavelo/api/propose.php",
    JSON.stringify({
      id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
      type: typePropose,
    })
  );

  sessionStorage.setItem(
    "data",
    JSON.stringify({
      ...JSON.parse(sessionStorage.getItem("data")),
      objectPropose: {
        ...JSON.parse(sessionStorage.getItem("data")).objectPropose,
        idtype: typePropose,
      },
    })
  );
}

export function updatePropose(params) {
  return ApiService.put("fiancavelo/api/propose.php", params);
}

export function getPackType() {
  return ApiService.get(`fiancavelo/api/packtype.php?order=id&ordination=asc`);
}

export const companyActions = {
  edit(params) {
    return ApiService.put("clientes/api/company.php", params);
  },

  editType(params) {
    return ApiService.put("fiancavelo/api/proposeperson.php", params);
  },

  create(params) {
    return ApiService.post("clientes/api/company.php", params);
  },

  createPropose(params) {
    return ApiService.post("fiancavelo/api/proposecompany.php", params);
  },

  deletePropose(id) {
    return ApiService.delete(`fiancavelo/api/proposecompany.php?id=${id}`);
  },

  exist(cnpj) {
    return ApiService.get(
      `clientes/api/company.php?where=document&value=${cnpj}`
    );
  },

  getCompanyPropose(idPropose) {
    return ApiService.get(
      `fiancavelo/api/viewcompanypropose.php?propose=${idPropose}`
    );
  },
};

export const personActions = {
  edit(params) {
    return ApiService.put("clientes/api/person.php", params);
  },

  editType(params) {
    return ApiService.put("fiancavelo/api/proposeperson.php", params);
  },

  create(params) {
    return ApiService.post("clientes/api/person.php", params);
  },

  exist(cpf) {
    return ApiService.get(
      `clientes/api/person.php?where=document&value=${cpf}`
    );
  },

  updatePropose(params) {
    return ApiService.put(`fiancavelo/api/proposeperson.php`, params);
  },

  getPropose(idPropose, idPerson) {
    return ApiService.get(
      `fiancavelo/api/viewproposeperson.php?propose=${idPropose}&person=${idPerson}`
    );
  },

  createPropose(params) {
    return ApiService.post("fiancavelo/api/proposeperson.php", params);
  },

  deletePropose(id) {
    return ApiService.delete(`fiancavelo/api/proposeperson.php?id=${id}`);
  },

  emailExist(email) {
    return ApiService.get(`users/api/viewcheckexist.php?email='${email}'`);
  },

  getId(id) {
    return ApiService.get(`clientes/api/person.php?id=${id}`);
  },

  getPersonEmail(email) {
    return ApiService.get(`clientes/api/person.php?where=email&value=${email}`);
  },

  getTypesPerson(idPropose) {
    return ApiService.get(
      `fiancavelo/api/proposeperson.php?where=propose&value=${idPropose}`
    );
  },

  getPersonPropose(idPropose) {
    return ApiService.get(
      `fiancavelo/api/viewpersonpropose.php?propose=${idPropose}`
    );
  },
};

export const clientAddressAction = {
  add(params) {
    return ApiService.post("clientes/api/address.php", params);
  },

  update(params) {
    return ApiService.put("clientes/api/address.php", params);
  },
};

export const clientRealEstateAction = {
  add(params) {
    return ApiService.post(`fiancavelo/api/realestate.php`, params);
  },

  update(params) {
    return ApiService.put(`fiancavelo/api/realestate.php`, params);
  },
};

export function deletePropose(id) {
  return ApiService.delete(`fiancavelo/api/propose.php?id=${id}`);
}

export function getAllProposeStatus() {
  return ApiService.get("fiancavelo/api/proposestatus.php");
}

export function getAllFiancaStatus() {
  return ApiService.get("fiancavelo/api/status.php");
}

export function getAllProposes() {
  return ApiService.get(
    "fiancavelo/api/viewpropose.php?order=id&ordination=desc"
  );
}

export function getSpecificPropose(id) {
  return ApiService.get(`fiancavelo/api/viewpropose.php?id=${id}`);
}

export function getViewProposeactive() {
  return ApiService.get("fiancavelo/api/fianca.php?order=id&ordination=desc");
}

export function getSessionUser() {
  return ApiService.get(`users/api/viewusersession.php`);
}

export function changeNewPassword(params) {
  return ApiService.put(`users/api/users.php`, params);
}

export function getViewAprovespending() {
  return ApiService.get("fiancavelo/api/viewaprovespending.php");
}

export function getRealEstateAll() {
  return ApiService.get(`fiancavelo/api/viewrealestateaproves.php`);
}

export function updateRealEstate(params) {
  return ApiService.put(`fiancavelo/api/realestate.php`, params);
}

export function getExecutives() {
  return ApiService.get("fiancavelo/api/viewexecutives.php");
}

export function getAddressId(id) {
  return ApiService.get(`clientes/api/address.php?id=${id}`);
}

export function sendNotification(params) {
  return ApiService.post("notificacao/api/alert.php", params);
}
