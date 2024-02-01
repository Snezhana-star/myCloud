const User = require('../models/User')
const bcrypt = require('bcrypt');
const tokenService = require('../services/tokenService')
const Folder = require('../models/Folder')


class UserService {
    async register(login, password) {
        const finduser = await User.findOne({login})
        if (finduser) {
            throw new Error('login уже используется')
        }
        const hashPass = await bcrypt.hash(password, 7)
        const user = await User.create({login, password: hashPass})
        const tokens = tokenService.generateTokens({user})
        await tokenService.saveToken(user._id, tokens.refreshToken)
        await Folder.create({name:'root',userId:user._id})
        return {
            ...tokens, user
        }
    }


    async login(login, password) {
        const user = await User.findOne({login})
        if (!user) {
            throw new Error('Пользователя с таким логином не существует')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error('Неправильный пароль')
        }
        const tokens = tokenService.generateTokens({user});
        await tokenService.saveToken(user._id, tokens.refreshToken);
        return {
            ...tokens, user
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('Неаутентифицированный пользователь')
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new Error('Некорректный токен')
        }
        const user = await User.findById(userData.id);
        const tokens = tokenService.generateTokens({user});

        await tokenService.saveToken(user._id, tokens.refreshToken);
        return {...tokens, user}
    }
}

module.exports = new UserService()