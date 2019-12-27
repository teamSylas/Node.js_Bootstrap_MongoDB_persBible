var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser')
var multer = require('multer')


var upload = multer({
    dest: __dirname + '/uploads'
})


// instansiation d'une nouvelle appliquation expresse 
var app = express();


// connection a la base de donnee 
mongoose.connect('mongodb://localhost/personnageBiblique', {useNewUrlParser: true});
//mongoose.connect('mongodb://localhost:27017/personnageBiblique', { useNewUrlParser: true });
// definition des modelle
require('./models/PersBible');
require('./models/TypePers');

// utilisation de body paster 

app.use(bodyParser.urlencoded());

// par cette ligne on dit a multer dans les formulaire sim un champs s'appelle files tu le save dans upload
app.use(upload.single('file'));

// pour recuper les image uplider il faut : 
// express.static permet a express de ce servire de ficher statique
app.use('/uploads', express.static(__dirname + '/uploads'));


//definition des router 
// on dit a express pout toutes le route qui commence pas / tu va utiliser : /routes/persBible
app.use('/', require('./routes/persBible'));

// et pour celle qui commence pas typePers on utilisera le router qui commence pas  ./routes/typePers
//app.use('/typePers', require('./routes/typePers'));


// utilisation d'un midelwe pour attindre le ficher scc
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))



// gestionnaire de temple nunjucks
nunjucks.configure('views',{
    autoescape:true, // echappe tous les caractaire HTML dans les variable
    express:app
});

app.set('view engine', 'handlebars','html');
//definition d'une nouvelle route pas la fonction get 
app.get('/',(req, res) =>{
    res.send('Sa marche')
})

console.log('personnage biblique lancer sur le port 5000');
app.listen(5000);