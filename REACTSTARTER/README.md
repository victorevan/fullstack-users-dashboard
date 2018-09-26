
# UniPower WebClient Assignment

* React 16+
* test-watcher ```yarn run test:watch```

## Directory Structure

* `package.json` - Configure dependencies
* `src/index.js` - Entrypoint into React App
* `src/components` - All React Components
* `src/testSetup` -  Global Test setup
* `public/views` - Where index.ejs and other template sections live

## Install Dependencies

```
yarn install
```

or ```npm install``` whatever you like.

## Testing

```
yarn test
```

## Running it

To start the webpack server:

```
yarn start
```

or ```npm start``` whatever you like.

You now have a bundle.js file being served from ```http://localhost:8080```

Example: Going to ```localhost:8080``` in your browser should render the WebClient.

## Objectives

- 1. Build out a UI that will retrieve Users from the Node API on page load, and display them on the page, ensuring no duplicates appear. (we added a fetch lib called 'Axios' which you are free to use).
- 2. Add an input box and allow the ability to search the API (as you type) and have the filtering reflected on the page.
- 3. Style it as you see fit, ideally make it responsive (feel free to use Bootstrap or Semantic...we added Semantic-React components so it's there just in case.)

## Optional

- 1. Add ability to save a new User
- 2. Add tests to validate your work
- 3. Add the User data to a table and allow sorting by name via clicking on a column
- 4. Add some animations/transitions to the page


