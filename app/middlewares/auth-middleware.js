const tokenService = require('../services/tokenService');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new Error('Пользователь не авторизован')
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            throw new Error('Пользователь не авторизован')
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            throw new Error('Неверный токен')
        }

        req.user = userData;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}
