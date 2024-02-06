const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./app/routes/router')
const fileUpload = require('express-fileupload')
require('dotenv').config()
const app = express()


app.use(express.json());
app.use(express.static('files'));
app.use(cookieParser());
app.use(fileUpload({}))
app.use(cors());
app.use('/api', router)
// app.use(errorMiddleware);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerDoc));

const PORT = process.env.PORT || 2000;
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {})
        app.listen(PORT, () => console.log(`сервер запущен на ${PORT}`))
    } catch (e) {
        console.log(e)
    }

}
start()