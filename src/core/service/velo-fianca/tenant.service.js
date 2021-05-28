import ApiService from "@/core/service/api.service";

export function getViewProposeId(id) {
  return ApiService.get(`fiancavelo/api/viewproposecomplete.php?id=${id}`);
}

export function addPropose(params) {
  return ApiService.post("fiancavelo/api/propose.php", params);
}
