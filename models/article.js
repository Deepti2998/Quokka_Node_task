const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true },
  content: { 
    type: String,
    required: true },
  author: { 
    type: mongoose.Schema.Types.ObjectId, ref: "User",
    required: true },
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

module.exports = mongoose.model("Article", articleSchema);
