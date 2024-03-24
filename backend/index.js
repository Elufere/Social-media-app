const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");  
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversations");
const messagesRoute = require("./routes/messages");
const path = require("path");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

  app.use("/images", express.static(path.join(__dirname, "public/images")));
  

// Middleware 
app.use(cors());  
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("common"));


// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "public/images")));


app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => {
  console.log("Backend server is running!");
});
