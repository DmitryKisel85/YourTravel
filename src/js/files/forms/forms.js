// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { flsModules } from "../modules.js";
// Вспомогательные функции
import { _slideUp, _slideDown, _slideToggle } from "../functions.js";

//================================================================================================================================================================================================================================================================================================================================

/*
Документация: https://template.fls.guru/template-docs/rabota-s-formami.html
*/

// Работа с полями формы. Добавление классов, работа с placeholder
export function formFieldsInit(options = { viewPass: false }) {
	// Если включено, добавляем функционал "скрыть плейсходлер при фокусе"
	const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
	if (formFields.length) {
		formFields.forEach((formField) => {
			if (!formField.hasAttribute("data-placeholder-nohide")) {
				formField.dataset.placeholder = formField.placeholder;
			}
		});
	}
	document.body.addEventListener("focusin", function (e) {
		const targetElement = e.target;
		if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = "";
			}
			if (!targetElement.hasAttribute("data-no-focus-classes")) {
				targetElement.classList.add("_form-focus");
				targetElement.parentElement.classList.add("_form-focus");
			}
			formValidate.removeError(targetElement);
		}
	});
	document.body.addEventListener("focusout", function (e) {
		const targetElement = e.target;
		if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = targetElement.dataset.placeholder;
			}
			if (!targetElement.hasAttribute("data-no-focus-classes")) {
				targetElement.classList.remove("_form-focus");
				targetElement.parentElement.classList.remove("_form-focus");
			}
			// Моментальная валидация
			if (targetElement.hasAttribute("data-validate")) {
				formValidate.validateInput(targetElement);
			}
		}
	});

	// Если включено, добавляем функционал "Показать пароль"
	if (options.viewPass) {
		document.addEventListener("click", function (e) {
			let targetElement = e.target;
			if (targetElement.closest('[class*="__viewpass"]')) {
				let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
				targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
				targetElement.classList.toggle("_viewpass-active");
			}
		});
	}
}
// Валидация форм
export let formValidate = {
	getErrors(form) {
		let error = 0;
		let formRequiredItems = form.querySelectorAll("*[data-required]");
		if (formRequiredItems.length) {
			formRequiredItems.forEach((formRequiredItem) => {
				if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
					error += this.validateInput(formRequiredItem);
				}
			});
		}
		return error;
	},
	validateInput(formRequiredItem) {
		let error = 0;
		if (formRequiredItem.dataset.required === "email") {
			formRequiredItem.value = formRequiredItem.value.replace(" ", "");
			if (this.emailTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		} else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
			this.addError(formRequiredItem);
			error++;
		} else {
			if (!formRequiredItem.value.trim()) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		}
		return error;
	},
	addError(formRequiredItem) {
		formRequiredItem.classList.add("_form-error");
		formRequiredItem.parentElement.classList.add("_form-error");
		let inputError = formRequiredItem.parentElement.querySelector(".form__error");
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (formRequiredItem.dataset.error) {
			formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
		}
	},
	removeError(formRequiredItem) {
		formRequiredItem.classList.remove("_form-error");
		formRequiredItem.parentElement.classList.remove("_form-error");
		if (formRequiredItem.parentElement.querySelector(".form__error")) {
			formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
		}
	},
	formClean(form) {
		form.reset();
		setTimeout(() => {
			let inputs = form.querySelectorAll("input,textarea");
			for (let index = 0; index < inputs.length; index++) {
				const el = inputs[index];
				el.parentElement.classList.remove("_form-focus");
				el.classList.remove("_form-focus");
				formValidate.removeError(el);
			}
			let checkboxes = form.querySelectorAll(".checkbox__input");
			if (checkboxes.length > 0) {
				for (let index = 0; index < checkboxes.length; index++) {
					const checkbox = checkboxes[index];
					checkbox.checked = false;
				}
			}
			if (flsModules.select) {
				let selects = form.querySelectorAll(".select");
				if (selects.length) {
					for (let index = 0; index < selects.length; index++) {
						const select = selects[index].querySelector("select");
						flsModules.select.selectBuild(select);
					}
				}
			}
		}, 0);
	},
	emailTest(formRequiredItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
	},
};
