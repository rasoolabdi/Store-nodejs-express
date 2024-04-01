const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const UserModel = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constant");
const redisClient = require("./init_redis");


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
        JWT.sign(payload , REFRESH_TOKEN_SECRET_KEY , options , async (error , token) => {
            if(error) reject(createHttpError.InternalServerError("خطا سمت سرور رخ داده است"));
            await redisClient.SETEX(userId , (365*24*60*60) , token);
            resolve(token);
        })  
    })
}

function VerifyRefreshToken(token) {
    return new Promise((resolve , reject) => {
        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY , async (err , payload) => {
            if(err) reject(createHttpError.Unauthorized("لطفا وارد حساب کاربری شوید ."))
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile} , {password: 0 , otp: 0});
            if(!user) reject(createHttpError.Unauthorized("حساب کاربری مورد نظر یافت نشد ."));
            const refreshToken = await redisClient.get(user._id , (error , data) => {
                console.log(data);
                console.log(error);
            });
            console.log(refreshToken);
            if(token === refreshToken) return resolve(mobile);
            reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد ."));
        })
    })
}


module.exports = {
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,

}