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
        nombre: "Tester",
        apellido:"Tester",
        direccion:"cra 4 # 7-8"
    }
];


/**
 * Obtener todos los usuarios
 */
app.get('/', (req, res) => {
    res.send(users);
});


/**
 * Obtener un usuario en especifico
 */
app.get("/user/:id",(req, res)=>{
    const taskId = req.params.id;
    console.log(taskId);
    const task = users.find(task => task.id === parseInt(taskId));
    if (!task) return res.status(404).send("Usuario no encontrado");
    res.send(task)
});


/**
 * Registrar un usuario
 */
app.post("", (req,res)=>{
    const task ={
        id: users.length+1,
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        direccion:req.body.direccion
    };
    users.push(task);
    res.status(201).send(task);
});

/**
 * Actualizar un usuairo
 */

app.put("/:id",(req,res)=>{
    const userId = req.params.id;
    const user = users.find(user => user.id === parseInt(userId));
    if(!user) return res.status(404).send("El usuario no existe");
    user.nombre=req.body.nombre;
    user.apellido=req.body.apellido;
    user.direccion=req.body.direccion;
    res.send(user)
});


/***
 * Eliminar un usuario
 */
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
