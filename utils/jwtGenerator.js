const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(h_id){
    const payload = {
        user:h_id
    };

    return jwt.sign(payload,process.env.jwtSecret,{expiresIn:"1hr"});
}

module.exports = jwtGenerator;