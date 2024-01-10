const inventoryModel = require("../models/inventoryModel")
const usermodel = require("../models/usermodel")

const createInventory=async(req,res)=>{
    try{
        const {email,inventoryType}=req.body
        const user=await usermodel.findOne({email})
        if (!user){
            throw new Error("User not found")
        }
        if(inventoryType==='in' && user.role !=='donar'){
            throw new Error("Not a Donar Account")
        }
        if(inventoryType==='out' && user.role !=='hospital'){
            throw new Error('Not a Hospital account')
        }
        const inventory=new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({
            success:true,
            message:"New Blood Record Inserted ",
        })

    }catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"An Error in Inventory API",
            err
        })
    }

}



const getInventory=async(req,res)=>{
    try{
        const inventory=await inventoryModel.find({organization:req.body.organization})
        .populate("donar").populate("hospital").sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:"get all records successfully",
            inventory
        })

    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"An Error in Get Inventory Api",
            err
        })
    }

}

module.exports={createInventory,getInventory}