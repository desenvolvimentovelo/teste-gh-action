import ApiService from "@/core/service/api.service";

export function getRealEstateDetail(id) {
  return ApiService.get(`fiancavelo/api/viewrealestatedetail.php?id=${id}`);
}

export function getAttachmentRealEstate(company) {
  return ApiService.get(
    `clientes/api/companydocuments.php?where=company&value=${company}`
  );
}

export function addPropertydocumentsRealEstate(params) {
  return ApiService.post("clientes/api/companydocuments.php", params);
}
export function getRealDetails(id) {
  return ApiService.get(
    `fiancavelo/api/viewrealestateaprovesdetail.php?id=${id}`
  );
}
