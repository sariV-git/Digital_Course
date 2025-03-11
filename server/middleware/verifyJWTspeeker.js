
//include also the admin except from the speeker

const jwt=require('jsonwebtoken')



const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization||req.headers.authorization
    if(!authHeader?.startsWith('Bearer '))
        return res.status(401).send('Unauthorized')
    const token=authHeader.split(' ')[1]
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
        if(err)
            return res.status(403).json({message:'Forbidden'})
  
    req.speekerMiddleware=decoded
    if(req.speekerMiddleware.role!='Speeker'&&req.speekerMiddleware.role!='Admin')
        return res.status(401).send('Unauthorized')  })
    next()
}

module.exports=verifyJWT