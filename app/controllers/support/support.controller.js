const UserModel = require("../../models/users");
const { SignAccessToken } = require("../../utils/function");
const Controller = require("../controller");


class SupportController extends Controller {


    async renderChatRoom(req,res,next) {
        try {
            return res.render("chat.ejs");
        }
        catch(error) {
            next(error);
        }
    }

    async loginForm(req,res,next) {
        try {
            return res.render("login.ejs" , {
                error: undefined
            })
        }
        catch(error) {
            next(error);
        }
    }

    async login(req,res,next) {
        try {
            const {mobile} = req.body;
            const user = await UserModel.findOne({mobile});
            if(!user) {
                return res.render("login.ejs" , {
                    error: "نام کاربری صحیح نمی باشد"
                })
            }
            const token = await SignAccessToken(user._id);
            console.log("token"+token);
            user.token = token;
            user.save();
            res.cookie("authorization" , token , { signed: true , httpOnly: true, expires: new Date(Date.now() + 1000*60*60*1)});
            return res.redirect("/support");
        }
        catch(error) {
            next(error);
        }
    }
};

module.exports = new SupportController();