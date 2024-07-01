const { HomeRoutes } = require("./api");
const { Router } = require("express");
const { UserAuthRoutes } = require("./user/auth");
const redisClient = require("../utils/initRedis");
const { DeveloperRoutes } = require("./user/developer.routes");
const { AdminRoutes } = require("./admin/admin.routes");
const { VerifyAccessToken, checkRole } = require("../middlewares/verifyAccessToken");
const { graphqlHTTP } = require("express-graphql");
const router = Router();
const { graphqlConfig } = require("../utils/graphql.config");
const { ApiPayment } = require("./api/payment");
const { SupportSectionRouter } = require("./support/support.router");

(async() => {
    await redisClient.set("hi" , "hello");
    const value = await redisClient.get("hi");
    console.log(value);
})();


router.use("/" , HomeRoutes);
router.use("/user" , UserAuthRoutes);
router.use("/developer" , DeveloperRoutes);
router.use("/admin",VerifyAccessToken , AdminRoutes);
router.use("/graphql" , graphqlHTTP(graphqlConfig))
router.use("/payment" , ApiPayment);
router.use("/support" , SupportSectionRouter);


module.exports = {
    AllRoutes: router
}