const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://khatiwadakritima12:MongoDB2060@authusers.zsmkhcv.mongodb.net/TrekMate"
  );
  

}; 
module.exports = connectDb;               