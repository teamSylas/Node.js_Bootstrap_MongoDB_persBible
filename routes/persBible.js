//var express = require('express');
var router = require('express').Router();

// definition de la route vert la base de donnee
// pour recuper tous les personnage 

var PersBible = require('./../models/PersBible') 
// recuperation des types 
//console.log(PersBible)

//=====================================********========================================
// page principale
router.get('/liste',function(req,res){
    PersBible.find({},function(err,docs){
        if(err) res.json(err);
        else res.render('persBible/index.html',{persBible:docs}
        );
    });
})
// page de liste
router.get('/', (req, res) => {
        // on recupert tous persbible, puis tous les type associer, pui les reuper dans un objet
        //db.getCollection('persBible').find({})
       // PersBible.find({}).populate('types').then(persBible => {
            res.render('typPers/show.html');
        
    } ); 
// cration d'un personage
router.get('/new',function(req,res){
    PersBible.find({},function(err,docs){
        if(err) res.json(err);
        else res.render('persBible/formulaire.html',{persBible:docs,endpoint: '/'}
        );
    });
})
// rengistement d'un personage 
router.post('/new',function(req,res){
    new PersBible({
        name       : req.body.name,
        number     : req.body.number, 
        description: req.body.description,
        types      : req.body.types,
        color      : req.body.color,
        picture    : req.body.file
    }).save(function(err,doc){
        if(err) res.json(err);
        else res.render('persBible/index.html')
        //else res.redirect('persBible/formulaire.html')
    })
})

        // recuperer un personnage pas son ID puis on recuper aussi le parametre id 

router.get('/:id', (req,res) =>{
        // pui on re
        PersBible.findById(req.params.id).then(persBible =>{
            // puis on affiche notre personnage biblique page html
            // et a joute un parametre quiest notre personage 
            res.render('persBible/show.html',{ persBible : persBible })
        }, 
        err => res.status(500).send(err));
    });
// voire les types 
    router.get('/typPers/:types',function(req,res){
             res.render('typPers/show.html');
            
        
    })
// surprimer 
    router.get('/delete/:id',(req,res)=>{
        PersBible.findOneAndRemove({ _id: req.params.id}).then(()=>{
            res.redirect('/')
        })
    })

 //   edition d'un personnage existant 
    router.get('/formulaire/:id',(req, res) =>{
        
            PersBible.findById(req.params.id).then(persBible =>{
                // puis on passe ce qu'on recupere au templete en faisant l'objet : lui meme
                res.render('persBible/formulaire.html',{ persBible : persBible, endpoint: '/' + persBible._id.toString()
                });
            }); 
        })
     
// pour les image 


router.post('/:id?',(req,res)=> {
        new Promise((resolve,reject)=> {
            // test si id passer en pametre existe 
            if(req.params.id){
                PersBible.findById(req.params.id).then(resolve,reject);
            }
            // si cree un nouveau pwersonnage
            else{
                resolve (new PersBible());
            }
        }).then(persBible => {
            persBible.name = req.body.name;
            persBible.description = req.body.description;
            persBible.number = req.body.number;
            persBible.types = req.body.types;
            persBible.color = req.body.color;
            if(req.file) persBible.picture = req.file.filename;
            return persBible.save();
            // pour fait en suite un troixieme .then pour rediriger l'utilisateur vers la page d'acceuille
        }).then(()=>{
            res.redirect('/');
        }, err => console.log(err));
    });

    
    // router.get('/:types',(req,res) => {
    //     PersBible.findOne({name:req.param.types}).then(types => {
    //         res.render('typPers/show.html',{persBible : persBible.types} )
    //     }, err => console.log(err));
    // } );

    // router.get('/formulaire/:id',(req, res) =>{
    //     res.render('persBible/formulaire.html',{persBible : req.PersBibleId });
    // })

    // router.param('id',function(req,res,next,id){
    //     PersBible.findById(id, function(err,docs){
    //         if(err)res.json(err);
    //         else{
    //             req.PersBibleId = docs;
    //             next();
    //         }
    //     });
    // });
    //router.set('view engine', 'handlebars');
//==========================================*************==============================
module.exports = router;