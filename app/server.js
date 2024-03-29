const express = require("express");
const {default: mongoose} = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const createHttpError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { AllRoutes } = require("./router/router");
const cors = require("cors");


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
        this.#app.use(cors());
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, ".." , "public")));
        this.#app.use("/api-doc" , swaggerUI.serve, swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition: {
                info: {
                    title: "Shopping",
                    version: "2.0.0",
                    description: "فروشگاه مجازی ",
                    contact: {
                        name: "rasool abdi",
                        url: "http://localhost:5000",
                        email: ""
                    }
                },
                servers: [
                    {
                        url: "http://localhost:5000"
                    }
                ],
            },
            apis: ["./app/router/*/*.js"]
        })))

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
            console.log("disconnect DB")
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
