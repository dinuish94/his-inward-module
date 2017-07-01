const express = require('express'),
    Router = express.Router();

Router.get('/:id',(req,res) => {
    let lbValues = {
        'x' : ['Monday','Tuesday','Wednesday','Thurseday','Friday','Saturday','Sunday'],
        'y' : [1,2,3,4,5,6,7]
    }

    res.json(lbValues);
    
});

module.exports = Router;