const express = require('express')
const Blogs = require('../model/blog')
const Comment = require('../model/comment')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { checkForAuthenticationCookie } = require('../middleware/authentication')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/upload/`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null,fileName)
    }
  })
  const upload = multer({ storage: storage })


router.post('/add-new',upload.single('coverImageURL'),checkForAuthenticationCookie('token'),async(req,res)=>{
    const { title,content } = req.body
    const blog = await Blogs.create({
        title,
        content,
        createdBy:req.user._id,
        coverImageURL:`/upload/${req.file.filename}`
    })
    console.log('Blog',blog);
    res.status(201).json({message:'Blog created',blog})
})

router.get('/blogs',async(req,res)=>{
    const allBlogs = await Blogs.find({})
    return res.status(200).json({blogs:allBlogs})
})

router.get('/blogs/:id',checkForAuthenticationCookie('token'),async(req,res)=>{
  const blog = await Blogs.findById(req.params.id).populate('createdBy')
  console.log(blog);
  res.status(200).json({ user:req.user, blog  })
})

router.post('/comment/:blogId',checkForAuthenticationCookie('token'),async(req,res)=>{
  const comment = await Comment.create({
    content:req.body.content,
    createdBy:req.user._id,
    blogId:req.params.blogId
  })
  res.status(200).json({comment})
})

router.get('/comments/:id',checkForAuthenticationCookie('token'),async(req,res)=>{
  const blogId =  req.params.id;
  const comments = await Comment.find({blogId}).populate('createdBy')
  res.status(200).json({comments})

})

module.exports = router;