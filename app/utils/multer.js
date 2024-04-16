const multer = require("multer");
const path = require("path");
const fs = require("fs");


function createRoute() {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const directory = path.join(__dirname, "..","..","public","uploads","blogs",year,month,day);
    fs.mkdirSync(directory , {recursive: true});
    return directory;
}

const storage = multer.diskStorage({
    destination: (req,file ,cb) => {
        const filePath = createRoute();
        cb(null , filePath);
    },
    filename: (req,file,cb) => {
        const ext = path.extname(file.originalname);
        const filename = String(new Date().getTime() + ext);
        cb(null , filename);
    }
});

const fileFilter = function(req,file , cb) {
    if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null , true);
    }
    else {
        cb(new Error("لطفا فرمت مناسب برای تصویر انتخاب کنید .") , false);
    }
}

const uploadFile = multer({storage , fileFilter: fileFilter});
module.exports = {
    uploadFile
}