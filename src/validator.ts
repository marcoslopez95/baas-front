export const required = value => (value  ? true : '* Required')
export const password = (pass) => {
    const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; if (validate.test(pass)) {
        return true;
    } return 'Format password inavlid';
};
export const email = (email) => {
    const validate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (validate.test(email)) { return true; } return 'Format email invalid';
};
export const onlyLetters = (email) => {
    const validate = /^[A-ZÁÉÍÓÚÑ ]+$/i;
    if (validate.test(email)) { return true; } return 'Only letters';
};
export const onlyNumbers = (number) => {
    const validate = /^[0-9 ]+$/i; if (validate.test(number)) { return true; } return 'Only numbers';
};
export const confirmPassword = (value, confirm) => value === confirm || 'Passwords not equals'
export const between = (value, min, max) => () => {
    const valueAsNumber = Number(value)
    return (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) || `Enter number between ${min} and ${max}`
}