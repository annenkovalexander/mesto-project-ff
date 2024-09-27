export const clearValidation = (profileForm, validationConfig) => {
    const inputFields = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const submitButton = profileForm.querySelector(validationConfig.submitButtonSelector);
    inputFields.forEach(inputField => {
        const errorElement = profileForm.querySelector(`.${inputField.id}-error`);
        errorElement.textContent = "";
        errorElement.classList.remove(validationConfig.errorClass);
        inputField.classList.remove(validationConfig.inputErrorClass);
    })
    submitButtonStatus(submitButton, inputFields, validationConfig);
    console.log("clearValidation submitButtonStatus: ", [submitButton]);
    console.log("clearValidation submitButtonStatus: ", [inputFields]);
}

const showInputError = (inputField, errorElement, validationConfig) => {
    inputField.classList.add(validationConfig.inputErrorClass);
    inputField.validity.patternMismatch && inputField.type === 'text' ? inputField.setCustomValidity(inputField.dataset.errorMessage) : inputField.setCustomValidity('');
    errorElement.textContent = inputField.validationMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

const hideInputError = (inputField, errorElement, validationConfig) => {
    inputField.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
    inputField.setCustomValidity('');
}

const submitButtonStatus = (submitButton, inputFields, validationConfig) => {
    const validityStatusArray = inputFields.map(inputField => isValid(inputField));
    if (validityStatusArray.some(item => !item )){
        submitButton.classList.add(validationConfig.inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(validationConfig.inactiveButtonClass);
        submitButton.disabled = false;
    }
}

const inputFieldStatus = (formElement, inputFields, validationConfig) => {
    inputFields.forEach(inputField => {
        const errorElement = formElement.querySelector(`.${inputField.id}-error`);
        inputField.setCustomValidity('');
        if (!isValid(inputField))
            showInputError(inputField, errorElement, validationConfig);
        else
            hideInputError(inputField, errorElement, validationConfig);
    });
}

const isValid = inputField => inputField.validity.valid;

const updateFieldStatus = (formElement, inputFields, submitButton, validationConfig) => {
    submitButtonStatus(submitButton, inputFields, validationConfig);
    inputFieldStatus(formElement, inputFields, validationConfig);
}

const setEventListeners = (formElement, validationConfig) => {
    const inputFields = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
    submitButtonStatus(submitButton, inputFields, validationConfig);
    inputFieldStatus(formElement, inputFields, validationConfig);
    inputFields.forEach(inputField => {
        inputField.addEventListener('input', () => updateFieldStatus(formElement, inputFields, submitButton, validationConfig));
    });
}

export const enableValidation = (validationConfig) => {
    const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formsList.forEach(form => setEventListeners(form, validationConfig));
}