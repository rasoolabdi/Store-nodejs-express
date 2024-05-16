const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const UserModel = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constant");
const redisClient = require("./init_redis");
const fs = require("fs");
const path = require("path");


function RandomNumberGenerator () {
    return Math.floor((Math.random() * 900000) + 100000)
}

function SignAccessToken(userId) {
    return new Promise(async (resolve , reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            mobile : user.mobile,
        };
        const secret = ACCESS_TOKEN_SECRET_KEY;
        const options = {
            expiresIn: "2h"
        };
        JWT.sign(payload , secret , options , (error , token) => {
            if(error) {
                reject(createHttpError.InternalServerError("خطا سمت سرور رخ داده است ."))
            }
            else{
                resolve(token);
            }
        })
    })
}

function SignRefreshToken(userId) {
    return new Promise(async (resolve , reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            mobile: user.mobile
        };
        const options = {
            expiresIn: "1y"
        }
        JWT.sign(payload , REFRESH_TOKEN_SECRET_KEY , options , async (err , token) => {
            if(err) reject(createHttpError.InternalServerError("خطا سمت سرور رخ داده است"));
            await redisClient.SETEX(userId.toString() , (365*24*60*60) , token);
            return resolve(token);
        })  
    })
}

function VerifyRefreshToken(token) {
    return new Promise((resolve , reject) => {
        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY , async (err , payload) => {
            if(err) reject(createHttpError.Unauthorized("لطفا وارد حساب کاربری شوید ."))
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile} , {password: 0 , otp: 0});
            console.log("user" + user);
            if(!user) reject(createHttpError.Unauthorized("حساب کاربری مورد نظر یافت نشد ."));
            const userId = user._id.toString();
            console.log("userId "+userId);
            console.log(typeof userId);
            const refreshToken = await redisClient.get(userId);
            console.log("refreshToken  " + refreshToken);
            if(token === refreshToken) return resolve(mobile)
            reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد ."));
        })
    })
};

function deleteFileInPublic(fileAddress) {
    if(fileAddress) {
        const pathFile = path.join(__dirname, "..","..","public",fileAddress);
        if(fs.existsSync(pathFile)) {
            fs.unlinkSync(pathFile);
        }
        else {
            return false;
        }
    }
}

function ListOfImagesFromRequest(files , fileUploadPath) {
    if(files?.length > 0) {
        return ((files.map((file) => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/g , "/")));
    }
    else{
        return [];
    }
}

function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
}

function setFeatures(body) {
    const {colors , width , height , weight , length} = body;
    let features = {};
    if(width || weight || height || length) {
        if(!width) features.width = 0;
        else features.width = width;
        if(!height) features.height = 0;
        else features.height = height;
        if(!weight) features.weight = 0;
        else features.weight = weight;
        if(!length) features.length = 0;
        else features.length = length;
        if(!colors) features.colors = [];
        else features.colors = colors;
    };
    return features;       
}

function deleteInvalidPropertyInObject(data = {} , blackListFields = []) {
    let nullishData = [""," ","0" , 0, null, undefined];
    Object.keys(data).forEach((key) => {
        if(blackListFields.includes(key)) delete data[key];
        if(typeof data[key] === "string") data[key] = data[key].trim();
        if(nullishData.includes(data[key])) delete data[key];
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map((item) => item.trim());
        if(Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    });
}

function getTime(seconds) {
    let total = Math.round(seconds) / 60;
    let [minutes , percent] = String(total).split(".");
    let second = Math.round((percent * 60) / 100).toString().substring(0,2);
    let houre = 0;
    if(minutes > 60) {
        total = minutes / 60;
        let [h1, percent] = String(total).split(".");
        houre = h1
        minutes = Math.round((percent * 60) / 100).toString().substring(0, 2);
    }
    if(String(houre).length == 1) houre = `0${houre}`;
    if(String(minutes).length == 1) minutes = `0${minutes}`;
    if(String(second).length == 1) second = `0${second}`
    return (houre + ":" + minutes + ":" + second);
}

function getTimeOfCourse(chapters = []) {
    let time , houre , minutes , second = 0;
    for(const chapter of chapters) {
        if(Array.isArray(chapter?.episodes)) {
            for (const episode of chapter.episodes) {
                if(episode?.time) time = episode.time.split(":");
                else time = "00:00:00".split(":");
                if(time.length == 3){
                    second += Number(time[0]) * 3600; //convert houre to second
                    second += Number(time[1]) * 60; //convert minutes to second
                    second += Number(time[2]) //is time second
                }
                else if(time.length == 2) { //05:30
                    second += Number(time[0]) * 60;
                    second += Number(time[1]); //is time second
                }
            }
        }
    }
    houre = Math.floor(second / 3600); //convert second to houre
    minutes = Math.floor(second / 60) % 60; //convert second to minutes
    second = Math.floor(second % 60); //convert and rounded second to second
    if(String(houre).length == 1) houre = `0${houre}`;
    if(String(minutes).length == 1) minutes = `0${minutes}`;
    if(String(second).length == 1) second = `0${second}`;
    return (houre + ":" + minutes + ":" + second);
}




module.exports = {
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic,
    ListOfImagesFromRequest,
    copyObject,
    setFeatures,
    deleteInvalidPropertyInObject,
    getTime,
    getTimeOfCourse
    
}