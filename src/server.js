const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const tasks =[
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
    console.log('fsfsfdf');
    tasks.push({
        id:"4",
        name:"Carlos",
        completed:false
        }
    );
    res.send(tasks)
});

app.get("/:id",(req, res)=>{
    const taskId = req.params.id;
    console.log(taskId);
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (!task) return res.status(200).send("No encontrado");
    res.send(task)
});

app.post("", (req,res)=>{
    const task ={
        id: tasks.length+1,
        name:req.body.name,
        completed:req.body.completed
    }
    tasks.push(task);
    res.status(200).send(task);
});




app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`App at: http://localhost:${port}`);
    }
});

module.exports = app;
