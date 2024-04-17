const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");


function createRoute(req) {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const directory = path.join(__dirname, "..","..","public","uploads","blogs",year,month,day);
    req.body.fileUploadPath = path.join("uploads","blogs",year,month,day);
    fs.mkdirSync(directory , {recursive: true});
    return directory;
}

const storage = multer.diskStorage({
    destination: (req,file ,cb) => {
        const filePath = createRoute(req);
        cb(null , filePath);
    },
    filename: (req,file,cb) => {
        const ext = path.extname(file.originalname);
        const fileName = String(new Date().getTime() + ext);
        req.body.filename = fileName;
        cb(null , fileName);
    }
});

function fileFilter(req,file , cb) {
    console.log(file);
    const ext = path.extname(file.originalname);
    const mimetypes = [".jpg" , ".jpeg" , ".png" , ".webp"];
    if(mimetypes.includes(ext)) {
        cb(null , true);
    }
    else {
        cb(createHttpError.BadRequest("لطفا فرمت مناسب برای تصویر انتخاب کنید .") , false);
    }
}

const uploadFile = multer({storage , fileFilter});
module.exports = {
    uploadFile
}