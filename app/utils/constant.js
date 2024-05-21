const { object } = require("@hapi/joi")

module.exports = {
    MongoIDPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES : Object.freeze({
        USER : "USER",
        ADMIN: "ADMIN",
        WRITER: "WRITER",
        TEACHER: "TEACHER",
        SUPPLIER: "SUPPLIER"
    }),
    PERMISSIONS:Object.freeze({
        USER: ["profile"],
        ADMIN: ["all"],
        SUPERADMIN: ["all"],
        CONTENT_MANAGER: ["course" , "blog" , "category" , "product"],
        TEACHER: ["course" , "blog"],
        SUPPLIER: ["product"],
        ALL: "all"
    }),
    ACCESS_TOKEN_SECRET_KEY: "FA6AD71798880D7501C271B117054DF11F9F95D805A1D6D72F816323BFB221A3",
    REFRESH_TOKEN_SECRET_KEY : "2C999CD2B2A84C71E206A874AD6F1E408B62D0B502BC3F78377EE7E226E7953F"
}   