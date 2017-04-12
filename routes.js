module.exports = function(app) {
    app.get('/dashboard',(req,res)=>{
        res.sendFile(__dirname+'/index.html');
    });
}