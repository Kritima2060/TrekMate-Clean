const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");

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
// compare the password

userSchema.methods.comparePassword =async function(password){
   return bcrypt.compare(password, this.password);
}


//JSON WEB TOKEN
userSchema.methods.generateToken = async function(){
     
    try {
        return jwt.sign({
            userId : this._id.toString(),
            email: this.email,
            name: this.user.fullName
            // isAdmin: this.isAdmin
        },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn : "30d",
          }
      );
        
    } catch (error) {
        console.error(error);
    }
}


const User = mongoose.model("User",userSchema);
module.exports = User;