//initialize 
const express = require('express');
const app = express();


//GET request
//Create Operator 
app.get('/hello', function(req, res){
    console.log(req);
    res.status(200).json({message: 'hello'})
})




//where the server is
app.listen(3000)
