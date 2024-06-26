const createHttpError = require("http-errors");
const {getOtpSchema, checkOtpSchema } = require("../../../validators/user/auth.schema");
const { RandomNumberGenerator, SignAccessToken, VerifyRefreshToken, SignRefreshToken } = require("../../../utils/function");
const UserModel = require("./../../../models/users");
const {ROLES} = require("../../../utils/constant");
const Controller = require("../../controller");
const {StatusCodes:HttpStatus} = require("http-status-codes");


class UserAuthController extends Controller {


    async getOtp(req,res,next) {
        try {
            await getOtpSchema.validateAsync(req.body);
            const{mobile} = req.body;
            const code = RandomNumberGenerator();
            const result = await this.saveUser(mobile , code);
            if(!result) {
                throw new createHttpError.Unauthorized("ورود ناموفق می باشد")
            }
            return res.status(HttpStatus.OK).send({
                statusCode: HttpStatus.OK,
                data: {
                    message: "کد اعتبار سنجی با موفقیت ارسال شد",
                    code,
                    mobile
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async checkOtp(req,res,next) {
        try {
            await checkOtpSchema.validateAsync(req.body);
            const {mobile , code} = req.body;
            const user = await UserModel.findOne({mobile});
            if(!user) {
                throw new createHttpError.NotFound("کاربری با این شماره وجود ندارد");
            }
            if(user.otp?.code != code) {
                throw new createHttpError.Unauthorized("کد ارسال شده صحیح نمی باشد")
            }
            const now  = Date.now();
            if(+user.otp.expiresIn < now) {
               throw new  createHttpError.Unauthorized("کد شما منقضی شده است")
            }
            const accessToken = await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id);
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    message: "به کافه کد خوش آمدید ",
                    accessToken,
                    refreshToken 
                }
            })
        }
        catch(error) {
            next(error);
        }
    }


    async saveUser(mobile , code) {
        let otp = {
            code,
            expiresIn: (new Date().getTime() + 120000)
        }
        const result = await this.checkExistUser(mobile);
        if(result) {
            return (await this.updateUser(mobile , {otp}));
        }
      return !!(await UserModel.create({
        mobile,
        otp,
        role : ROLES.USER
      }))
    }

    async checkExistUser(mobile) {
        const user = await UserModel.findOne({mobile});
        return !!user;
    }

    async updateUser(mobile , objectData= {}) {
        Object.keys(objectData).forEach(key => {
            if(["" , " " , null ,0 , "0", undefined , NaN].includes(objectData[key])) {
                delete objectData[key];
            }
            
        })
        const updateResult = await UserModel.updateOne({mobile} , {$set : objectData});
        return !!updateResult.modifiedCount;
    }

    async refreshToken(req,res,next) {
        try {
            const {refreshToken} = req.body;
            console.log(req.body);
            const mobile = await VerifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({mobile});
            const accessToken = await SignAccessToken(user._id);
            const newRefreshToken = await SignRefreshToken(user._id);
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })
        }
        catch(error) {
            next(error)
        }
    }

}

module.exports = new UserAuthController();
