import ApiService from "@/core/service/api.service";

export function addPackLocation(params) {
  return ApiService.post("fiancavelo/api/packvalues.php", params);
}

export function getProposeComplete(id) {
  return ApiService.get(`fiancavelo/api/propose.php?id=${id}`);
}

export function getPackvaluesId(id) {
  return ApiService.get(
    `fiancavelo/api/packvalues.php?where=propose&value=${id}`
  );
}

export function getColaborator(realestate) {
  return ApiService.get(
    `fiancavelo/api/viewcolaboradortype.php?where=realestate&value=${realestate}`
  );
}

export function getListCollaborator(realestate) {
  return ApiService.get(
    `fiancavelo/api/viewbroker.php?idrealestate=${realestate}`
  );
}

export function deletePackValues(id) {
  return ApiService.delete(`fiancavelo/api/packvalues.php?id=${id}`);
}

export function editPropose(params) {
  return ApiService.put("fiancavelo/api/propose.php", params);
}

export function getInfosPlan(idrealestate, type) {
  return ApiService.get(
    `fiancavelo/api/viewpercentageplan.php?id_realestate=${idrealestate}&type=${type}`
  );
}
