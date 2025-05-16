const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { createHmac,randomBytes } = require('crypto');
const { createTokenForUser } = require('../services/authentication');

const userSchema=new Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profileImage:{
        type:String,
        default:'/images/image.png'
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    }
});

userSchema.pre('save',function(next){
    const user = this;
    
    if(!user.isModified('password')) return;

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next()
})
 
userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user = await this.findOne({ email })

    if(!user) throw new Error('Invalid EmailID')

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex');
    
    if(hashedPassword !== userProvidedHash) 
        throw new Error('Invalid Password')

    const token = createTokenForUser(user)
    return token;
})


const User = mongoose.model('user',userSchema);

module.exports = User;
