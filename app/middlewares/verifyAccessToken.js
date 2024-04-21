const createHttpError = require("http-errors");
const  JWT = require("jsonwebtoken");
const UserModel = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../utils/constant");

function getToken(headers) {
    const [bearer , token] = headers?.["access-token"]?.split(" ") || [];
    if(token && ["Bearer" , "bearer"].includes(bearer)) {
        return token;
    }
    else {
        throw new createHttpError.Unauthorized("حساب کاربری یافت نشد")
    } 

}



function VerifyAccessToken (req,res,next) {
    try {
        const token = getToken(req.headers);
        JWT.verify(token , ACCESS_TOKEN_SECRET_KEY , async (error , payload) => {
            if(error) {
                throw new createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید .")
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
    catch(error) {
        next(error);
    }
}


function checkRole(role) {
    return function(req,res,next) {
        try {
            const user = req.user;
            if(user && user.roles.includes(role)) {
                return next();
            }
            else {
                throw new createHttpError.Forbidden("کاربر گرامی شما به این قسمت دسترسی ندارید.")
            }
        }
        catch(error) {
            next(error);
        }
    }
}

module.exports = {
    VerifyAccessToken,
    checkRole
}
