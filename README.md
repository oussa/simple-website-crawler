## Project summary
This project consists of a full stack app: an API that given an URL tries to access and crawl it,
and a UI allowing the input of URL and the display of analysis results (title, html version, number of links, etc..)

It was initially bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This project makes use of [express.js](http://expressjs.com/), [axios](https://github.com/axios/axios),
[Cheerio](https://cheerio.js.org/), [Jest](https://facebook.github.io/jest/) and many others..

## Future Improvements
- Use Redux or MobX to better manage the app state
- Use axios rathen then fetch for the API as well
- Use `webpack -w` instead of `webpack-dev-server` to have the bundle generated on disc rather than in memory
- Use single server for both API and WebApp
- Lint and bundle backend files as well

## Run the project

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the webapp and the server in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.<br>
Open [http://localhost:8080](http://localhost:8080) to open the API and try sending some requests manually.

### `npm test`

Launches the test runner for the **WebApp** in the interactive watch mode.<br>

### `npm run test-api-server`

Launches the test runner for the **API** in the interactive watch mode.<br>

### `npm run build`

Builds the web app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
