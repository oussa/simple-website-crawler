const { validUrls } = require('../fakeData')

const utils = {
  fetchWebsite: (url) => {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (url in validUrls) {
          resolve(validUrls[url])
        } else {
          reject({
            error: `website at url ${url} could not be found`
          })
        }
      })
    });
  },

  checkWebsite: (url) => {
    return new Promise((resolve) => {
      process.nextTick(() => {
        return url in validUrls ? resolve(true) : resolve(false)
      })
    });
  }
}

module.exports = utils