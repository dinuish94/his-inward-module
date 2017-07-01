const express = require('express'),
    Router = express.Router();

Router.get('/:id',(req,res) => {
    let diabeticValues = {
        'x' : ['Monday','Tuesday','Wednesday','Thurseday','Friday','Saturday','Sunday'],
        'y' : [69,78,91,68,79,98,112]
    }

    res.json(diabeticValues);
});

module.exports = Router;