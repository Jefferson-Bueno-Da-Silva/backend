//para comunicar com o arquivo .env
require('dotenv').config();

const express   = require('express');
const morgan    = require('morgan');
const mongoose  = require('mongoose');
const path      = require('path');

const app = express();

/*
    *DATA BASE SETUP
*/
mongoose.connect(
    process.env.MONGO_URL || "mongodb+srv://dbUser:871jeff871@dbapplication.mvkyo.mongodb.net/dbApplication?retryWrites=true&w=majority", 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//EXPRESS TRABALHAR COM JSON
app.use(express.json());
//EXPRESS TRABALHAR COM URL ENCONDED
app.use(express.urlencoded({ extended: true }));
//Mostra o status do request e o ping;
app.use(morgan('dev'));
//CONTROLA AS ROTAS DA PAGINA
app.use(require('./routes'));
//Imagens acessiveis por url
app.use( '/files', express.static( path.resolve(__dirname, '..', 'tmp', 'uploads') ) );
//Porta utilizada:
app.listen(3000)