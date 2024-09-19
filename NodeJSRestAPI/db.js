const Pool = require('pg').Pool;

const pool= new Pool({
    user:"postgres",
    host:"10.10.10.51",
    database:"datatowa",
    password:"P@ssw0rd",
    port:5432
});
module.exports = pool;