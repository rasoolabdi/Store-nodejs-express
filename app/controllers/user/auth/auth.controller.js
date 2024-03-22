const createHttpError = require("http-errors");
const { authSchema } = require("../../../validators/user/auth.schema");


class UserAuthController {


    async login(req,res,next) {
        try {
            await authSchema.validateAsync(req.body);
            return res.status(200).send("ورود با موفقیت انجام شد")
        }
        catch(error) {
            next(createHttpError.BadRequest(error.message));
        }
    }


}

module.exports = new UserAuthController();
