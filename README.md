# Local Air Quality Monitor

![](/media/local-air-screenshot.png?raw=true)

## Introduction

This simple Node app uses the PurpleAir API to display hyper-local air quality information based on PurpleAir IoT sensors located near where you live. You can check check the abundance of sensors near your place by visiting [https://www.purpleair.com/map?mylocation](https://www.purpleair.com/map?mylocation).

## Setup

The best way to start using this app is to clone the project into your local machine's project directory.

1. `cd ~/projects && git clone https://github.com/daveschumaker/local-air.git`
2. `cd local-air && npm install`
3. Rename `config-example.js` to `config.js` and enter appropriate details. You can find the ID for the PurpleAir sensor closest to your house by visiting the [PurpleAir map](https://www.purpleair.com/map?mylocation).
4. Run project using either `npm run dev` or `npm run build && npm run start`
5. View the node app's webpage in your browser by visiting `http://localhost:3000` (PORT 3000 is default, you can change this later)

## Contributions

If you're interested in contributing to the codebase, thank you!
Pull requests are the best way to propose changes and I welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints using the project rules.
6. Issue that pull request.

Note that any contributions you make will be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project.
