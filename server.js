const axios = require('axios')
const express = require('express')
const responses = ['', 'работи', 'работка', 'си крцка']
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(responses[Math.floor(Math.random() * 3 + 1)])
})

app.listen(port, () => console.log(`server is running on port`, port))

function pingServer() {
  let randomNumber = function() {
    return Math.floor(Math.random() * 90 + 1)
  }
  let urls = ['https://zakodanje.onrender.com', 'https://zakodanje1.onrender.com', 'https://robert-termini.onrender.com']
  urls.forEach(el => {
    doPing(el)
  })

  function doPing(url) {
    axios(url, { signal: AbortSignal.timeout(10000) })
      .then(res => {
        let random = randomNumber()
        console.log(res.status, url, '- repeat in', random, 'sec')
        setTimeout(function() { doPing(url) }, 1000 * random)
      })
      .catch(err => {
        let random = randomNumber()
        console.log(err.code, url, ' - repeat in', random, 'sec')
        setTimeout(function() { doPing(url) }, 1000 * random)
      })
  }
}

pingServer()