const Application = require("./app/server");

new Application(5001 , `mongodb://localhost:27017/store-nodejs`)


// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMzMTQyOTI4NCIsImlhdCI6MTcxNDY0MDcxMiwiZXhwIjoxNzE0NjQ3OTEyfQ.dYV0zm-Zq6D2rADa3jv5bOYMO19KMBUJlwemK3KjrPE",
// "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMzMTQyOTI4NCIsImlhdCI6MTcxNDY0MDcxMiwiZXhwIjoxNzQ2MTk4MzEyfQ.tyKdGijcZi7NBdbth3PGyqDSzjInCRVQ_PjXDUvPEBY"