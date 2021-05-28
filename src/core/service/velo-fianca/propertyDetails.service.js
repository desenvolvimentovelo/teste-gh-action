import ApiService from "@/core/service/api.service";

export function getProposeValue(id) {
    return ApiService.get(`fiancavelo/api/object.php?where=propose&value=${id}`);
}

export function editProperty(params) {
    return ApiService.put("fiancavelo/api/property.php", params);
}

export function addProperty(params) {
    return ApiService.post("fiancavelo/api/property.php", params);
}

export function addObject(params) {
    return ApiService.post("fiancavelo/api/object.php", params);
}