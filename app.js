const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let Project = require('./models/projectModel')
var url = require('url');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/projets',function(err){
    if(err) console.log(err)
    console.log('connected')
})
app.use(bodyParser.json());
app.use(cors());
// id tache
let ObjectId = mongoose.Types.ObjectId;
id= new ObjectId;
let project = new Project({
nom_projet : 'projet 1',taches:[{'_id':id,'nom_tache':'tacheeeeeeeeeeeeeee'}]})
/*
project.save(function(err){
    if(err) console.log('err')
    console.log('project added')
})
*/

//CRUD create post, read get,update put , delete delete
// get all project
app.get('/',(req,res)=>{
    Project.find((err,projects)=>{
        if(err) console.log(err)
		res.status(200);
        res.json(projects);
    });
    console.log(url.parse(req.url).pathname)
    console.log('get all projects')
});

//get project by id
app.get('/getprojectbyid/:id',(req,res)=>{
    let id = req.params.id;
    Project.findOne({'_id':id},(err,projects)=>{
        if(err) console.log(err);
        res.json(projects);
    })
    console.log('url : '+url.parse(req.url).pathname)
    console.log('params id : '+req.params.id)
    console.log('get project by id')
})

//get project by name (search)
app.get('/getprojectbyname/:name',(req,res)=>{
    let name = req.params.name;
    Project.find({'nom_projet':name},(err,projects)=>{
        if(err) console.log(err);
        res.json(projects);
    })
    console.log('url : '+url.parse(req.url).pathname)
    console.log('params id : '+req.params.id)
    console.log('get project by id')
})

//get all tasks
app.get('/tasks',(req,res)=>{
    Project.find(null,'taches',(err,taches)=>{
        if(err) console.log(err)
        res.json(taches)
    })
    console.log(url.parse(req.url).pathname)
    console.log('get all tasks')
})

//get tasks by id
app.get('/taskbyid/:id',(req,res)=>{
    let id = req.params.id;
    Project.find({'taches._id':id},'taches',(err,taches)=>{
        if(err) console.log(err);
        res.json(taches)
    })
    console.log(url.parse(req.url).pathname)
    console.log('params id : '+req.params.id)
    console.log('get task by id')
})

//get project tasks by id
app.get('/taskbyprojectid/:id',(req,res)=>{
   let id = req.params.id;
    Project.find({'_id':id},(err,projects)=>{
        if(err) console.log(err);
        res.json(projects);
    })
    console.log('url : '+url.parse(req.url).pathname)
    console.log('params id : '+req.params.id)
    console.log('get project by id')

})


//insert new project
app.post('/addproject',(req,res)=>{
let project = new Project(req.body);
  project.save((err)=>{
 if(err){console.log(err)
        res.json({'project':'failed'})}
    console.log('project added')
    res.json({'project':err})
  })
});


//delete project not working
app.delete('/deleteproject/:id',(req,res)=>{
    let id = req.params.id;
    Project.findByIdAndRemove(id,(err)=>console.log(err));
	console.log('delete '+id+res);
        
    });

//update project
app.put('/updateproject/:id',(req,res)=>{
    let id = req.params.id;

})


app.listen(8085,()=>console.log('server running'));