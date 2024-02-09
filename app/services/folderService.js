const Folder = require('../models/Folder')
const jwt = require('jsonwebtoken')

class FolderService {
    async AllFolder(accessToken) {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decodedToken.user._id;
        const folders = await Folder.find({userId: userId})
        return folders;
    }

    async viewFolder(foldername, accessToken) {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decodedToken.user._id;
        const ownFolder = await Folder.findOne({name: foldername, userId: userId})
        if (!ownFolder) {
            throw new Error('Доступ запрещён')
        }
        return ownFolder;
    }

    async createFolder(folderName, parentName, accessToken) {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decodedToken.user._id;
        const folderRepeat = await Folder.findOne({name: folderName, userId: userId})
        if (folderRepeat) {
            throw new Error('Папка с таким названием уже существует')
        }
        if (!parentName) {
            const rootFolder = await Folder.findOne({name: 'root', userId: userId})
            const newFolder = await Folder.create({name: folderName, userId: userId, parentId: rootFolder._id})
            return newFolder;
        } else if (parentName) {
            const parentFolder = await Folder.findOne({name: parentName, userId: userId})
            if (!parentFolder) {
                throw new Error('Папки для записи с таким названием не существует')
            }
            const newFolder = await Folder.create({name: folderName, userId: userId, parentId: parentFolder._id})
            return newFolder;
        }
    }

    async updateName(newName, accessToken, foldername) {
        if (foldername === 'root') {
            throw new Error('Нельзя изменить корневую папку')
        }
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decodedToken.user._id;
        const ownFolder = await Folder.findOne({name: foldername, userId: userId})
        if (!ownFolder) {
            throw new Error('Доступ запрещён')
        }
        ownFolder.name = newName
        const updatedFolder = await ownFolder.save();
        return updatedFolder
    }

    async moveFolder(newParentName, accessToken, foldername) {
        if (foldername === 'root') {
            throw new Error('Нельзя изменить корневую папку')
        }
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decodedToken.user._id;
        const ownFolder = await Folder.findOne({name: foldername, userId: userId})
        if (!ownFolder) {
            throw new Error('Доступ запрещён')
        }
        const newParent = await Folder.findOne({name: newParentName, userId: userId})
        if (!newParent) {
            throw new Error('Такой папки нет')
        }
        ownFolder.parentId = newParent._id
        const updatedFolder = await ownFolder.save();
        return updatedFolder
    }

    async delete(accessToken, foldername) {
        if (foldername === 'root') {
            throw new Error('Нельзя удалить корневую папку')
        }
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decodedToken.user._id;
        const ownFolder = await Folder.findOne({name: foldername, userId: userId})
        if (!ownFolder) {
            throw new Error('Доступ запрещён')
        }
        await Folder.deleteOne({_id: ownFolder._id})
        await Folder.deleteMany({parentId: ownFolder._id})
    }
}

module.exports = new FolderService()

