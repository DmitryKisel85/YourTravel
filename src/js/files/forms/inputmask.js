/* Маски для полей (в работе) */

// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { flsModules } from "../modules.js";

// Подключение модуля
import "inputmask/dist/inputmask.min.js";

const inputMasks = document.querySelectorAll("input");
if (inputMasks.length) {
	flsModules.inputmask = Inputmask().mask(inputMasks);
}

const inputPhone = document.getElementById("phone");
const phoneMask = new Inputmask("+ 7 ( 9 9 9 ) 9 9 9 - 9 9 - 9 9", { showMaskOnHover: false });
phoneMask.mask(inputPhone);

const inputMail = document.getElementById("email");
const mailMask = new Inputmask({ alias: "email", showMaskOnHover: false });
mailMask.mask(inputMail);

const inputDateFrom = document.getElementById("date_from");
const dateFromMask = new Inputmask({ alias: "datetime", inputFormat: "dd.mm.yyyy", showMaskOnHover: false });
dateFromMask.mask(inputDateFrom);

const inputDateTo = document.getElementById("date_to");
const dateToMask = new Inputmask({ alias: "datetime", inputFormat: "dd.mm.yyyy", showMaskOnHover: false });
dateToMask.mask(inputDateTo);
