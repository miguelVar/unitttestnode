const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const users =[
    {
        id:1,
        name:"Miguel",
        completed:false
    },
    {
        id:2,
        name:"Andres",
        completed:false
    },
    {
        id:3,
        name:"Carlos",
        completed:false
    }
];

app.get('/', (req, res) => {
    res.send(users)
});

app.get("/user/:id",(req, res)=>{
    const taskId = req.params.id;
    console.log(taskId);
    const task = users.find(task => task.id === parseInt(taskId));
    if (!task) return res.status(404).send("Usuario no encontrado");
    res.send(task)
});

app.post("", (req,res)=>{
    const task ={
        id: users.length+1,
        name:req.body.name,
        completed:req.body.completed
    };
    users.push(task);
    res.status(201).send(task);
});

app.put("/:id",(req,res)=>{
    const userId = req.params.id;
    const user = users.find(user => user.id === parseInt(userId));
    if(!user) return res.status(404).send("El usuario no existe");
    user.name=req.body.name;
    user.completed= req.body.completed;
    res.send(user)
});

app.delete("/:id",(req,res)=>{
    const userId = req.params.id;
    const user = users.find(user => user.id === parseInt(userId));
    if(!user) return res.status(404).send("El usuario no existe");

    const index = users.indexOf(user);
    users.splice(index,1);
    res.send(user)
});




app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`App at: http://localhost:${port}`);
    }
});

module.exports = app;
