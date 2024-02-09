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

app.use('/api', router)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerDoc));

app.use(cors({
  origin: 'http://localhost:6000', // Разрешенный домен
  methods: ['GET', 'POST','DELETE'],      // Разрешенные HTTP-методы
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
  credentials: true,              // Передача куки и аутентификационных заголовков
}));

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