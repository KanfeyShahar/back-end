const jwt =  require('jsonwebtoken');
module.exports=(req,res,next) =>{
    try{
        console.log(req.headers.authorization.split(" ")[1])
        console.log( process.env.JWT_KEY)
        
        const token=req.headers.authorization.split(" ")[1]
        console.log(jwt.verify(token , process.env.JWT_KEY))

        const decoded = jwt.verify(token , process.env.JWT_KEY);
        req.userData=decoded;
        next();
    }catch(error){
        return res.status(500).send({error:'that email not found',statusCode:500})

    }

}