const express = require('express')
const User = require('../model/user')
const router = express.Router()


router.post('/signup',async(req,res)=>{
     const { fullname,email,password } = req.body;
     await User.create({
        fullname,
        email,
        password
     })
     
     return res.status(201).json({message:'user created successfully'})
})

router.post('/signin',async(req,res)=>{
    const { email,password } = req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email,password)
        const user = await User.findOne({ email }).select('-password'); // exclude password
        res.status(200).cookie('token',token,{
            httpOnly:true,
            secure:false,
        }).json({message:'Login Successfull',user,token})
    }catch(error){
        console.log('error',error);
        
        res.status(401).json({error:'Incorrect email or password'})
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
})


module.exports = router;