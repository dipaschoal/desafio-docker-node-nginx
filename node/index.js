const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    charset: 'utf8'
  }

const mysql = require('mysql')
const con = mysql.createConnection(config)

const sql_create = `CREATE TABLE IF NOT EXISTS people (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    data VARCHAR(255)) ENGINE=INNODB`

const sql_insert = `INSERT INTO people (name, data) values('Diogo', CONVERT_TZ(NOW(),'SYSTEM','America/Sao_Paulo'))`

const sql_list = `SELECT * FROM people ORDER BY id DESC`

var table

con.query(sql_create)
con.query(sql_insert)

app.get('/',(req,res) => {

    con.query(sql_list, function (err, result) {
        if (err) throw err        

        this.table = ""
        for(var i=0; i<result.length; i++){
            this.table+='<tr><td>'+result[i].id+'</td><td>'+result[i].name+'</td><td>'+result[i].data+'</td></tr>'
        }

        this.table = '<h1>Full Cycle Rocks!</h1><table><tr><th>id</th><th>name</th><th>data</th></tr>'+this.table+'</table>'

        console.log(this.table)
        res.send(this.table)
        con.end()
    })
})

app.listen(port, ()=>{
    console.log('Rodando na porta ' + port)
})