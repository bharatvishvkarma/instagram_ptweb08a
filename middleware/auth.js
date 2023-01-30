const jwt = require("jsonwebtoken")

const JWT_SECRET_KEY = "lskdjfi-dshfo-dsijdslf"

async function auth(req,res,next){

    const authorization = req.headers['authorization']

    if(authorization){
        const token = authorization.split(' ').pop()

        if(token){
            try{
             jwt.verify(token,JWT_SECRET_KEY)
            }
            catch(e){
                return res.status(404).send({
                    message: "Invalid token provided"
                })
            }

            let user = jwt.decode(token)

            const {name,email,_id} = user

            req.user = user
            next()
        }
        else{
            return res.status(400).send({
                message:"No auth token provided",
            })
        }
    }

    else{
        return res.status(400).send({
            message: "User is not logged in"
        })
    }

}

module.exports = auth