var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// The form Schema

var formSchema = new Schema({
  pid: {type: String, required: true},
  interviewerId: {type: String, required: true},
  firstName : {type: String, lowercase: true, required:true},
  lastName : {type: String, lowercase: true},
  age : {type: String, required: true},
  gender : {type: String, required: true},
  maritalStatus: {type: String, required: true, lowercase: true},
  educationLevel : {type: String, required: true, lowercase: true},
  job : {type: String, required: true},
  country : {type:String, default: 'afghanistan', lowercase: true},
  province : {type: String, required: true, lowercase: true},
  district : {type: String, required: true, lowercase: true},
  tobaccoProducts : {type: String, required: true, lowercase: true},
  alcoholConsumption: {type: String, required: true, lowercase: true},
  eatFruit : {type: String, required: true, lowercase: true},
  highSalt : {type: String, required: true, lowercase: true},
  oilType: {type: String, required: true, lowercase: true},
  submissionDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Form', formSchema);
