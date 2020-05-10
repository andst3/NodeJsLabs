const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');
const tasksRouters = require('./routes/tasks');

const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(usersRoutes);
app.use(tasksRouters);

async function start()
{
    try {
        await mongoose.connect('mongodb+srv://Andrey:1@mongotestnodejs-4xtmt.azure.mongodb.net/project02', {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });

    } catch (err) {
        console.log(err);
    }
}

start();