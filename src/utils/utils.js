import { RESET_OBJECT_PROPOSE } from "@/core/store/core.module.js";
import { RESET_VALUES_ATTACHMENT_CHECKOUT_END } from "@/core/store/velo-fianca/checkout.module.js";
import { RESET_VALUES_ATTACHMENT } from "@/core/store/velo-fianca/attachment.module.js";
import { RESET_VALUES_DETAIL } from "@/core/store/velo-fianca/propertyDetails.module.js";
import { RESET_VALUES_LOCATION } from "@/core/store/velo-fianca/packLocation.module.js";
import { RESET_VALUES_TENANT } from "@/core/store/velo-fianca/tenant.module.js";

export function formatNameFile(nameFile, hash) {
  if (nameFile) {
    var regex = /^([^\\]*)\.(\w+)$/;
    var matches = nameFile.match(regex);

    if (matches) {
      var filename = matches[1];
      var extension = matches[2];
    }

    return `${filename}_${hash}.${extension}`;
  }
}

export function getExtensionFile(nameFile) {
  if (nameFile) {
    var regex = /^([^\\]*)\.(\w+)$/;
    var matches = nameFile.match(regex);

    if (matches) {
      var extension = matches[2];
    }

    return extension;
  }
}

export function formatZipcode(zipcode) {
  if (zipcode) {
    return zipcode.replace("-", "");
  }
}

export function formatBirth(birth) {
  if (birth) {
    const [day, month, year] = birth.split("/");

    return `${year}-${month}-${day}`;
  }
}

export function unformatBirth(birth) {
  if (birth) {
    const [year, month, day] = birth.split("-");

    return `${day}/${month}/${year}`;
  }
}

export function formatDocument(type, document) {
  switch (type.toUpperCase()) {
    case "CPF":
      return document.replaceAll(".", "").replace("-", "");

    case "CNPJ":
      return document.replaceAll(".", "").replace("/", "").replace("-", "");
  }
}

export function getAvatarDefault(name) {
  if (name) {
    const partsName = name.trim().split(" ");

    return `https://ui-avatars.com/api/?name=${
      partsName[0].substr(0, 1) + partsName[partsName.length - 1].substr(0, 1)
    }`;
  } else {
    return "https://ui-avatars.com/api/?name=";
  }
}

export function newHashToken() {
  String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  };

  String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  };

  var date = new Date();
  var components = [
    date.getYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  ];

  var variableResult = Math.random().toString(36).replace("0.", "");
  var result = (+components.join("")).toString(36) + (+new Date()).toString(36);

  return result.splice(
    Math.floor(Math.random() * (result.length - 1)),
    0,
    variableResult
  );
}

export function unformatPhone(phone) {
  if (phone) {
    return phone
      .replace(" ", "")
      .replace("(", "")
      .replace(")", "")
      .replace("-", "");
  }
}

export function formatPhone(phone) {
  if (phone) {
    return phone
      .replace(/\D+/g, "")
      .replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
  }
}

export function unformatString(string, locale) {
  if (string) {
    const verifyString =
      String(string).split("R$")[1] === undefined
        ? Number(string).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        : string;

    var parts = (1234.5).toLocaleString(locale).match(/(\D+)/g);
    var unformatted = verifyString.split("R$")[1];

    unformatted = unformatted.split(parts[0]).join("");
    unformatted = unformatted.split(parts[0]).join("");
    unformatted = unformatted.split(parts[1]).join(".");

    return parseFloat(unformatted);
  }
}

export function verifyTypeProperty() {
  const sessionStorageItem = JSON.parse(sessionStorage.getItem("data"));

  if (
    sessionStorageItem === null ||
    sessionStorageItem.objectPropose === undefined ||
    sessionStorageItem.objectPropose.type === "Comercial" ||
    sessionStorageItem.objectPropose.type == "2"
  ) {
    return [
      { id: 5, name: "Sala" },
      { id: 6, name: "Loja" },
      { id: 7, name: "Galpão" },
    ];
  } else {
    return [
      { id: 1, name: "Casa" },
      { id: 2, name: "Apartamento" },
      { id: 3, name: "Kitnet" },
    ];
  }
}

export function organizePersons(array) {
  const tmp = Array.from(array);

  let result = tmp.findIndex(
    ({ type }) => type === "Empresa" || type === "Responsável"
  );

  if (result > -1) {
    var element = tmp[result];
    tmp.splice(result, 1);
    tmp.splice(0, 0, element);
  }

  return tmp;
}

export function CapitalizeString(string) {
  if (string) {
    return string.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
  }
}

export function sessionStorageData() {
  return JSON.parse(sessionStorage.getItem("data"));
}

export function resetStateVuex(self) {
  const { $store } = self;

  $store.dispatch(RESET_VALUES_ATTACHMENT_CHECKOUT_END);
  $store.dispatch(RESET_VALUES_ATTACHMENT);
  $store.dispatch(RESET_VALUES_DETAIL);
  $store.dispatch(RESET_VALUES_LOCATION);
  $store.dispatch(RESET_VALUES_TENANT);
  $store.dispatch(RESET_OBJECT_PROPOSE);
}

export function verifyRisk(idrisk) {
  switch (Number(idrisk)) {
    case 3: // Risco médio
    case 4: // Risco Baixo
    case 5: // Risco muito baixo
      // Aprovado
      return true;

    default:
      // Reprovado
      return false;
  }
}
