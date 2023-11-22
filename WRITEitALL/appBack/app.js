const express = require('express');
const cors = require('cors');

//Cargamos las variables de entorno(.env) en process.env
require('dotenv').config();
require('./config/db');

const app = express();
//Config Las peticiones se van a enviar en formato JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//GET /app/text
app.use('/api', require('./routes/api'));
//Rutas
const PORT = process.env.PORT || 3000;

//Servidor escuchando en el puerto 3000
app.listen(PORT, '172.16.38.20', () => {
  console.log(`Server listening on port ${PORT}`);
});