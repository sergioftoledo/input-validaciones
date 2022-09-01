export function valid(input) {
    const inputType = input.dataset.tipo;
    if (validators[inputType]) {
        validators[inputType](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = showErrorMessage(inputType, input);
    }
}

const errorTypes = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'

]

const errorMesseges = {
    name: {
        valueMissing: 'El campo nombre no puede estar vacío'
    },
    email:  {
        valueMissing: 'El campo email no puede estar vacío',
        typeMismatch: 'El correo no es válido'
    },
    password:  {
        valueMissing: 'El campo constraseña no puede estar vacío',
        patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.'
    },
    nacimiento:  {
        valueMissing: 'El campo fecha de nacimineto no puede estar vacío',
        customError: 'Debes tener al menos 18 años de edad'
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: ' El formato requerido es 1234567890'
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La dirección debe contener de 10 a 40 caracteres'
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La Ciudad debe contener 4 a 30 caracteres'
    },
    provincia: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La Provincia debe contener de 3 a 40 caracteres'
    }
}

const validators = {
    nacimiento: (input) => validateBirth(input)
}

function showErrorMessage(inputType, input) {
    let message = '';
    errorTypes.forEach(error => {
        if (input.validity[error]) {
            message = errorMesseges[inputType][error]
        }
    })

    return message
}

function validateBirth(input) {
    const clientDate = new Date(input.value);
    let message = '';
    if (!adult(clientDate)) {
        message = 'debe tener al menos 18 años de edad'
    }

    input.setCustomValidity(message)
}

function adult(date) {
    const currentDate = new Date();
    const dateDifference = new Date(
        date.getUTCFullYear() + 18,
        date.getUTCMonth(),
        date.getUTCDate());
        
    return dateDifference <= currentDate;
}