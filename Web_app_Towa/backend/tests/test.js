const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '10.10.10.51',
  database: 'datatowa',
  password: 'P@ssw0rd',
  port: 5432,
});

pool.query('SELECT * FROM tb_menu')
  .then(res => {
    console.log(res.rows);
    pool.end();
  })
  .catch(err => {
    console.error('Error executing query', err.stack);
  });
