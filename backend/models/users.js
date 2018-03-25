var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

/* The user schema attributes / characteristics / fields */
var UserSchema = new Schema({
  fullName: { type: String, lowercase: true, required:true},
  email: {type: String, lowercase:true, required:true, unique:true},
  mobileNumber: {type: String, lowercase:true, required: true, unique:true},
  username: { type: String, unique: true, lowercase: true},
  password: String,
  role:{type: String, default: "viewer"}
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
