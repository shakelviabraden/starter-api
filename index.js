// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    res.status(200).json(pets)
});

// get pet by owner with query string
app.get('/api/v1/pets/owner/:owner', (req, res) => {
    // get the owner from the request
    const owner = req.params.owner

    // find the pet in the pets array
    const pet = pets.filter(pet => pet.owner === owner);

    //send the pet as a response
    if (!pet){
        return res.status(404).json({error: 'A pet with that owner is not found'})
    } 
    res.status(200).json(pet);
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const petName = req.params.name

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === petName);

    // send the pet as a response
    if (!pet){
        return res.status(404).json({error: 'A pet with that name is not found'})
    } 
    res.status(200).json(pet);
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;