const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    password:"nik19ghar",
    host:"localhost",
    port:"5432",
    database:"hostelwebsite"
});

module.exports = pool;