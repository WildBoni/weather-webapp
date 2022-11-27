# Weather Webapp

This is a React 18 webapp showing weather forecast for any city in the world. It uses openWeatherMap APIs.

## About

This is my personal project to play around with following technologies:
 - React 18
 - Redux Toolkit
 - React Router v6
 - PWA functionalities
 - Node.js and Express
 - Docker
 - GCP App Engine
 - CI/CD with GCP Cloud Build to automatically build on Git pushes

## Try it online

Go to [https://weather-webapp-369909.oa.r.appspot.com/](https://weather-webapp-369909.oa.r.appspot.com/) to try the webapp. You can:
  - Add forecast for new city
  - Add forecast based on your position
  - Filter results
  - Remove cities from your list

## Configuration

1. Clone this repo
2. Create a .env.local file and put your openWeatherMap API key inside of it (see .env.example for the right syntax)
3. If you want to test openWeatherMap endpoints with Postman, I have included a collection!

## Want to run it inside Docker?

I created a quick dockerfile for that!

1. docker build . -t react-weather-webapp
2. docker run -p 3000:3000 react-weather-webapp

## GCP deployment
- You can deploy this app easily on GCP creating a trigger and using the dockerfile for the configuration
- Otherwise, you can setup an App Engine instance and use `gcloud app deploy` (you will need the Google Cloud SDK installed)

## Create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm react-start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm start`

Starts the Node.js server.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
