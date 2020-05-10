const {Router} = require('express');
const Task = require('../src/models/Task');
const router = Router();
const auth = require('../src/middleware/auth');

router.get('/tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.send(tasks);
});

router.get('/tasks/:id', auth, async (req, res) => {
    const task = await Task.findById(req.params.id);
    await task.populate('owner').execPopulate();
    try {
        if(req.user._id != task.owner.id)
            throw new Error();
        res.send(task);
    } catch (e) {
        res.status(401).send();
    }

});

router.post('/tasks', auth, async (req, res) => {
    let task = new Task({
        // description: req.body.description,
        // completed: req.body.completed
        ...req.body,
        owner: req.user.id
    });

    await task.save().then(() => {
        console.log('Successful');
    }).catch(err => {
        console.log(err.message);
    });

    res.status(200).send();
});

router.delete('/tasks/:id', async (req, res) => {
    await Task.deleteOne({_id: req.params.id});
    res.status(201).send();
});

router.put('/tasks/:id', async(req, res) => {
    let task = await Task.updateOne({_id: req.params.id}, req.body);
    res.status(202).send();
});

module.exports = router;