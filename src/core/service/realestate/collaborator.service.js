import ApiService from "@/core/service/api.service";

export function getCollaboratorRealestate(id) {
  return ApiService.get(
    `fiancavelo/api/colaborador.php?where=realestate&value=${id}`
  );
}
