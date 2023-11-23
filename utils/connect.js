const mongoose = require("mongoose");
  
const connectDB = (URL) => {
    mongoose.set('debug', process.env.NODE_ENV === 'development');
    return mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
  
module.exports = connectDB;