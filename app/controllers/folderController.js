const folderService = require('../services/folderService')

class FolderController {
    async AllFolder(req, res) {
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];
            const folders = await folderService.AllFolder(accessToken)
            return res.json(folders);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    async viewFolder(req, res) {
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];
            const folder = await folderService.viewFolder(req.params.foldername, accessToken)
            return res.json(folder);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    async createFolder(req, res) {
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];
            const {folderName,parentName} = req.body
            const folder = await folderService.createFolder(folderName,parentName, accessToken)
            return res.json(folder);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    async updateName(req, res) {
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];
            const {newName} = req.body
            const folder = await folderService.updateName(newName,accessToken,req.params.foldername)
            return res.json(folder);

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    async moveFolder(req, res) {
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];
            const {newParentName} = req.body
            const folder = await folderService.moveFolder(newParentName,accessToken,req.params.foldername)
            return res.json(folder);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    async delete(req, res) {
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];
            await folderService.delete(accessToken,req.params.foldername)
            return res.status(200).json({message: 'Папка удалена и всё её содержимое'});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
}

module.exports = new FolderController()