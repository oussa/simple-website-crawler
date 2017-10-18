const request = require('supertest')
const app = require('./app')
const { fetchWebsite } = require('./fetchUtils')
const { validUrl, invalidUrl, validUrls, validUrlAnalysis } = require('./fakeData')
// jest.mock('./fetchUtils')

describe('Basic checks', () => {
  xtest('API is up and running', () => {
    return request(app).get('/health').expect(200)
  })
  xtest('API gives usage examples', async () => {
    const response = await request(app).get('/')
    expect(response.text).toMatch(/Usage/)
  })
})

describe('API works as expected', () => {
  xtest('Informs about missing params', async () => {
    const response = await request(app).get('/crawl')
    expect(response.statusCode).toBe(400);
    expect(response.text).toMatch(/Bad request/);
  });

  xtest('Returns website summary', async () => {
    const response = await request(app).get(`/crawl/${validUrl}`)
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(validUrlAnalysis);
  });
})

describe('api utils functions work', () => {
  test('fetchWebsite return html with valid url', async () => {
    await expect(fetchWebsite(validUrl)).resolves.toEqual(validUrls[validUrl]);
  })
  xtest('fetchWebsite returns error with invalid url', async () => {
    await expect(fetchWebsite(invalidUrl)).rejects.toEqual({
      error: `website at url ${invalidUrl} could not be found`,
    });
  })
})
