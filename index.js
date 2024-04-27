const Application = require("./app/server");

new Application(5001 , `mongodb://localhost:27017/store-nodejs`)



// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMzMTQyOTI4NCIsImlhdCI6MTcxNDE5NjE0NSwiZXhwIjoxNzE0MjAzMzQ1fQ.pFKA3OkWi7hcntMW9dtsGeRW5lvK0y1ga3afpbe_FZA",
// "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMzMTQyOTI4NCIsImlhdCI6MTcxNDE5NjE0NSwiZXhwIjoxNzQ1NzUzNzQ1fQ.QbdmMKBlIFENLuCGBniL_LXHPzQylmVdIDjHDA2ht8I"