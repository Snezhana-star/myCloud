const folderService = require('../services/folderService')

class FolderController {
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

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    async updateName(req, res) {
        try {

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    async moveFolder(req, res) {
        try {

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    async delete(req, res) {
        try {

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
}

module.exports = new FolderController()