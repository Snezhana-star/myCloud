const Folder = require('../models/Folder')
const jwt  = require('jsonwebtoken')
class FolderService {
    async viewFolder(foldername,accessToken){
        const folder = await Folder.findOne({name:foldername})
        if (!folder){
            throw new Error('Папки с таким названием нет')
        }
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decodedToken.user._id;
        const ownFolder = await Folder.findOne({name:foldername, userId:userId})
        if(!ownFolder){
            throw new Error('Доступ запрещён')
        }
        return folder;
    }
    async createFolder(){

    }
    async updateName(){

    }
    async moveFolder(){

    }
    async delete(){

    }
}
module.exports = new FolderService()

