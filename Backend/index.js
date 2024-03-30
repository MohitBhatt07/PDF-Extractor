const express = require('express');
const connectDB = require('./mongoConnect');
const userRouter = require('./routes/userRouter');
const pdfRouter = require('./routes/pdfRouter');
const PORT = 8000;

const app = express();
connectDB();
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

app.get('/' , (req,res)=>{
  res.send('WELCOME TO SERVER');
});

app.use("/auth" , userRouter);
app.use("/api" , pdfRouter);
app.listen(PORT , ()=>console.log("APP is RUNNING"));