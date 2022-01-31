const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql_create = `CREATE TABLE IF NOT EXISTS people (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL)  ENGINE=INNODB`

const sql = `INSERT INTO people (name) values('Diogo')`

connection.query(sql_create)

connection.query(sql)
connection.end()

app.get('/',(req,res) => {
    res.send('<h1>Full Cycle Rocks!</h1>')
})

app.listen(port, ()=>{
    console.log('Rodando na porta ' + port)
})