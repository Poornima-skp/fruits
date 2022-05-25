require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const method = require('method-override');

const app = express();
const port = 3000;

const Fruit = require('./models/Fruit');
const { application } = require('express');

// ********** Connection to Mongoose*************
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Connected to Mongo'));

// SetUp Engine
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// ********** MiddleWare ***********

app.use(method('_method'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

// Need Express Middleware to parse JSON
app.use(express.json());

app.use((req, res, next) => {
    console.log('I run all the routes');
    next();
});

// ************Routes**************

// I.N.D.U.C.E.S --> this the order of writing the routes
//  I - Index
//  N - New
//  D - Delete
//  U - Update
//  C - Create
//  E - Edit

//  S - Show

// Index
app.get('/fruits', (req, res) => {
    // Query model to return all fruits
    Fruit.find({}, (err, allFruits) => {
        res.render('Index', { fruits: allFruits })
    })
});

// New
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

// Delete
app.delete('/fruits/:id', (req,res) => {
    Fruit.findByIdAndDelete(req.params.id, (err) => {
        if(!err){
            res.status(200).redirect('/fruits');
        } else {
            res.status(400).json(err);
        }      
    })
})

// Update
app.put('/fruits/:id', (req,res) => {

    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;

    // Update function has 4 arguments
    /*
        1. the id
        2. the content of what we need to update
        3. Options object {new=true}
        4. Callback functon
    */
    Fruit.findByIdAndUpdate(req.params.id, req.body,{new: true}, (err, updateFruit) => {
        if(!err) {
            res.status(200).redirect('/fruits');
        } else {
            res.status(400).json(err);
        }
    })
})

// Create
app.post('/fruits', (req, res) => {
    // req.body.readyToEat === 'on'
    // ?
    // req.body.readyToEat = true
    // :
    // req.body.readyToEat = false

    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;

    // Below line mimics working with a database
    // fruits.push(req.body)
    // console.log('req.body:', req.body)

    // Create 1st arg is the actual object we want insert inside our database
    // 2nd arg - callback function that takes error and newly created object as parameters
    Fruit.create(req.body, (err, createdFruit) => {
        res.redirect("/fruits");
    });

    // res.redirect('/fruits');
});

app.get('/fruits/:id/edit', (req,res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        if (!err) {
            res.render('Edit', {fruit: foundFruit});
        } else {
            res.status(400).json(err);
        };
    });
    // res.render('Edit');
});

// Show
app.get('/fruits/:id', (req, res) => {

    // Access our model by our class name
    Fruit.findById(req.params.id, (err, foundFruit) => {
        res.render('Show', { fruit: foundFruit });
    });
    // This will display our show component in the browser. Node will automattically look for a Show file inside of the view folder
    // res.render('Show', { fruit: fruits[req.params.indexOfFruitsArray] })
});


    




// Returns giant object with info and methods we can use 
// Focus on query object
// console.dir(Fruit);


app.listen(port, () => console.log(`Listening to port ${port}`));

