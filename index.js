//initialize 
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//enables JSON

//adds basic logging

var cors = require('cors');
app.use(cors({ origin: '*' }));
app.use(morgan('tiny'));
app.use(bodyParser.json());

//GET request
//Read Operator 

let names = [];

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Add other headers here
    res.setHeader('Access-Control-Allow-Methods', 'POST'); // Add other methods here
    res.send();
  });
  

//view all names in array
app.get('/', function(req, res){
    res.status(200).json({"names": names})
})


//Create a name in the array
app.post('/', function(req, res){
    let name = req.body.name;
    console.log(req.body)
    names.push(name);
    res.status(200).json({message: 'success'});
})

//Delete a name
app.delete('/', function(req, res){
    let name = req.body.name;
    const newNames = names.filter(n => n != name);
    names = newNames;
    res.status(200).json({message: 'success'});
})

//Update a name
app.put('/', function(req, res){
    let name = req.body.name;
    let newName = req.body.newName;

    //This sets the names array to a new one where all the names have been replaced.
    names = names.join(' ').replaceAll(name, newName).split(' ');
    res.status(200).json({message: 'success'});
})






//where the server is
app.listen(3000)
