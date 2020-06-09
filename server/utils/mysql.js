const mysqlConnection = params => {
  const { connection, sql, res } = params
  connection.query(sql, function (error, results, fields) {
    if (error) {
      res.json({
        data: error,
        successful: '0'
      })
      return
    }
    res.send({
      data: results,
      successful: '1'
    })
  });
}

module.exports = {
  mysqlConnection
}
