import ApiService from "@/core/service/api.service";

export function sendMailVeloSIGN(params) {
  return ApiService.post("velosign/api/sendmail.php", JSON.stringify(params));
}

export function getVeloScore(params) {
  return ApiService.post("veloscore/api/veloscore.php", params);
}

export function getViewcheckout(id) {
  return ApiService.get(`fiancavelo/api/viewcheckout.php?id=${id}`);
}

export function getPersonId(id) {
  return ApiService.get(`clientes/api/person.php?id=${id}`);
}

export function getCompanyId(id) {
  return ApiService.get(`clientes/api/company.php?id=${id}`);
}

export function getPackvaluesId(id) {
  return ApiService.get(`fiancavelo/api/packvalues.php?id=${id}`);
}

export function getPropertyId(id) {
  return ApiService.get(`fiancavelo/api/property.php?id=${id}`);
}

export function getPropertyDocumentsId(id) {
  return ApiService.get(`fiancavelo/api/propertydocuments.php?id=${id}`);
}

export function createAbout(params) {
  return ApiService.post("velosign/api/about.php", params);
}

export function createDocument(
  params,
  template = "fgvtnovoklscb01risv3av5c3s4"
) {
  return ApiService.post(
    `velosign/api/document.php?template=${template}`,
    params
  );
}

export function createAssigns(params) {
  return ApiService.post("velosign/api/asigns.php", params);
}

export function createEvalutionHistory(params) {
  return ApiService.post("fiancavelo/api/evaluationhistory.php", params);
}
