const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");

const app = express();

dotenv.config();

mongoose.set('strictQuery', false);

// Connect to MongoDB database using Mongoose
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MongoDB Connected")
}).catch((err) => {
    console.error(err)
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json())
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req,res) => {
    try {
        return res.status(200).json("File uploaded successfully.");
    } catch(err) {
        console.log(err);
    }
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
    console.log("Back-end server is running very well");
}) 