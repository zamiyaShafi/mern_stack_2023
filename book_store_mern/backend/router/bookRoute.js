import express from "express"
import {Book} from "../models/book-model.js"


const router=express.Router()



// posting books

router.post('/',async(req,res)=>{
    try{
        if(!req.body.title||
            !req.body.author||
            !req.body.publishYear){
                return res.status(400).send({message:"Send all required field title ,author,publishYear"})

            }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }

        const book=await Book.create(newBook)
        return res.status(201).send(book)

    }
    catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})

    }

})


// getting all the information of books


router.get("/",async(req,res)=>{
    try{
        const book=await Book.find({})
        res.status(201).json({
            count:book.length,
            data:book
        })

    }
    catch(err){
        console.log(err.message)
        res.status(500).send(err.message)
    }

})


// getting one perticular book
router.get("/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const book=await Book.findById(id)
        res.status(201).send(book)
        

    }catch(err){
        console.log(err.message)
        res.status(500).send(err.message)
    }

})


// updating a book

router.put("/:id",async(req,res)=>{
    try{
        if(!req.body.title||
            !req.body.author||
            !req.body.publishYear){
               return req.status(400).send({mesage:"please fill out all the fileds mandetorily"})
            }
         
            const {id}=req.params

            const book=await Book.findByIdAndUpdate(id,req.body)
            if(!book){
                return res.status(404).send({message:"Book not found"})

            }
            return res.status(200).json({
                message:"book updated successfully"
            })


    }catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }

})


// deleting the book

router.delete("/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const result=await Book.findByIdAndDelete(id)
        if(!result){
            return res.status(404).send("book not found")
        }
        return res.status(200).send({message:"successfull",result})



    }
    catch(err){
        res.status(500).send({message:err.message})
    }

})



export default router;
