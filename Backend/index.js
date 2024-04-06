const express = require("express");
const connectDB = require("./mongoConnect");
const userRouter = require("./routes/userRouter");
const pdfRouter = require("./routes/pdfRouter");
const PORT = 8000;
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const allowedOrigin = process.env.BASE_URL;
console.log(allowedOrigin);

// app.use(cors({
//   origin: process.env.BASE_URL,
//   optionsSuccessStatus: 200,
// }));
// app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", allowedOrigin);
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, HEAD, OPTIONS, POST, PUT, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });
app.use(cors({
  origin : (origin ,callback)=>{
    if(allowedOrigin.includes(origin)){
      console.log(origin ,allowedOrigin);
      callback(null,true);
    }
    else{
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials : true,
  methods : ["GET", "POST", "PUT", "DELETE"],
}));
connectDB();
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME TO SERVER");
});

app.use("/auth", userRouter);
app.use("/api", pdfRouter);
app.listen(PORT, () => console.log("APP is RUNNING"));
