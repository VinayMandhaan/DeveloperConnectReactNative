const express = require('express')
const router  = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')
const {check,validationResult} = require('express-validator')



//User Profile View
router.get("/me",auth,async(req,res) => {
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])

        if(!profile){
            res.status(400).json({msg:'No profile for this user'})
        }
        res.json(profile)
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})

//Create and Update Profile
router.post("/", [auth, [
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array})
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    const profileFields = {}
    profileFields.user = req.user.id
    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubusername) profileFields.githubusername = githubusername
    if(skills){
        profileFields.skills = skills.split(",").map(skill=>skill.trim())
    }

    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube
    if(facebook) profileFields.social.facebook = facebook
    if(twitter) profileFields.social.twitter = twitter
    if(instagram) profileFields.social.instagram = instagram
    if(linkedin) profileFields.social.linkedin = linkedin
    
    try{
        let profile = await Profile.findOne({user: req.user.id})
        if(profile){
            profile = await Profile.findOneAndUpdate({user:req.user.id},{ $set: profileFields},{new:true})
            return res.json(profile)
        }
        profile = new Profile(profileFields);

        await profile.save()
        res.json(profile)
        
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }

})


// Find all Profile
router.get('/', async(req,res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar'])
        res.json(profiles)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})


// Find profile from userid
router.get('/user/:user_id', async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
        if(!profile){
            res.status(400).json({msg:"No Profile for this user"})
        }
        res.json(profile)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})


//Delete User
router.delete('/', auth, async(req,res)=>{
    try {
        await Post.deleteMany({user: req.user.id})
        await Profile.findOneAndRemove({user:req.user.id})
        await User.findOneAndRemove({_id:req.user.id})
        
        res.json({msg:"User Deleted"})
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})

// Add Profile Experience
router.put('/experience',[auth,[
    check('title','title is required').not().isEmpty(),
    check('company','company is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty()
]],async(req,res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty){
            res.status(400).json({errors:errors.array})
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body

        const NewExp = {
            title : title,
            company : company,
            location : location,
            from : from,
            to : to,
            current : current,
            description : description
        }

        try{
            const profile = await Profile.findOne({user:req.user.id})
            profile.experience.unshift(NewExp)
            await profile.save()
            res.json(profile)
        }catch(err){
            console.log(err.message)
            res.status(500).send("Server Error")
        }

        
        res.json({msg:"User Deleted"})
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})


//Delete Experience
router.delete('/experience/:exp_id', auth, async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})
        const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id) 
        profile.experience.splice(removeIndex,1)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})

// Add Profile Education
router.put('/education',[auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('fieldofstudy','field of study is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty()
]],async(req,res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty){
            res.status(400).json({errors:errors.array})
        }
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body

        const NewEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try{
            const profile = await Profile.findOne({user:req.user.id})
            profile.education.unshift(NewEdu)
             await profile.save()
            res.json(profile)
        }catch(err){
            console.log(err.message)
            res.status(500).send("Server Error")
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})


//Delete Education
router.delete('/education/:edu_id', auth, async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})
        const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id) 
        profile.education.splice(removeIndex,1)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})





module.exports = router