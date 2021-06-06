import jwt from 'jsonwebtoken'

const auth=(req,res,next)=>{
    try {
        // if (
        //     req.headers.authorization &&
        //     req.headers.authorization.startsWith("Bearer")
        //   ) {
        //     token = req.headers.authorization.split(" ")[1];
        //   }
        const token = req.header("token")
        if(!token) return res.status(400).json({msg: "Token is not found."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).json({msg: "Invalid Authentication."})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

}


export default auth