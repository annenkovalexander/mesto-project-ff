export const clearValidation = (profileForm, validationConfig) => {
    
    const inputFields = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    console.log("clearValidation inputFields:", inputFields);
    const submitButton = profileForm.querySelector(validationConfig.submitButtonSelector);
    submitButtonStatus(submitButton, inputFields, validationConfig);
    inputFields.forEach(inputField => {
        console.log("inputField: ", [inputField]);
        const errorElement = profileForm.querySelector(`.${inputField.id}-error`);
        errorElement.textContent = "";
        errorElement.classList.remove(validationConfig.errorClass);
        inputField.classList.remove(validationConfig.inputErrorClass);
    })

}

const submitButtonStatus = (submitButton, inputFields, props) => {
    const validityStatusArray = inputFields.map(inputField => isValid(inputField));
    if (validityStatusArray.some(item => !item )){
        submitButton.classList.add(props.inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(props.inactiveButtonClass);
        submitButton.disabled = false;
    }
}

const inputFieldStatus = (formElement, inputFields, props) => {
    inputFields.forEach(inputField => {
        console.log("inputField: ", [inputField]);
        console.log("inputField: ", inputField.validity);
        const errorElement = formElement.querySelector(`.${inputField.id}-error`);
        inputField.setCustomValidity('');
        if (!isValid(inputField)) {
            inputField.classList.add(props.inputErrorClass);
            inputField.validity.patternMismatch && inputField.type === 'text' ? inputField.setCustomValidity(inputField.dataset.errorMessage) : inputField.setCustomValidity('');
            errorElement.textContent = inputField.validationMessage;
            errorElement.classList.add(props.errorClass);
        } else {
            inputField.classList.remove(props.inputErrorClass);
            errorElement.classList.remove(props.errorClass);
            errorElement.textContent = "";
            inputField.setCustomValidity('');
        }
    });
}

const isValid = inputField => inputField.validity.valid;

const updateFieldStatus = (formElement, inputFields, submitButton, props) => {
    submitButtonStatus(submitButton, inputFields, props);
    inputFieldStatus(formElement, inputFields, props);
}

const setEventListeners = (formElement, props) => {
    const inputFields = Array.from(formElement.querySelectorAll(props.inputSelector));
    const submitButton = formElement.querySelector(props.submitButtonSelector);
    submitButtonStatus(submitButton, inputFields, props);
    inputFieldStatus(formElement, inputFields, props);
    inputFields.forEach(inputField => {
        inputField.addEventListener('input', () => updateFieldStatus(formElement, inputFields, submitButton, props));
    });
}

export const enableValidation = (props) => {
    console.log("enableValidation");
    const formsList = Array.from(document.querySelectorAll(props.formSelector));
    formsList.forEach(form => setEventListeners(form, props));
}