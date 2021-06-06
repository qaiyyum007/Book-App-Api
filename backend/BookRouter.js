import express from 'express'
const expressRouter=express.Router()
import auth from './middleware/auth.js'
import Book from './model/BookModel.js'

class BookRouter{
    bookRouter
    constructor(){
        this.bookRouter=expressRouter
        this.bookRouter.post('/', async(req,res)=>{

            try {
                
                const book = await Book.create(req.body)

    
                res.status(200).send({msg: "Book Success",book})
            }  catch (err) {
                return res.status(500).send(`${err.msg}-${err.stack}`)
                
            }
        })




        this.bookRouter.get('/', auth, async(req,res)=>{

            try {
                const books = await Book.find().populate('createdBy').sort('createdAt');
                
                return res.status(200).send(books)
        
            }  catch (err) {
                return res.status(500).send(`${err.msg}-${err.stack}`)
                
            }
        })


        this.bookRouter.get('/:id', auth, async(req,res)=>{

            try {
                const books = await Book.findById();
                
                return res.status(200).send(books)
        
            }  catch (err) {
                return res.status(500).send(`${err.msg}-${err.stack}`)
                
            }
        })



        this.bookRouter.delete('/:id', auth, async(req,res)=>{

            try {
                
                const book = await Book.findByIdAndDelete(req.params.id);

                return res.status(200).send(book)
        
            }  catch (err) {
                return res.status(500).send(`${err.msg}-${err.stack}`)
                
            }
        })

        this.bookRouter.put('/:id', auth, async(req,res)=>{

            try {
                
                const book = await Book.findByIdAndUpdate(req.params.id, req.body,{new:true});

                return res.status(200).send(book)
        
            }  catch (err) {
                return res.status(500).send(`${err.msg}-${err.stack}`)
                
            }
        })







    }
}

export default BookRouter