const fetch = require('node-fetch');

const isAbsoluteRegEx = new RegExp('^([a-z]+://|//)', 'i')
const isAbsolute = urlString => isAbsoluteRegEx.test(urlString)
const makeAbsoluteUrl = (url) => isAbsolute(url) ? url : `http://${url}`
const utils = {
  fetchWebsite: async (url) => {
    url = makeAbsoluteUrl(url)
    try {
      const response = await fetch(url)
      if (response.ok) {
        console.log('ok')
        return response.text()
      } else {
        console.log('error')
        return response.error()
      }
    } catch (e) {
      console.warn('o.O', e)
    }
  },

  checkWebsite: async (url) => {
    url = makeAbsoluteUrl(url)
    try {
      const response = await fetch(url)
      return response.ok
    } catch (e) {
      console.warn(url, e)
    }
  }
}

module.exports = utils
