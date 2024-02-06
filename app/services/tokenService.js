const jwt = require('jsonwebtoken')
const Token = require('../models/Token')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "60m"})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "120m"})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId,refreshToken){
        const findToken = await Token.findOne({user:userId})
        if(findToken) {
            findToken.refreshToken = refreshToken
            return findToken.save();
        }
        const token = await Token.create({user: userId, refreshToken})
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({refreshToken})
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({refreshToken})
        return tokenData;
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService()