// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    email:String,
    password:String
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
var user = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser,callback) {
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(newUser.password,salt,(err,hash) =>{
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByEmail = function(email,callback) {
    user.findOne({'email':email}).then(user => {

    });
}

module.exports.comparePassword = function(candidatePwd,hash,callback) {
    bcrypt.compare(candidatePwd,hash,function(err,isMatch){
        if (err) throw err;

        callback(null,isMatch);
    });
}
