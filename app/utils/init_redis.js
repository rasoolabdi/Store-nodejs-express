const redisDB = require("redis");
const redisClient = redisDB.createClient({legacyMode: true});
redisClient.connect();
redisClient.on("connect" , () => console.log("connect to redis"));
redisClient.on("ready" , () => console.log("connected to redis ready ti use ..."));
redisClient.on("error" , (error) => console.log("RedisError: ", error.message));
redisClient.on("end" , () => console.log("disconnected from redis ..."));

module.exports = redisClient;
