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
        const customerId = req.params.id;
        const updateData = req.body;
        const updatedCustomer = await authService.updateCustomerService(customerId, updateData);
        res.status(200).json({ message: 'Customer updated successfully', updatedCustomer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getUserDataController = async (req, res) => {
    try {
        const userId = req.params.id; 
        const user = await authService.getUserDataService(userId); 

        res.status(200).json({ message: 'User data fetched successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {getUserDataController, signupController, loginController, resetPasswordController, recoverAccountController, updateCustomerController };