const mongoose = require('mongoose');
let  ProjectSchema = new mongoose.Schema(
{
    nom_projet : {type : String},
    description :{type:String},
    date_debut : {type : String,default:Date.now},
    duree      : {type:Number},
    chef_projet: {type : String},
    taches     :[{
        _id:{type:mongoose.Types.ObjectId,_id:true},
        nom_tache : {type:String , required:true},
        description :String,
        date_debut :{type:Date,default:Date.nom},
        duree       :Number,
        cout        :Number,
        responsable :String,
        priorite    :String
    }]
});
module.exports = mongoose.model('Project', ProjectSchema);
