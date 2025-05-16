const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    coverImageURL:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
},{timestamps:true});

const Blogs = mongoose.model('blog',blogSchema)

module.exports = Blogs;
