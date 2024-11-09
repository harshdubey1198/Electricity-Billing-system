const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
    profilePicture: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true });

userSchema.methods.hashPassword = function(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
};

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = this.hashPassword(this.password);
    next();
});

userSchema.methods.comparePassword = function(password) {
    const hashedPassword = this.hashPassword(password);
    return this.password === hashedPassword;
};

userSchema.methods.generateJWT = function() {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
