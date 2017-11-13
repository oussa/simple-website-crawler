const cheerio = require('cheerio')
const { checkWebsite } = require('./fetchUtils')

const isAbsoluteRegEx = new RegExp('^([a-z]+://|//)', 'i')
const isAbsolute = urlString => isAbsoluteRegEx.test(urlString)

function ResultModel() {
  return {
    htmlVersion: '',
    pageTitle: '',
    headings: {
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      h5: 0,
      h6: 0,
    },
    links: {
      absolute: 0,
      relative: 0,
      inaccessible: 0
    },
    containsLoginForm: false
  }
}

const utils = {
  analyseWebsite: async (html) => {
    const result = ResultModel()
    const $ = cheerio.load(html)
    // Headings count for each level
    Array(6).fill().forEach((__, idx) => {
      result.headings[`h${idx + 1}`] = $(html).find(`h${idx + 1}`).length
    })
    // Page title
    result.pageTitle = $.root().find('title').text()
    // Simplified Document's HTML version
    result.htmlVersion = html.match(/<!DOCTYPE html>/i) ? 5 : '4 or earlier'
    // Existence of login form
    result.containsLoginForm = !!Array.from($('body').find('form')).map(form => $(form).html()).join('').match(/login/i)
    // Links (absolute/relative) and count of inaccessible
    const links = Array.from($(html).find('a')).map(a => $(a).attr('href'))
    const linksToCheck = links.filter(link => isAbsolute(link))
    const promises = linksToCheck.map(link => checkWebsite(link))
    result.links.absolute = links.filter(link => isAbsolute(link)).length
    result.links.relative = links.length - links.filter(link => isAbsolute(link)).length
    try {
      const res = await Promise.all(promises)
      result.links.inaccessible = res.filter(value => !value).length
      return result
    } catch(e) {
      console.log('internal error', e)
      return { error: e }
    }
  }
}

module.exports = utils
