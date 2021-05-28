import ApiService from "@/core/service/api.service";

export function getProposeActive() {
    return ApiService.get(`fiancavelo/api/viewproposeactive.php`);
}
