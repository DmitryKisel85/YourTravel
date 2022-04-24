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
const phoneMask = new Inputmask("+ 7 ( 9 9 9 ) - 9 9 9 - 9 9 - 9 9");
phoneMask.mask(inputPhone);

const inputMail = document.getElementById("email");
const mailMask = new Inputmask({ alias: "email" });
mailMask.mask(inputMail);
