import express from 'express'
import UserController from '../Controller/User/UserController.js'
import multer from 'multer'

const userRoutes = express.Router()

// company upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/logo')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })


userRoutes.post('/create-new-account', upload.single('logo'), UserController.UserAccountCreation)
userRoutes.post('/login', UserController.Login)
userRoutes.post('/checklogin', UserController.checkLogin)
userRoutes.get('/alluser', UserController.getAllUser)
userRoutes.get('/delete-all-user', UserController.deleteAllUser)

export default userRoutes