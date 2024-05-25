const createHttpError = require("http-errors");
const  JWT = require("jsonwebtoken");
const UserModel = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../utils/constant");

function getToken(headers) {
    const [bearer , token] = headers?.authorization?.split(" ") || [];
    if(token && ["Bearer" , "bearer"].includes(bearer)) {
        return token;
    }
    else {
        throw new createHttpError.Unauthorized(" حساب کاربری شناسایی نشد .لطفا وارد حساب کاربری خود شوید .")
    } 
}



function VerifyAccessToken (req,res,next) {
    try {
        const token = getToken(req.headers);
        JWT.verify(token , ACCESS_TOKEN_SECRET_KEY , async (error , payload) => {
         try{
            if(error) {
                throw new createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید .")
            }else {
                const {mobile} = payload || {};
                const user = await UserModel.findOne({mobile} , {password: 0  , otp: 0});
                if(!user) {
                    throw new createHttpError.Unauthorized("حساب کاربری یافت نشد");
                }else {
                    req.user = user ;
                    return next();
                }
            }
         }
         catch(e) {
            next(e)
         }
        })
    }
    catch(error) {
        next(error);
    }
}


function VerifyAccessTokenInGraphQL(req) {
    try {
        const token = getToken(req.headers);
        JWT.verify(token , ACCESS_TOKEN_SECRET_KEY , async (error , payload) => {
            try {
                if(error) {
                    throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید .")
                }
                else {
                    const {mobile} = payload || {};
                    const user = await UserModel.findOne({ mobile } , {password: 0 , otp: 0});
                    if(!user) {
                        throw createHttpError.Unauthorized(" حساب کاربری شناسایی نشد . لطفا وارد حساب کاربری خود شوید .")
                    }
                    else {
                        req.user = user;
                    }
                }
            }
            catch(error) {
                console.log(error);
                throw createHttpError.HttpError(error.message);
            }
        })
    }
    catch(error) {
        console.log(error);
        throw createHttpError.Unauthorized(error.message)
    }
}


module.exports = {
    VerifyAccessToken,
    VerifyAccessTokenInGraphQL,
    getToken
}
