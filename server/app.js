const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const config = require('./config.json')
const { mysqlConnection } = require('./utils/mysql')

const connection = mysql.createConnection(config.mysql);

connection.connect();

const app = express()
const port = 3006

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.get('/api/tag/getall', (req, res) => {
  const sql = 'SELECT * FROM tags'
  mysqlConnection({
    connection,
    sql,
    res
  })
})

app.post('/api/tag/add', (req, res) => {
  const { name, description } = req.body
  const sql = `INSERT INTO tags (name, description) VALUES ('${name}}', '${description}');`
  mysqlConnection({
    connection,
    sql,
    res
  })
})

app.delete('/api/tag/delete', (req, res) => {
  const { id } = req.params
  const sql = `DELETE FROM tags WHERE id='${id}';`
  mysqlConnection({
    connection,
    sql,
    res
  })
})

app.put('/api/tag/:id', (req, res) => {
  const { id } = req.params
  const { name, description } = req.body
  const sql = `UPDATE tags SET name='${name}',description='${description}' WHERE id='${id}';`
  mysqlConnection({
    connection,
    sql,
    res
  })
})


app.listen(port, () => {
  console.log(`the server is running localhost:${3006}`)
})
