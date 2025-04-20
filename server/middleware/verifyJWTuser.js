const jwt=require('jsonwebtoken')

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization||req.headers.Authorization
    if(!authHeader?.startsWith('Bearer '))
        {
            return res.status(401).send('Unauthorized')
        }
        const token=authHeader.split(' ')[1]
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
        if(err)
            {
                console.log('token',token);
                
                return res.status(403).json({message :'Forbidden',token:token})
            }
    req.userMiddleware=decoded
    if(decoded.role!='User'&&decoded.role!='Admin'&&decoded.role!='Speeker')
          return res.status(403).json({message :'Forbidden'})
    next()})
}

module.exports=verifyJWT