require ("dotenv").config();

const express = require('express');
const { default: mongoose } = require('mongoose');
const todoRouter = require('./routes/todosRoutes');

const PORT = process.env.PORT || 8080;
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const mongoDbUser = process.env.mongoDbUser;
const mongoDbPassword = process.env.mongoDbPassword;

mongoose.connect(`mongodb+srv://${mongoDbUser}:${mongoDbPassword}@cluster0.klz9ll1.mongodb.net/TodoAAppDb`)
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