import express from 'express'
const expressRouter=express.Router()
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import User from './model/UserModel.js'
import auth from './middleware/auth.js'

class UserRouter{
    userRouter
    constructor(){
        this.userRouter=expressRouter
        this.userRouter.post('/register', async(req,res)=>{

            try {
                const {name, email, password} = req.body
                const user = await User.findOne({email})
                if(user) return res.status(400).json({msg: "This email already exists."})
    
                const passwordHash = await bcrypt.hash(password, 12)
    
                const newUser = {
                    name, email, password: passwordHash
                }
    
                const userdata = await User.create(newUser)
    
    
    
                res.status(200).send({msg: "Register Success",userdata})
            }  catch (err) {
                return res.status(500).send(`${err.msg}-${err.stack}`)
                
            }
        })




        this.userRouter.post('/login', async(req,res)=>{

            try {
                const { email, password} = req.body
                const user = await User.findOne({email})
                if(!user) return res.status(400).json({msg: "This email does not exists."})

                const isMatch= await bcrypt.compareSync(password,user.password)
                if(!isMatch) return res.send("password do not match")

                const token= jsonwebtoken.sign(  {
                    email: user.email,
                    _id:user.id

                  },
                    process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
                return res.status(200).send({user,token})
        
            }  catch (err) {
                return res.status(500).send(`${err.msg}-${err.stack}`)
                
            }
        })



        this.userRouter.get('/profile', auth, async(req,res)=>{

            try {
                
                const user = await User.findById(req.user._id)
                if(!user) return res.status(400).json({msg: "This profile does not exists."})

                return res.status(200).send(user)
        
            }  catch (err) {
                return res.status(500).send(`${err.msg}-${err.stack}`)
                
            }
        })





    }
}

export default UserRouter