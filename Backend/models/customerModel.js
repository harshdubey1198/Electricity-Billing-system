const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const customerSchema = new mongoose.Schema({
    customerID: { type: String,  default: null },
    firstName: { type: String, required: true, default: '' },
    lastName: { type: String, required: true, default: '' },
    meterID: { type: String,  default: null },
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zipCode: { type: String, default: '' }
    },
    phoneNumber: { type: String, default: '' },
    email: { type: String, unique: true, required: true },
    dateOfBirth: { type: Date, default: '' },
    billingCycle: { type: String, enum: ['Monthly', 'Quarterly'], default: 'Monthly' },
    profilePicture: { type: String, default: '' },
    previousBillHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill', default: [] }],
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
    resetPasswordToken: { type: String, default: '' },
    resetPasswordExpires: { type: Date, default: '' },
}, { timestamps: true });

customerSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const hashedPassword = await bcryptjs.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

customerSchema.methods.comparePassword = function(password) {
    return bcryptjs.compare(password, this.password);
};

customerSchema.methods.generateJWT = function() {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
