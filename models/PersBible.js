var mongoose = require('mongoose');
var persBibleSchema = new mongoose.Schema({
    name :String,
    number:Number, 
    description:String,
    picture: String,
    types: String,
    color : String
});
var PersBible = mongoose.model('persBible',persBibleSchema);
module.exports = PersBible;