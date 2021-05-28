import ApiService from "@/core/service/api.service";

export function getListRealestate() {
  return ApiService.get("fiancavelo/api/viewrealestate.php");
}

export function getListColaboradores(idrealestate) {
  return ApiService.get(
    `fiancavelo/api/viewcolaborador.php?idrealestate=${idrealestate}`
  );
}

export function putActivator(params) {
  return ApiService.put("fiancavelo/api/activation.php", params);
}

export function getValueActivator(id) {
  return ApiService.get(
    `fiancavelo/api/activation.php?where=collaborator&value=${id}`
  );
}
