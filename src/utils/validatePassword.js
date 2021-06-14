export const validatePassword = (str) => {
    if (typeof str !== 'string') {
        return [false, 'Error in validatePassword']
    }
    if (str.length < 6) {
        return ['Пароль должен содержать не менее 6 символов']
    }
    /*if (str.search(/[a-z]/) === -1) {
        return ['Пароль должен содержать символы в нижнем регистре латинского алфавита'];
    }*/
    /*if (str.search(/[A-Z]/) === -1) {
        return ['Пароль должен содержать символы в верхнем регистре латинского алфавита'];
    }*/
    if (str.search(/[0123456789]/) === -1) {
        return ['Пароль должен содержать хотя бы одну цифру']
    }
    /*if (str.search(/[!@#$%^&*()\-=_+~[\]{}'"\\|,./<>?]/) === -1) {
        return [false, 'Password must contain at least one symbol'];
    }*/
    if (str.search(/\s/) !== -1) {
        return ['Пароль не должен содержать пробелов']
    }

    // return [true];
}
export default validatePassword