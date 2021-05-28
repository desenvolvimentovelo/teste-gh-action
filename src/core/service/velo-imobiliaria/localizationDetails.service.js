import ApiService from "@/core/service/api.service";

export function createRealEstate(params) {
  return ApiService.post("fiancavelo/api/realestate.php", params);
}

export function createAddress(params) {
  return ApiService.post("clientes/api/address.php", params);
}

export function updateColaborador(params) {
  return ApiService.put("fiancavelo/api/colaborador.php", params);
}

export function getColaboradorId(id) {
  return ApiService.get(
    `fiancavelo/api/colaborador.php?where=user&value=${id}`
  );
}
