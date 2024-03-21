const Controller = require("../controller");


class HomeController extends Controller {


    async indexPage (req,res,next) {
        return res.status(200).send("Index page")
    }

}

module.exports = new HomeController();