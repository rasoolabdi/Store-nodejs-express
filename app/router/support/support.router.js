const { Router } = require("express");
const supportController = require("../../controllers/support/support.controller");
const { ApiRoomRouter } = require("./room.router");
const { ApiNamespaceRouter } = require("./namespace.router");
const { checkLogin, checkAccessLogin } = require("../../middlewares/auth");
const router = Router();

router.use("/room" , ApiRoomRouter);
router.use("/namespace" , ApiNamespaceRouter);
router.get("/login" , checkAccessLogin , supportController.loginForm);
router.post("/login" , checkAccessLogin  ,supportController.login);
router.get("/" ,checkLogin ,supportController.renderChatRoom);

module.exports = {
    SupportSectionRouter : router
}