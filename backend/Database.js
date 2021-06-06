import mongoose from 'mongoose'



const ConnectDB=async()=>{
    mongoose.connect(process.env.MONGODB_URL,{
     useCreateIndex:true,
     useFindAndModify:true,
     useNewUrlParser:true,
     useNewUrlParser:true,
     useUnifiedTopology:true
    })

    console.log("Mongodb is Connected SucessFully")
}

export default ConnectDB