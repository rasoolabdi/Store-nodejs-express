const Application = require("./app/server");

new Application(5001 , `mongodb://localhost:27017/store-nodejs`)

// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMzMTQyOTI4NCIsImlhdCI6MTcxMzk0Mzg3NSwiZXhwIjoxNzEzOTUxMDc1fQ.L99yPF-cB8QEf_Aa12o40ZsKKrzzwpjNa8ib_Lwviek",
// "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMzMTQyOTI4NCIsImlhdCI6MTcxMzk0Mzg3NSwiZXhwIjoxNzQ1NTAxNDc1fQ.caEdCyVuBRMZpLuZb5a68xJG_4mpqxs90h4qa-eXgaM"
