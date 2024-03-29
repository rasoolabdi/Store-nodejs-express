const { Router } = require("express");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
const redisClient = require("../utils/init_redis");
const router = Router();

(async() => {
    await redisClient.set("key" , "hello");
    const value = await redisClient.get("key");
    console.log(value);
})()

router.use("/user" , UserAuthRoutes);
router.use("/" , HomeRoutes);

module.exports = {
    AllRoutes: router
}