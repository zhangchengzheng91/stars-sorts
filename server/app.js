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

app.use(function (req, res, next) {
  console.log('req=', JSON.stringify({
    method: req.method,
    body: req.body,
    query: req.query,
    path: req.path,
  }))
  console.log('res=', JSON.stringify({
    headersSent: res.headersSent
  }))
  //console.log('res=', res)
  next()
})

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

app.post('/api/repo/addTag', (req, res) => {
  const { repoId, tagId } = req.body
  const selectSql = `SELECT COUNT(*) as counts from repo_with_tag where repoId=${repoId} and tagId=${tagId}`
  //const selectSql = `SELECT JSON_ARRAYAGG(JSON_OBJECT(*)) from repo_with_tag where repoId=${repoId} and tagId=${tagId}`
  connection.query(selectSql, function (error, results, fields) {
    console.log('results[0]=', results[0].counts)
    //results = JSON.stringify(results)
    //console.log('results=', JSON.parse(results)[0].counts)
    //const counts = results.counts
    //console.log('counts=', counts)
  });
  const sql = `INSERT INTO repo_with_tag (repoId, tagId) VALUES ('${repoId}', '${tagId}');`
  mysqlConnection({
    connection,
    sql,
    res
  })
})


app.listen(port, () => {
  console.log(`the server is running localhost:${3006}`)
})
