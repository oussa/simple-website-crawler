const request = require('supertest')
const app = require('./app')
const { fetchWebsite } = require('./fetchUtils')
const { analyseWebsite } = require('./dataUtils')
const { validUrl, invalidUrl, validUrls, validUrlAnalysis, validUrlHTML} = require('./fakeData')
jest.mock('./fetchUtils')

describe('Basic checks', () => {
  test('API is up and running', () => {
    return request(app).get('/health').expect(200)
  })
  test('API gives usage examples', async () => {
    const response = await request(app).get('/')
    expect(response.text).toMatch(/Usage/)
  })
})

describe('API works as expected', () => {
  test('Informs about missing params', async () => {
    const response = await request(app).get('/crawl/')
    expect(response.statusCode).toBe(400);
    expect(response.text).toMatch(/Bad request/);
  });

  test('Returns website summary', async () => {
    const response = await request(app).get(`/crawl/${validUrl}`)
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(validUrlAnalysis);
  });
})

describe('api utils functions work', () => {
  test('fetchWebsite returns html with valid url', async () => {
    await expect(fetchWebsite(validUrl)).resolves.toEqual(validUrls[validUrl]);
  })
  test('fetchWebsite returns error with invalid url', async () => {
    await expect(fetchWebsite(invalidUrl)).rejects.toEqual({
      error: `website at url ${invalidUrl} could not be found`,
    });
  })
})

describe('analyse website works well', () => {
  test('parses correctly', async () => {
    await expect(analyseWebsite(validUrlHTML)).resolves.toEqual(validUrlAnalysis);
  })
})