module.exports = {
  respondResult: res => data => {
    return res.status(200).send({
      status: 200,
      message: 'OK',
      data
    })
  },
  respondError: res => (err) => {
    const error = JSON.parse(err.message)
    return res.status(error.status || 500).send({
      status: error.status || 500,
      message: error.message || 'server error'
    })
  }
}