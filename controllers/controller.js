const User = require('../database/users')
const jwt = require('jsonwebtoken')
const Post = require('../database/posts')

const JWT_SECRET_KEY = "lskdjfi-dshfo-dsijdslf"
function createtoken(user){
    const {_id,name,email} = user
    return jwt.sign({
        _id,name,email
    },JWT_SECRET_KEY)
}

async function register(req,res){

    try{
        const userData = req.body

        const {name,email,password, gender} = userData
    
        let existingUser = await User.findOne({
            email
        })
    
        if(existingUser){
            return res.status(400).send({
                message: "User already exists"
            })
        }

        const user = User.create(userData)

        return res.send({
            message: "Registration successful",
            user: user
        })
    }
    catch(e){
        return res.status(400).send({
            message: "Registration failed"
        })
    }
}

async function login(req, res){

    try{
        const userData = req.body
        const {email, password} = userData

        const user = await User.findOne({
            email
        })

        if(!user){
            return res.status(403).send({
                message: "User with this email id not registered",
            })
        }

        if(password !== user.password){
            return res.status(404).send({
                message: "Wrong password"
            })
        }

        const token = createtoken(user)

        const {_id,name} = user;

        return res.send({
            message: "login successful",
            user:{
                token,
                user:{
                    _id,name
                }
            }
        })


    }
    catch(e){
        return res.status(404).send({
            message: "Login failed"
        })
    }
}

async function createPost(req,res){
    try{
        let data = req.body

        const post = await Post.create(data)

        return res.send({
            post: post
        })
    }
    catch(e){
        return res.status(404).send({
            message: e.message
        })
    }
}

async function getAllPosts(req,res){
    let device1 = req.query.device1
    let device2 = req.query.device2
    let device = req.query.device
    
    console.log(device1,device2)
    try{
        if(device){
            let post = await Post.find({
                device
            })
            return res.send({
                posts: post
            })
        }
        if(device1 && device2){
            let post = await Post.find({
               device:{$in: [device1,device2]} 
            })
            return res.send({
                posts: post
            }) 
        }
        let posts = await Post.find({})
        return res.send({
            posts: posts
        })  
    }
    catch(err){
        return res.status(404).send({
            message: err.message
        })
    }
}

async function updatePost(req,res){
    try{
        let id = req.params.id
        let data = req.body

        const post = await Post.findByIdAndUpdate(id,data,{new:true} )

        return res.send({
            post: post
        })
    }
    catch(err){
        return res.status(404).send({
            message: err.message
        })
    }
}

async function deletePost(req,res){
    try{
        let id = req.params.id
        
        const post = await Post.findByIdAndDelete(id)

        return res.send({
            message: "post deleted"
        })
    }
    catch(err){
        return res.status(404).send({
            message: err.message
        })
    }
}


module.exports = {register, login, createPost,getAllPosts,updatePost,deletePost}