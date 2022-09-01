import { valid } from "./validaciones.js";

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blur', input => {
        valid(input.target)
    })
})