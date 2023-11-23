const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
 
{
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
   
  },
  password: {
    type: String
  },
},
{
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  id: false,
  toJSON: {
    getters: true,
  },
  toObject: {
    getters: true,
  },
});





const user = mongoose.model('user', userSchema);

module.exports = user;
