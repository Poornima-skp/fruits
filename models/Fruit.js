// const fruits = [
//     {
//         name: 'apple',
//         color: 'red',
//         readyToEat: true
//     },
//     {
//         name: 'pear',
//         color: 'green',
//         readyToEat: false
//     },
//     {
//         name: 'banana',
//         color: 'yellow',
//         readyToEat: true
//     }
// ];

// Before we were hardcoding the variables. Now we making it dynamic

const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    readyToEat: Boolean
});

const Fruit = mongoose.model('Fruit', fruitSchema);

module.exports = Fruit;