const { Router } = require("express");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
const redisClient = require("../utils/init_redis");
const { DeveloperRoutes } = require("./user/developer.routes");
const { AdminRoutes } = require("./admin/admin.routes");
const { VerifyAccessToken, checkRole } = require("../middlewares/verifyAccessToken");
const { graphqlHTTP } = require("express-graphql");
const router = Router();
const { graphqlConfig } = require("../utils/graphql.config");

(async() => { //test connect to redis
    await redisClient.set("hi" , "hello");
    const value = await redisClient.get("hi");
    console.log(value);
})();


router.use("/" , HomeRoutes);
router.use("/user" , UserAuthRoutes);
router.use("/developer" , DeveloperRoutes);
router.use("/admin",VerifyAccessToken , AdminRoutes);
router.use("/graphql" , graphqlHTTP(graphqlConfig))


module.exports = {
    AllRoutes: router
}