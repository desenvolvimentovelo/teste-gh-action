import ApiService from "@/core/service/api.service";

export function getAllProposeType() {
  return ApiService.get("fiancavelo/api/proposetype.php");
}

export function getPlansRealestate(idRealestate) {
  return ApiService.get(
    `fiancavelo/api/viewrealestateplan.php?id_realestate=${idRealestate}`
  );
}

export function changePlan(data) {
  return ApiService.put("fiancavelo/api/realestateplan.php", data);
}

export function getPlans() {
  return ApiService.get(`fiancavelo/api/plans.php`);
}

export function putPlans(params) {
  return ApiService.put(`fiancavelo/api/viewplanupdate.php`, params);
}

export function getPlansActive(idRealestate) {
  return ApiService.get(
    `fiancavelo/api/viewrealestateplanactive.php?id_realestate=${idRealestate}`
  );
}
