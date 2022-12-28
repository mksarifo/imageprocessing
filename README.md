# Image Processing API

This project written in nodejs (typescript) exposes an API that returns an image by filename resized to specification

## Startup

### `npm i`

Install all NPM dependencies

## Available Scripts

In the project directory, you can run:

### `npm start`

Start the dev server. Runs the app on port 8001

### `npm run lint`

Checks the app from lint errors

### `npm run test`

Builds and runs jasmine tests

### `npm run build`

Builds the application and saves to build directory

## Working images

Copy images to buid/public/assets/image folder

In order for the tests to run successfully, please copy the 'board.jpg' file to buid/public/assets/image

## Endpoints

`/` - Health check, to see if server is up

`/api/image/board?width=200height=200` - Returns an image named 'board' with a width of 200 and a height of 200
