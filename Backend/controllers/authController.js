const authService = require('../services/authServices');

const signupController = async (req, res) => {
    try {
        const newUser = await authService.signupService(req.body);
        const token = newUser.generateJWT();
        res.status(201).json({ message: 'User registered successfully', user: newUser, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.loginService(email, password);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const resetPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        await authService.resetPasswordService(email);
        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const recoverAccountController = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await authService.recoverAccountService(token, newPassword);
        res.status(200).json({ message: 'Password updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateCustomerController = async (req, res) => {
    try {
        const email = req.params.id;
        const updateData = req.body;
        const updatedCustomer = await authService.updateCustomerService(email, updateData);
        res.status(200).json({ message: 'Customer updated successfully', updatedCustomer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupController, loginController, resetPasswordController, recoverAccountController, updateCustomerController };