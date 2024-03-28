const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const UserModel = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("./constant");


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


module.exports = {
    RandomNumberGenerator,
    SignAccessToken
}