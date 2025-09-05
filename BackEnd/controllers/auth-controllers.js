const User = require("../models/userSchema");
const bcrypt = require("bcryptjs") ;

    const home = async(req,res)=>{
    try{
        res
        .status(200)
        .send("Created successfully using router and controllers");

    } catch(err){
            console.log(`Error is:${err.message}`);
    }
    }                   

    const registration = async(req,res) => {
    try {
            const{fullName, email, password, confirmPassword } = req.body;

            //Check if user exists
            const userExist = await User.findOne({email});

            if(userExist){
                return res.status(409).json({msg:"User already exists"});
            }
            //password and confirm password compare
               if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
            //   const isMatch = await bcrypt.compare(password, User.password);

            // if (!isMatch) 
            // {
            //     return res.status(401).json({ msg: "Invalid email or password" });
            // }

                //if not then
                const newUser = await User.create({fullName, email, password});

                res.status(201).json({
                msg:"Registration Successfull",
                 user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
                });

             
        } catch (error) {
            console.log(`Error is:${error.message}`);
            return res.status(500).json({ error: error.message});
        }

    }


    const login = async(req,res) => {
        try{
            const {email, password} = req.body;

     // 1. Check required fields
        if (!email || !password) {
         return res.status(400).json({ msg: "Email and password are required" });
        }


        } catch (error) {
            console.log(`Error is:${error.message}`);
            return res.status(500).json({ error: error.message});
        }
        
    }
    module.exports = {home,registration,login}