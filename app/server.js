const express = require("express");
const {default: mongoose} = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const createHttpError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
require("dotenv").config();
const { AllRoutes } = require("./router/router");
const ExpressEjsLayouts = require("express-ejs-layouts");
const { initialSocket } = require("./utils/initSocket");
const { socketHandler } = require("./socket.io");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { COOKIE_PARSER_SECRET_KEY } = require("./utils/constant");



module.exports = class Application {
    #app = express();
    #DB_URI;
    #PORT;

    constructor(PORT , DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI
        this.configApplication();
        this.initTemplateEngin();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
        this.initRedis();
        this.initClientSession();
    }

    configApplication() {

        this.#app.use(cors());
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, ".." , "public")));
        this.#app.use("/swagger" , swaggerUI.serve, swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: "Shopping", 
                    version: "2.0.0",
                    description: " فروشگاه مجازی نمونه سوالات استخدامی ",
                    contact: {
                        name: "rasool abdi",
                        url: "http://localhost:5001",
                        email: ""
                    }
                },
                servers: [
                    {
                        url: "http://localhost:5001"
                    }
                ], 
                components:{
                    securitySchemes: {
                        BearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT",
                        }
                    }
                },
                security: [{BearerAuth: [] }]
            },
             apis: ["./app/router/**/*.js"]
            }),
            {explorer: true}            
        ))
    }

    createServer() {
        const http = require("http");
        const server = http.createServer(this.#app);
        const io = initialSocket(server);
        socketHandler(io);
        server.listen(this.#PORT , () => {
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

    initRedis() {
        require("./utils/initRedis");
    }

    initTemplateEngin() {
        this.#app.use(ExpressEjsLayouts);
        this.#app.set("view engine" , "ejs");
        this.#app.set("views" , "resource/views");
        this.#app.set("layout extractStyles" , true);
        this.#app.set("layout extractScripts" , true);
        this.#app.set("layout" , "./layouts/master");
    }

    initClientSession() {
        this.#app.use(cookieParser(COOKIE_PARSER_SECRET_KEY));
        this.#app.use(session({
            secret: COOKIE_PARSER_SECRET_KEY,
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
        }))
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
