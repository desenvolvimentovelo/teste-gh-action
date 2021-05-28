import ApiService from "@/core/service/api.service";

export function firstAccess(params) {
  return ApiService.post("users/api/login.php", params);
}

export function createUser(params) {
  return ApiService.post("users/api/users.php", params);
}

export function createPerson(params) {
  return ApiService.post("clientes/api/person.php", params);
}

export function createColaborador(params) {
  return ApiService.post("fiancavelo/api/colaborador.php", params);
}

export function sendMail(idPerson) {
  return ApiService.get(
    `fiancavelo/api/sendmail.php?type=5&idUser=${idPerson}`
  );
}
