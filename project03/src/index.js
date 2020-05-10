const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/../public`));
app.use(cookieParser());

app.set('views', `${__dirname}/../public`);

app.set('view engine', 'ejs');

port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.render('index');
}).get('/chat', (req, res) => {
    // if(!req.cookies.login)
    //     return res.redirect('/');
    res.render('chat');
});

app.post('/chat', (req, res) => {
    try {
        if(!req.body.login || !req.body.room)
            throw new Error;

        // res.cookie('login', req.body.login, {
        //     maxAge: 30000
        // });

        res.send({status: 200, message: 'welcome'});
    } catch (e) {
        res.send(e.message);
    }

});

server.listen(port, () => {
    console.log('Server started on port', port);
});

let objUsers = {};
let arrayUsers = [];

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('join', ({username, room}) => {
        objUsers[socket.id] = username;
        socket.join(room);
        console.log(username, room);
        console.log('arrayUsers:', objUsers);

        let message = 'Welcome ' + username + '!';
        io.to(socket.id).emit('join', {arrayUsers: Object.values(objUsers), message});
        message = username + ' has joined!';
        socket.broadcast.to(room).emit('newJoin', {arrayUsers: Object.values(objUsers), message});

        socket.on('newMessage', msg => {
            socket.broadcast.to(room).emit('newMessage', {username, msg});
        })
        socket.on('disconnect', () => {
            delete objUsers[socket.id];
            let message = username + ' disconnected!'
            socket.to(room).emit('join', {arrayUsers: Object.values(objUsers), message});
        });
    });

});

// io.on('connection', (socket) => {
//     let message = 'New user connected';
//
//     console.log(message);
//     socket.emit('newConnection', message);
//     // socket.on('newMessage', (message) => {
//     //     io.emit('newMessage', message);
//     // });
//
//     socket.on('chat message', function (msg, callback) {
//         io.emit('chat message', msg);
//         callback("Message was delivered");
//     });
//
//     socket.on('join', ({username, room}) => {
//         socket.join(room);
//         console.log(username, room);
//         socket.emit('sendMessage', 'For user');
//         io.to(room).emit('sendMessage', 'For all in the room');
//         socket.broadcast.to(room).emit('sendMessage', 'For all in the room except us');
//         socket.on('newMessage', (message) => {
//             io.to(room).emit('newMessage', message);
//         });
//     });
//
// });

