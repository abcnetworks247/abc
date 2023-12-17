const express = require("express");
require("dotenv").config();
const connectDb = require("./db/ConnectDb");
const blogRouter = require("./routes/blogRoute");
const clientRouter = require("./routes/clientAuthRoute");
const adminRouter = require("./routes/adminAuthRoute");
const bodyParser = require("body-parser");
const multer = require("multer");

const path = require("path");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const {
  handleNewComment,
  postReaction,
} = require("./controllers/blogControllers");

const cookieParser = require("cookie-parser");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.LOCAL_CLIENT_URL, process.env.LOCAL_ADMIN_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL, process.env.LOCAL_CLIENT_URL, process.env.LOCAL_ADMIN_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  },
});

handleNewComment(io);
postReaction(io);



app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

connectDb(server);

app.use(express.json());
app.use(cookieParser());
// app.use(fileUpload({ useTempFiles: true }));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error occurred
    console.log("error");
    res.status(400).send("Multer error: " + err.message);
  } else {
    // Handle other errors
    console.log("next");
    next(err);
  }
});

app.use("/api/v1/client/blog", blogRouter);
app.use("/api/v1/client/auth", clientRouter);
app.use("/api/v1/admin/auth", adminRouter);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
