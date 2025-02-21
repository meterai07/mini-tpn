const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require('../../utils/crypto');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    if (this.isModified('email')) this.email = encrypt(this.email);
    if (this.isModified('fullname')) this.fullname = encrypt(this.fullname);
    if (this.isModified('phoneNumber')) this.phoneNumber = encrypt(this.phoneNumber);

    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.post('find', function (docs) {
    docs.forEach((doc) => {
        if (doc.email) doc.email = decrypt(doc.email);
        if (doc.fullname) doc.fullname = decrypt(doc.fullname);
        if (doc.phoneNumber) doc.phoneNumber = decrypt(doc.phoneNumber);
    });
});

userSchema.post('findOne', function (doc) {
    if (doc) {
        if (doc.email) doc.email = decrypt(doc.email);
        if (doc.fullname) doc.fullname = decrypt(doc.fullname);
        if (doc.phoneNumber) doc.phoneNumber = decrypt(doc.phoneNumber);
    }
});

module.exports = mongoose.model('User', userSchema);