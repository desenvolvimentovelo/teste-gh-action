import ApiService from "@/core/service/api.service";

export function createSimulator(params) {
  return ApiService.post("fiancavelo/api/simulator.php", params);
}

export function getPersonByDocument(params) {
  return ApiService.get(
    `clientes/api/person.php?where=document&value=${params}`
  );
}

export function getInfosSimulator(id) {
  return ApiService.get(`fiancavelo/api/viewsimulator.php?id_simulator=${id}`);
}
