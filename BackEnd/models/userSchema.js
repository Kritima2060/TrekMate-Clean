const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        minlength:[3],
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    confirmPawword: {
        type : String,
    },
  
});

userSchema.pre("save", async function (next) {
     const user = this;


     if(!user.isModified("password")){
         return next();
     
     }
     try {
          const saltRound = await bcrypt.genSalt(10) ;
           const hashPassword = await bcrypt.hash(user.password, saltRound);
           user.password = hashPassword;
          
     } catch (error) {                
          next(error); 
     } 

}) ;

const User = mongoose.model("User",userSchema);
module.exports = User;