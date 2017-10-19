const express = require('express')
const app = express()
const cors = require('cors');
const { fetchWebsite } = require('./fetchUtils')
const { analyseWebsite } = require('./dataUtils')

app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).send('Ok!')
})

app.get('/crawl/*', async (req, res) => {
  const url = req.params[0]
  if (!url) {
    res.status(400).send({ error: 'Bad request! Your request is missing the website URL' })
  } else {
    console.log('url', url)
    try {
      const body = await fetchWebsite(url)
      const analysis = await analyseWebsite(body)
      res.status(200).json(analysis)
    } catch (e) {
      res.status(404)
      if (e.code === 'ENOTFOUND') {
        res.json({ error: `website at url ${url} could not be found` })
      } else {
        res.json({ error: `unknown problem trying to fetch url ${url}` })
      }
    }

  }
})

app.get('/*', (req, res) => {
  console.log(200)
  res.status(200).json({ message: 'Usage: GET /crawl/https://gihub.com' })
})

module.exports = app
