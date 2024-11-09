const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs'); 
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

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const hashedPassword = await bcryptjs.hash(this.password, 10);  
    this.password = hashedPassword;
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcryptjs.compare(password, this.password); 
};

userSchema.methods.generateJWT = function() {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
