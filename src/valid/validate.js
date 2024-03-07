const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

const validatePhoneNumber = (phone) => {
    let re = /^0\d{9}$/;
    return re.test(phone)
}

const validatePassword = (password) => {
    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/
    return re.test(password)
}

module.exports = {
    validateEmail, validatePassword, validatePhoneNumber
}