const Router = require('express').Router;
const AuthController = require('../controllers/authController')
const FolderController = require('../controllers/FolderController')
const FileController = require('../controllers/FileController')
const authMiddleware = require('../middlewares/auth-middleware')
const router = new Router();


//auth
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/refresh-tokens', AuthController.refreshTokens)
//folder
router.get('/', authMiddleware, FolderController.AllFolder)
router.get('/:foldername', authMiddleware, FolderController.viewFolder)
router.post('/create-folder', authMiddleware, FolderController.createFolder)
router.post('/:foldername/update', authMiddleware, FolderController.updateName)
router.post('/:foldername/move', authMiddleware, FolderController.moveFolder)
router.delete('/:foldername/delete', authMiddleware, FolderController.delete)
//file
router.post('/:foldername/upload', authMiddleware, FileController.upload)
router.delete('/:filename/deletefile', authMiddleware, FileController.delete)

module.exports = router