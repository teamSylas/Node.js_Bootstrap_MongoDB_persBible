var mongoose = require('mongoose');
var typePers = new mongoose.Schema({
    name:String,
    color:{
        type:String,
        default:'red'
    }
});

typePers.virtual('emp',{
    ref:'PersBible',
    localField:'_id',
    foreignField : 'types'
    
})
typePers.set('toObject', { virtuals: true });
typePers.set('toJSON', { virtuals: true });

var TypePers = mongoose.model('TypePers', typePers);
module.exports = TypePers;