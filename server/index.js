const express = require('express');
const { default: mongoose } = require('mongoose');
const todoRouter = require('./routes/todosRoutes');

const PORT = process.env.PORT || 8080;
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb+srv://Samir:1QiJIJLUyr52lVdw@cluster0.klz9ll1.mongodb.net/TodoAAppDb")
    .then(res => {
        console.log('Connect!');
    })
    .catch(err => {
        console.log('err', err);
    })

app.use('/api/todos', todoRouter);

app.get('/', function (req, res) {
    res.json("Hello");
})

app.listen(PORT);