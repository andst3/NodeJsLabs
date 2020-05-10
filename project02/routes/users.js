const {Router} = require('express');
const User = require('../src/models/user');
const router = Router();
const auth = require('../src/middleware/auth');

router.get('/users', async (req, res) => {
    const users = await User.find({});
    res.send(users);
});

router.post('/users', async (req, res) => {
    let user = new User({
        firstName: req.body.firstName,
        age: req.body.age,
        password: req.body.password,
        email: req.body.email
    });

    console.log(user);

    await user.generateAuthToken();

    user.save().then(() => {
        console.log('Successful');
    }).catch((err) => {
        console.log(err.message);
    });
    res.status(202).send();
});

router.get('/user/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    await user.populate('tasks').execPopulate();
    console.log('Вот:', user.tasks);
    // console.log(user);
    res.send(user);
});

router.delete('/user/:id', async (req, res) => {
    await User.deleteOne({_id: req.params.id});
    res.status(200).send();
});

router.put('/user/:id', async (req, res) => {
    let user = await User.updateOne({_id: req.params.id}, req.body);

    // user.save();
    res.status(201).send();
});

router.post('/users/login', async (req, res) => {
    try{

        const user = await User.findOneByCredentials(req.body.email, req.body.password);
        let token = await user.generateAuthToken();
        // if(!user.tokens[0])
        //     token = await user.generateAuthToken();
        // else
        //     token = user.tokens[0].token;
        res.send({user, token});
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/users/me', auth, (req, res) => {
    res.send(req.user);
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        console.log('Вот:', req.user.tokens);
        req.user.tokens = req.user.tokens.filter((token) => {
        // console.log(token.token != req.token)
        return token.token != req.token;
    });
    await req.user.save();
    res.send();
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send('Logout from all devices');
    } catch(e) {
        res.status(500).send(e.message);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {

        await req.user.remove();
        res.send(req.user);

    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/users/me', auth, async (req, res) => {
    try {
        await req.user.update(req.body);
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;