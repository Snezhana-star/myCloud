const Router = require('express').Router;
const AuthController = require('../controllers/authController')
const FolderController = require('../controllers/FolderController')
const authMiddleware = require('../middlewares/auth-middleware')
const router = new Router();


//auth
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/refresh-tokens', AuthController.refreshTokens)
//folder
router.get('/:foldername', authMiddleware, FolderController.viewFolder)
router.post('/create-folder', authMiddleware, FolderController.createFolder)

module.exports = router