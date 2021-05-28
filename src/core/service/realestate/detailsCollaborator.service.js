import ApiService from "@/core/service/api.service";

export function getPositionCompany() {
  return ApiService.get("fiancavelo/api/colaboradortype.php");
}

export function getColaborador(id) {
  return ApiService.get(`fiancavelo/api/colaborador.php?where=id&value=${id}`);
}

export function updateColaborador(params) {
  return ApiService.put(`fiancavelo/api/colaborador.php`, params);
}

export function getUser(id) {
  return ApiService.get(`users/api/users.php?id=${id}`);
}

export function updateUser(params) {
  return ApiService.put(`users/api/users.php`, params);
}

export function deleteColaborador(id) {
  return ApiService.delete(`fiancavelo/api/colaborador.php?id=${id}`);
}

export function deleteUser(id) {
  return ApiService.delete(`users/api/users.php?id=${id}`);
}
