const express = require('express')
const router  = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')
const {check,validationResult} = require('express-validator')

// Create Post
router.post("/",[auth,[
    check('text','text is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }

    try{
    const user = await User.findById(req.user.id).select('-password')
    const newPost = new Post ({
        text: req.body.text,
        name : user.name,
        avatar: user.avatar,
        user: req.user.id
    })

    const post = await newPost.save()
    res.json(post)

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
    
})

// Get All Post
router.get('/',auth,async(req,res)=>{
    try{
        const post = await Post.find().sort({date:-1})
        res.json(post)
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})


// Get Post By Id
router.get('/:id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg:"Post not found"})
        }
        res.json(post)
        res.json(post)
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})


// Delete Post
router.delete('/:id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.user.toString()!==req.user.id){
            return res.status(400).json({msg:'User not authorized'})
        }
        await post.remove();
        res.json({msg:'Post removed'})
        res.json(post)
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})


// Like Post
router.put('/like/:id',auth,async(req,res)=>{
    try{
        console.log("PARAMS",req.params.id)
        const post = await Post.findById(req.params.id)
        if(post.likes.filter(like=>like.user.toString()==req.user.id).length > 0){
            return res.status(400).json({msg:'post already liked'})
        }
        post.likes.unshift({user:req.user.id})
        await post.save()
        res.json(post.likes)
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})


// Unlike Post
router.put('/unlike/:id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.likes.filter(like=>like.user.toString()==req.user.id).length == 0){
            return res.status(400).json({msg:'post has not been liked'})
        }
        const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex,1)
        await post.save()
        res.json(post.likes)
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})


// Add Comment
router.post("/comment/:id",[auth,[
    check('text','text is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }

    try{
    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.id)
    const newComment = {
        text: req.body.text,
        name : user.name,
        avatar: user.avatar,
        user: req.user.id
    }

    post.comments.unshift(newComment)
    await post.save()
    res.json(post.comments)

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
    
})


// Delete Comment
router.delete("/comment/:id/:comment_id",auth,async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id)
    const comment = await post.comments.find(comment => comment.id === req.params.comment_id)
    if(!comment){
        return res.status(404).json({msg:'comment not found'})
    }

    if(comment.user.toString() !== req.user.id){
        return res.status(401).json({msg:'user not authorized'})
    }
    const removeIndex = post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id)
    post.comments.splice(removeIndex,1)
    await post.save()
    res.json(post.comments)
    
    

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
    
})



module.exports = router