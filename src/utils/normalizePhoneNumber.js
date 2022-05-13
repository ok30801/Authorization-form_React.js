import {parsePhoneNumberFromString} from 'libphonenumber-js'

const normalizePhoneNumber = (value) => {
    console.log('value', value)
    const phoneNumber = parsePhoneNumberFromString(value)
    if (!phoneNumber) {
        return value
    }
    return  (
        phoneNumber.formatInternational()
    )
}

export default normalizePhoneNumber