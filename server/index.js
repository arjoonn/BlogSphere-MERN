const express = require('express');
const cors = require('cors')
const PORT = 8000;
const app = express();
const path = require('path')
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { checkForAuthenticationCookie } = require('./middleware/authentication');
const Blogs = require('./model/blog');


app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));        

mongoose.connect('mongodb://127.0.0.1:27017/blogmern')
        .then(()=>{
            console.log('connected to mongoDB')
        })
        .catch(error=>{
            console.log('connection error',error)
        })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))

app.use('/upload',express.static(path.join(__dirname,'public/upload')))
app.use('/images',express.static(path.join(__dirname,'public/images')))


app.use('/user',userRouter)
app.use('/blog',blogRouter)

app.listen(PORT,()=>{
    console.log(`server running at :http://localhost:${PORT}`);
    
})