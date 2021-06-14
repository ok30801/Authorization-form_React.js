const validatePhone = (phone) => {
    const result = /^(\+7|7|8)?[\s]?\(?[489][0-9]{2}\)?[\s]?[0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}$/

    if (!result.test(String(phone).toLowerCase())) {
        return ['Номер телефона не корректен!']
    }
}

export default validatePhone