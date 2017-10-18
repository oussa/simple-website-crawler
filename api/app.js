const express = require('express')
const app = express()
const { fetchWebsite } = require('./fetchUtils')
const { analyseWebsite } = require('./dataUtils')

app.get('/health', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/crawl/:url?', async (req, res) => {
  if (!req.params.url) {
    res.status(400).send({ error: 'Bad request! Your request is missing the website URL' })
  } else {
    try {
      const website = 'http://oussamakrifa.com'
      const body = await fetchWebsite(website || req.params.url)
      const analysis = await analyseWebsite(body)
      res.status(200).json(analysis)
    } catch (e) {
      console.warn(e)
    }

  }
})

app.get('/', (req, res) => {
  res.status(200).send('Usage: GET /crawl/https://gihub.com')
})

module.exports = app
