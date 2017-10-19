const invalidUrl = 'some-invalid-url.xyz'
const validUrl = 'my-super-valid-url.com'
const validUrlAnalysis = {
  htmlVersion: 5,
  pageTitle: 'Best Website',
  headings: {
    h1: 1,
    h2: 2,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
  },
  links: {
    absolute: 2,
    relative: 2,
    inaccessible: 1 // only absolute urls
  },
  containsLoginForm: false
}
const validUrlHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Best Website</title>
</head>
<body>
  <header>
    Welcome to the best website, learn <a href="about-us.html">more</a>
  </header>
  <section>
    <h1>Wanna know why?</h1>
    <p>Well, let me think..</p>
    <h2>It's cool</h2>
    <p>Not much to say..</p>
    <h2>It's lightweight</h2>
    <p>think you guessed this one correctly, if you didn't here you <a href="more.html">go</a></p>
  </section>
  <form action="#">
    Username <input type="text" name="username">
    Password <input type="password">
    <input type="submit" value="Register">
  </form>
  <footer>
    Enough reasons to conclude this website is useless, better spend your time on <a href="https://github.com">GitHub</a> or on <a href="https://twitter.commm">Twitter</a> 
  </footer>
</body>
</html>`
const validUrls = {
  'http://oussamakrifa.com': `<html><head><title>Oussama</title></head><body></body><div><h2>hey</h2></div></body></html>`,
  'https://github.com': `<div>welcome to mocked github</div>`,
  'my-super-valid-url.com': validUrlHTML
};

module.exports = {
  invalidUrl,
  validUrl,
  validUrls,
  validUrlAnalysis,
  validUrlHTML
}
