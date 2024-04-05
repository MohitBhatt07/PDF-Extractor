const express = require('express');
const connectDB = require('./mongoConnect');
const userRouter = require('./routes/userRouter');
const pdfRouter = require('./routes/pdfRouter');
const PORT = 8000;
const cors = require('cors');
const app = express();
const allowedOrigin = process.env.BASE_URL;

app.use(cors({
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200,
}));
// app.use(cors({
//   origin : (origin ,callback)=>{
//     if(allowedOrigin.includes(origin)){
//       console.log(origin ,allowedOrigin);
//       callback(null,true);
//     }
//     else{
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials : true,
//   methods : ["GET", "POST", "PUT", "DELETE"],
// }));
connectDB();
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: false })); 
// app.use(express.json());

app.get('/' , (req,res)=>{
  res.send('WELCOME TO SERVER');
});

app.use("/auth" , userRouter);
app.use("/api" , pdfRouter);
app.listen(PORT , ()=>console.log("APP is RUNNING"));