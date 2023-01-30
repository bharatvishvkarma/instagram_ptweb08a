const express = require('express')
const {register,login,createPost, getAllPosts,updatePost,deletePost} = require('../controllers/controller')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/users/register', register)
router.post('/users/login',login )


router.get('/posts',getAllPosts)

router.post('/posts/create',createPost)
router.patch('/posts/update/:id', updatePost)
router.delete('/posts/delete/:id', deletePost)

module.exports = router