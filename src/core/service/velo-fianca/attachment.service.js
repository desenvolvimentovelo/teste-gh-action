import ApiService from "@/core/service/api.service";

export function getAttachments(id) {
  return ApiService.get(
    `fiancavelo/api/viewattachment.php?where=idpropose&value=${id}`
  );
}

export function addPropertydocuments(params) {
  return ApiService.post("fiancavelo/api/propertydocuments.php", params);
}

export function deletePropertydocuments(id) {
  return ApiService.delete(`fiancavelo/api/propertydocuments.php?id=${id}`);
}

export function deleteCompanyDocuments(id) {
  return ApiService.delete(`clientes/api/companydocuments.php?id=${id}`);
}

export function addClientesPersonDocuments(params) {
  return ApiService.post("clientes/api/persondocuments.php", params);
}

export function addFiancaVeloPersonDocuments(params) {
  return ApiService.post("fiancavelo/api/persondocuments.php", params);
}

export function deleteClientesPersonDocuments(id) {
  return ApiService.delete(`clientes/api/persondocuments.php?id=${id}`);
}

export function deleteFiancaVeloPersonDocuments(id) {
  return ApiService.delete(`fiancavelo/api/persondocuments.php?id=${id}`);
}

export function getFiancaveloDocumentType() {
  return ApiService.get(`fiancavelo/api/documenttype.php?where=type&value=1`);
}

export function getClientesDocumentType() {
  return ApiService.get(`clientes/api/documenttype.php`);
}
