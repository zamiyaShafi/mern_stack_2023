const usermodel = require("../models/usermodel")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const registerController=async(req,res)=>{
    try{
        const existingUser=await usermodel.findOne({email:req.body.email})
        // validation
        if(existingUser){
            return res.status(200).send({
                message:'User Already Exists ',
                success:false,
                user:existingUser
                
            })
        }
        // hashing password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedPassword

        const user=new usermodel(req.body)
        await user.save()
        return res.status(201).send({
            message:'Registered Successfully',
            success:true,
            user
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            message:"Error In Register API",
            success:false,
            error
        })

    }

}


const loginController=async(req,res)=>{
    try{
        const user=await usermodel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({
                message:"invalid Credential",
                success:false
            })
        }
        if(user.role!==req.body.role){
            return res.status(500).send({
                success:false,
                message:"Role Does Not Match"
            })

        }
const comparePassword=await bcrypt.compare(req.body.password,user.password)
        if(!comparePassword){
            return res.status(500).send({
                message:"Invalid Credential",
                success:false
            })
        }

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            token,
            user
        })

    }
    catch(error){
        consolr.log(error)
        res.status(500).send({
            success:false,
            message:"An Error in Login API",
            error
        })
    }

}


// getting current user details
const getCurrentUser=async(req,res)=>{
    try{
        const user=await usermodel.findById({_id:req.body.userId})
        if(user){
            return res.status(200).send({
                success:true,
                message:"user fetched Successfully",
                user
            })

        }
        return res.status(404).send({
            success:false,
            message:"User Not Found"
        })
      

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Unable to get Current user",
            error
        })
    }

}

module.exports={registerController,loginController,getCurrentUser}