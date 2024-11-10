const User = require('../models/customerModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailService = require('./emailService');

const signupService = async (data) => {
    const { firstName, lastName, email, password } = data;

    const users = await User.find({ email });
    if (users.length > 0) throw new Error('Email already registered.');

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    return newUser;
};

const loginService = async (email, password) => {
    const users = await User.find({ email });
    const user = users[0]; 
    if (!user) throw new Error('User not found.');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials.');

    const token = user.generateJWT();
    return { token, user };
};

const resetPasswordService = async (email) => {
    const users = await User.find({ email });
    const user = users[0]; 
    if (!user) throw new Error('No account associated with this email.');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    await emailService.sendResetPasswordEmail(email, token);
};

const recoverAccountService = async (token, newPassword) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const users = await User.find({ _id: decoded.id, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        const user = users[0]; 

        if (!user) throw new Error('Invalid or expired reset token.');

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error while recovering account.');
    }
};

const updateCustomerService = async (customerId, updateData) => {
    try {
        const updatedCustomer = await User.findByIdAndUpdate(
            customerId, // Use _id directly here
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedCustomer) {
            throw new Error('Customer not found');
        }

        return updatedCustomer;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = { signupService, loginService, resetPasswordService, recoverAccountService, updateCustomerService };
