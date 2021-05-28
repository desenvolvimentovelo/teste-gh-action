import ApiService from "@/core/service/api.service";
1
export function getProposeDetail(id_propose) {
    return ApiService.get(`fiancavelo/api/viewproposedetail.php?id_propose=${id_propose}`);
}
export function getPersondetail(id_propose) {
    return ApiService.get(`fiancavelo/api/viewpersondetail.php?id_propose=${id_propose}`);
}
export function getPersondocument(idpropose) {
    return ApiService.get(`fiancavelo/api/viewpersondocuments.php?idpropose=${idpropose}`);
}

export function getPartnerText() {
  return ApiService.get("fiancavelo/api/partnertext.php");
}

export function addEvaluationtext(params) {
    return ApiService.post("fiancavelo/api/evaluationtext.php", params);
}