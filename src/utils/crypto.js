const CryptoJS = require("crypto-js");

const SECRET_KEY = process.env.SECRET_KEY;

const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

const decrypt = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt }