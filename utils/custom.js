module.exports = {
  customError: (status, message) => {
    return new Error(JSON.stringify({
      message, 
      status
    }))
  }
}