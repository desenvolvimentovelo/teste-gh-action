import ApiService from "@/core/service/api.service";

export function getMessage(id) {
  return ApiService.get(
    `fiancavelo/api/viewmessagedisapproved.php?id_propose=${id}`
  );
}
