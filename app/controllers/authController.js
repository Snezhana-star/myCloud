const authService = require('../services/authService')

class AuthController {

    async register(req, res) {
        try {
            const {login, password} = req.body;
            const userData = await authService.register(login, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    async login(req, res) {
        try {
            const {login, password} = req.body;
            const userData = await authService.login(login, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    async logout(req, res) {
        try {
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            return res.status(400).json({message: error.message});
        }
    }

    async refreshTokens(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            return res.status(400).json({message: error.message});
        }
    }

}

module.exports = new AuthController()