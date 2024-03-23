const createHttpError = require("http-errors");
const { authSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");


class HomeController extends Controller {


    async indexPage (req,res,next) {
        try {
            // const result = await authSchema.validateAsync(req.body);
            // console.log(result);
            return res.status(200).send("Index page")
        }
        catch(error) {
            next(createHttpError.BadRequest(error.message));
        }
    }

}

module.exports = new HomeController();