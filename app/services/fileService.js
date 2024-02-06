const File = require('../models/File')
const path = require('path')
const jwt = require("jsonwebtoken");
const Folder = require("../models/Folder");
const uuid = require('uuid')
const fs = require('fs')

class FileService {
    async upload(file, foldername, accessToken) {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decodedToken.user._id;
        const ownFolder = await Folder.findOne({name: foldername, userId: userId})
        if (!ownFolder) {
            throw new Error('Доступ запрещён')
        }
        const fileName = uuid.v4() + '.' + file.name.split('.')[1];
        const filePath = path.resolve('files', fileName)
        const newFile = await File.create({name: fileName, filePath: filePath, folderId: ownFolder._id})
        file.mv(filePath)
        return newFile
    }

    async delete(accessToken, filename) {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decodedToken.user._id;
        const file = await File.findOne({name: filename})
        if (!file) {
            throw new Error('Такого файла не существует')
        }
        const folder = await Folder.findOne({_id: file.folderId})
        const ownFolder = await Folder.findOne({_id: folder._id, userId: userId})
        if (!ownFolder) {
            throw new Error('Доступ запрещён')
        }
        await File.deleteOne({_id: file._id})
        fs.unlink('files/' + file.name, err => {
            if (err) throw err;
            console.log('Файл успешно удалён');
        })
    }
}

module.exports = new FileService()
