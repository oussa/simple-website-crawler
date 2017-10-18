const fetch = require('node-fetch');

const isAbsoluteRegEx = new RegExp('^([a-z]+://|//)', 'i')
const isAbsolute = urlString => isAbsoluteRegEx.test(urlString)

const utils = {
  fetchWebsite: async (url) => {
    if (!isAbsolute(url)) {
      url = `http//${url}`
    }
    console.log(url)
    const response = await fetch(url)
    if (response.ok) {
      console.log('ok')
      return response.text()
    } else {
      console.log('error')
      return response.error()
    }
  },

  checkWebsite: async (url) => {
    const response = await fetch(url)
    return response.ok
  }
}

module.exports = utils
