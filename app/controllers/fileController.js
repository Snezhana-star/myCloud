const fileService = require('../services/fileService')

class FileController {
    async upload(req, res) {
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];
            const file = await fileService.upload(req.files.file, req.params.foldername, accessToken)
            return res.json(file);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    async delete(req, res) {
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];
            await fileService.delete(accessToken, req.params.filename)
            return res.status(200).json({message: 'Файл удалён'});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
}

module.exports = new FileController()