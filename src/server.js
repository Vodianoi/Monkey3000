const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const models = require('./models/index');
// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Add a bit of logging
app.use(morgan('short'));

// app.get('/', function (req, res) {
//     res.send('Hello World');
// });

// Get all the users defined
app.get('/', function (req, res) {
    models.User.findAll()
        .then((users) => {
            res.json(users)
        })
});

// Add a new user to the database
app.post('/', function(req, res) {
    models.User.create({
        username: req.body.username
    })
        .then(() => {
            res.send('User added !')
        })
});

app.get('/monkeys', function(req, res) {
    models.Monkey.findAll()
        .then((monkeys) => {
            res.json(monkeys)
        })
        .catch((err) => {
            res.json(err)
        })
});

app.post('/monkeys', function(req, res) {
    models.Monkey.create({
        name: req.body.name,
        taille: req.body.taille,
        enclos: req.body.enclos
    })
        .then((monkey) => {
            res.json(monkey);
        })
        .catch((err) => {
            res.json(err)
        })
});

app.put('/monkeys', function(req, res) {
    const promises = [];

    req.body.mutations
        .forEach((item) => {

            promises.push(
                models.Monkey.update(
                    item.data,
                    {
                        where: {
                            id: item.id
                        }
                    }
                )
            )

        });

    Promise.all(promises)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.json(err)
        })
});

app.delete('/monkeys', function(req, res) {
    models.Monkey.destroy({
        where: {
            id: req.body.ids
        }
    })
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            res.json(err)
        })
});

app.get('/monkeys/:id', function(req, res) {
    models.Monkey.findOne({
        id: req.params.id
    })
        .then((monkey) => {
            res.json(monkey)
        })
        .catch((err) => {
            res.json(err)
        })
});

app.put('/monkeys/:id', function(req, res) {
    models.Monkey.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
        })
        .then((monkey) => {
            res.json(monkey)
        })
        .catch((err) => {
            res.json(err)
        })
});

app.delete('/monkeys/:id', function(req, res) {
    models.Monkey.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.json(err)
        })
});



app.param(['name'], (req, res, next, name) => {
    req.name = name;
    next();
});

app.param(['id'], (req, res, next, id) => {
    req.id = id;
    next();
});

// Synchronize models
models.sequelize.sync().then(function() {
    /**
     * Listen on provided port, on all network interfaces.
     *
     * Listen only when database connection is sucessfull
     */
    app.listen(process.env.PORT, function() {
        console.log('Express server listening on port ' + process.env.PORT);
    });
});
