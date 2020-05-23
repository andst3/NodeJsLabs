const mongoose = require('mongoose');
const User = require('../models/users');

const users = [{
    name: 'Andrey',
    email: 'andrey@mail.com',
    age: 20
},
    {
        name: 'Andriano',
        email: 'andrey@mail.com',
        age: 25
    },
    {
        name: 'Sanya',
        email: 'Sanya',
        age: 20
    },
    {
        name: 'Ilysha',
        email: 'ilyasha@mail.com',
        age: -1
    },
    {
        name: 'T',
        email: 't@mail.com',
        age: 19
    },
    {
        name: "Vadem",
        email: 'vadem@mail.com',
        age: 19
    }
];

describe("Test Model", () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://Andrey:1@mongotestnodejs-4xtmt.azure.mongodb.net/tests?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    });
    test.each(users)('Testing users', async (user) => {
        const model = new User(user);
        await model.save().then(data => expect(data).toHaveProperty('id')).catch(err => fail());
    });
});