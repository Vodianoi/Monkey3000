const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require("path");
const app = express();
const models = require('./models/index');
// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const pug = require('pug');

// Add a bit of logging
app.use(morgan('short'));

// app.get('/', function (req, res) {
//     res.send('Hello World');
// });

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Get all the users defined
app.get('/', (req, res) => {
    res.render('index')
});


app.get('/monkeys', (req, res) => {
    models.Monkey.findAll()
        .then((monkeys) => {
            //res.json(monkeys)
            res.render("displayMonkeys", {Monkeys: monkeys})
        })
        .catch((err) => {
            res.json(err)
        })
});


app.get('/createMonkey', (req, res) => {
    res.render('createMonkey')
});


app.post('/monkeys', (req, res) => {
    models.Monkey.create({
        name: req.body.name,
        taille: req.body.taille,
        EncloId: req.body.EncloId
    })
        .then((monkey) => {
            res.render('monkeyCreated', {
                name: req.body.name
            })
        })
        .catch((err) => {
            res.json(err)
        })
});

app.put('/monkeys', (req, res) => {
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

app.delete('/monkeys', (req, res) => {
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


app.get('/enclos', (req, res) => {
    models.Enclos.findAll()
        .then((enclos) => {
            //res.json(enclos)
            res.render("displayEnclos",{Enclos: enclos})
        })
        .catch((err) => {
            res.json(err)
        })
});

app.get('/createEnclos', (req, res) => {
    res.render("createEnclos")
});


app.post('/enclos', (req, res) => {
    models.Enclos.create({
        name: req.body.name,
        taille: req.body.taille,
    })
        .then((enclo) => {
            res.render('enclosCreated',{name: req.body.name})
        })
        .catch((err) => {
            res.json(err)
        })
});

app.put('/enclos', (req, res) => {
    const promises = [];

    req.body.mutations
        .forEach((item) => {

            promises.push(
                models.Enclos.update(
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

app.delete('/enclos', (req, res) => {
    models.Enclos.destroy({
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


app.get('/monkeys/:id', (req, res)  =>{
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

app.get('/updateMonkey/:id', (req, res)=> {
    res.render('updateMonkey',{id: req.params.id})
});



app.post('/monkeys/update/:id', (req, res) =>{
    models.Monkey.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
        })
        .then((monkey) => {
            res.render('monkeyUpdated', {name: monkey.name})
        })
        .catch((err) => {
            res.json(err)
        })
});

app.get('/monkeys/delete/:id', (req, res)  =>{
    models.Monkey.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((response) => {
            res.render('monkeyDeleted', {name: response.name});
        })
        .catch((err) => {
            res.json(err)
        })
});

app.get('/updateEnclos/:id', (req, res) =>{
    res.render('updateEnclos',{id: req.params.id})
});


app.post('/enclos/update/:id', (req, res) => {
    models.Enclos.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
        })
        .then((enclos) => {
            res.render('enclosUpdated', {name: enclos.name})
        })
        .catch((err) => {
            res.json(err)
        })
});




app.get('/enclos/:id', (req, res) => {
    models.Enclos.findOne({
        id: req.params.id
    })
        .then((enclos) => {
            res.json(enclos)
        })
        .catch((err) => {
            res.json(err)
        })
});

app.get('/enclos/update/:id', (req, res) => {
    models.Enclos.update(
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

app.get('/enclos/delete/:id', (req, res) => {
    models.Enclos.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((enclos) => {
            res.render('enclosDeleted', {name: enclos.name});
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
models.sequelize.sync().then(() => {
    /**
     * Listen on provided port, on all network interfaces.
     *
     * Listen only when database connection is sucessfull
     */
    app.listen(3000, () => {
        console.log('Express server listening on port ' + 3000);
    });
});
