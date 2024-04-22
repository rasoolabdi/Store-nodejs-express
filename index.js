const Application = require("./app/server");

new Application(5001 , `mongodb://localhost:27017/store-nodejs`)

// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMzMTQyOTI4NCIsImlhdCI6MTcxMzc4NTg4NiwiZXhwIjoxNzEzNzkzMDg2fQ.WtYkeZfBewufeJ5kvJxHU9MXeM9mtIbK1YHemJpsur4",
// "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMzMTQyOTI4NCIsImlhdCI6MTcxMzc4NTg4NiwiZXhwIjoxNzQ1MzQzNDg2fQ.3pNrz9VOpUd-UwSFuKui7-gkHrJ3DosOqyO3ylZVBIA"