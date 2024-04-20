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
        if(file?.originalname) {
            const filePath = createRoute(req);
            return cb(null , filePath);
        }
        else {
            return cb(null , null)
        }
    },
    filename: (req,file,cb) => {
        if(file?.originalname) {
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext);
            req.body.filename = fileName;
            return cb(null , fileName);
        }
        else {
            return cb(null , null);
        }
    }
});

function fileFilter(req,file , cb) {
    // console.log(file);
    const ext = path.extname(file.originalname);
    const mimetypes = [".jpg" , ".jpeg" , ".png" , ".webp"];
    if(mimetypes.includes(ext)) {
        cb(null , true);
    }
    else {
        cb(createHttpError.BadRequest("لطفا فرمت مناسب برای تصویر انتخاب کنید .") , false);
    }
}

const maxSize = 400 * 1000;
const uploadFile = multer({storage , fileFilter , limits: {fileSize: maxSize}});
module.exports = {
    uploadFile
}