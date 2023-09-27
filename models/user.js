const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator (v) {
        return validator.isURL(v);
      },
      message: "You must enter a valid URL",
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: "email is invalid or already exists"
    }
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {

}

module.exports = mongoose.model('user', userSchema);
