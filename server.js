const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const controllerPOST = require('./controller/feedCTRL');
const FeedBack = require('./model/feedBack');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

// Database connection
const mongoURI = 'mongodb://127.0.0.1:27017/FormData';
mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{console.log('MongoDB connected')}).catch(err=>console.log('Not connected to',err));


app.get('/',(req,res)=>
{
    res.sendFile(path.join(__dirname,'views','home.html'));
});
app.post('/submit', async (req, res) => {
    try {
        const { name, email, feedback } = req.body;
        if (!name || !email || !feedback) {
            return  res.sendFile(path.join(__dirname,'views','error.html'));
        }
        const feedBack = new FeedBack({ name, email, feedback });
        await feedBack.save();
        res.sendFile(path.join(__dirname,'views','success.html'));
        return req.body;
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        res.sendFile(path.join(__dirname,'views','error.html'));
    }

});
const PORT = 8000;
app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});
