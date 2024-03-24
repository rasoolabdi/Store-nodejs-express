const createHttpError = require("http-errors");
const { authSchema } = require("../../../validators/user/auth.schema");
const { RandomNumberGenerator } = require("../../../utils/function");
const UserModel = require("./../../../models/users");
const { EXPIRES_IN, USER_ROLE } = require("../../../utils/constant");
const Controller = require("../../controller");


class UserAuthController extends Controller {


    async login(req,res,next) {
        try {
            await authSchema.validateAsync(req.body);
            const{mobile} = req.body;
            const code = RandomNumberGenerator();
            const result = await this.saveUser(mobile , code);
            if(!result) {
                throw new createHttpError.Unauthorized("ورود ناموفق می باشد")
            }
            return res.status(200).send({
                data: {
                    statusCode: 200,
                    message: "کد اعتبار سنجی با موفقیت ارسال شد",
                    code,
                    mobile
                }
            })

        }
        catch(error) {
            next(createHttpError.BadRequest(error.message));
        }
    }

    async saveUser(mobile , code) {
        let otp = {
            code,
            expiresIn: EXPIRES_IN
        }

        const result = await this.checkExistUser(mobile);
        if(result) {

        
        return (await this.updateUser(mobile , {otp}));
      }

      return !!(await UserModel.create({
        mobile,
        otp,
        roles : [USER_ROLE]
      }))
    }

    async checkExistUser(mobile) {
        const user = await this.UserModel.findOne({mobile});
        return !!user;
    }

    async updateUser(mobile , objectData= {}) {
        Object.keys(objectData).forEach(key => {
            if(["" , " " , 0 , null , undefined , "0" , NaN].includes(objectData[key])) {
                delete objectData[key];
            }
            
        })
        const updateResult = await UserModel.updateOne({mobile} , {$set : objectData});
        return !!updateResult.modifiedCount;
    }


}

module.exports = new UserAuthController();
