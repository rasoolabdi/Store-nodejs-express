const createHttpError = require("http-errors");
const  JWT = require("jsonwebtoken");
const UserModel = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../utils/constant");

function VerifyAccessToken (req,res,next) {
    const headers = req.headers;
    console.log(headers)
    const [bearer , token] = headers?.["access-token"]?.split(" ") || [];
    // console.log(bearer , token)
    if(token && ["Bearer" , "bearer"].includes(bearer)) {   //&& bearer?.toLowerCase() === "bearer"
        JWT.verify(token , ACCESS_TOKEN_SECRET_KEY , async (error , payload) => {
            if(error) {
                return next(createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید ."))
            }else {
                const {mobile} = payload;
                const user = await UserModel.findOne({mobile} , {password: 0  , otp: 0});
                if(!user) {
                    throw new createHttpError.Unauthorized("حساب کاربری یافت نشد");
                }else {
                    req.user = user ;
                    return next();
                }
            }
        })
    }
    else {
        return next(createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید."))
    }
}

module.exports = {
    VerifyAccessToken,
}


//Bearer token