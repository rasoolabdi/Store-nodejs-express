const express = require("express");
const {default: mongoose} = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createHttpError = require("http-errors");



module.exports = class Application {
    #app = express();
    #DB_URI;
    #PORT;

    constructor(PORT , DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();

    }

    configApplication() {
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, ".." , "public")));

    }

    createServer() {
        const http = require("http");
        http.createServer(this.#app).listen(this.#PORT , () => {
            console.log(`Application is running on port ${this.#PORT}`)
        })
    }

    connectToMongoDB() {
        mongoose.connect(this.#DB_URI).then(() => {
            console.log("conntect to database")
        }).catch(() => {
            console.log("Failed to connect to database")
        })

        mongoose.connection.on("connected" , () => {
            console.log("mongoose connected to DB mongodb")
        })
        
        mongoose.connection.on("disconnected" , () => {
            console.log("mongoose connection is disconnected");
        })

        process.on("SIGINT" , async () => {
            await mongoose.connection.close();
            process.exit(0);
        })
    }

    createRoutes() {
        this.#app.use(AllRoutes);
    }

    errorHandling() {
        this.#app.use((req,res,next) => {
            next(createHttpError.NotFound("صفحه مورد نظر یافت نشد"))
        });

        this.#app.use((error,req,res,next) => {
            const serverError = createHttpError.InternalServerError();
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    }
}








// this.#app.use((req,res,next) => {
//     return res.status(404).json({
//       statusCode : 404,
//       message: "صفحه مورد نظر یافت نشد ."
//     })
//   });

//   this.#app.use((error,req,res,next) => {
//       const statusCode = error.status || 500;
//       const message = error.message || "Internal server Error";
//       return res.status(statusCode).json({
//           statusCode,
//           message
//       })
//   })