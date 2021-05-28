import ApiService from "@/core/service/api.service";

export async function postAsaasPayment(params) {
  return await ApiService.post("pagamentovelo/api/asaaspayment.php", JSON.stringify(params));
}

export function getTokenDefault() {
  return ApiService.post(`http://dev.velo.com.br/app/users/api/login.php`, { email: 'admin', password: 'aba3qr9b' });
}

export async function getPaymentLink(params){
  await ApiService.get(`fiancavelo/api/propose.php?id=${params.propose}`).then((response) => {
    let data = `${process.env.VUE_APP_VELO}/payment?id=${response.data.return[0].hash}`
    let aux = document.createElement("input");
    aux.setAttribute("value", data);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    return data;
  });
}