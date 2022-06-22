// Dependencies
const express = require("express"); 
const multer = require("multer");
const path = require("path");
// App object
const app = express();

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

// file uploading destination
const UPLOAD_DEST = `${__dirname}/uploads`;
// multer configuration

const storage = multer.diskStorage({
        destination: (req, res, cb) => {
        cb(null, UPLOAD_DEST);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, " ").toLocaleLowerCase().split(" ").join("-")+Date.now()+fileExt
        console.log(fileName);
        cb(null, fileName);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 100000
    },
    fileFilter: (req, file, cb)=> {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true)
        } else {
            cb(new Error ("File Type Isn't Acceptable.......!"))
        }
    }
});

app.post("/handleFormData", upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 3 }
]), (req, res) => {
    // console.log(req.files);
    // console.log(req.body);
    res.send("File Uploaded......!");
});

// Server running at 3000 port
app.listen(3000, () => {
    console.log("Server running at 3000 port......!");
})