# Overview
This project was motivated by Seattle's closed source [Open Budget](http://openbudget.seattle.gov/#!/year/2020/operating/0/service) website built by Socrata. The dataset powering this visualization can be found on Seattle's [Open Data Portal](https://data.seattle.gov/) [here](https://data.seattle.gov/dataset/City-of-Seattle-Operating-Budget/8u2j-imqx).

While the code has some specific implementation details for supporting the Seattle Operating Budget dataset schema, I'm hopeful open sourcing this project will allow other people interested in visualization their city's budgets a good starting point.

## Tech Stack

This project utilizes React, bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[Ant Design](https://github.com/ant-design/ant-design) provides the component library powering the UI design.

[Nivo](https://github.com/plouc/nivo) provides the graph visualizations.

# Developing

To make changes to the project, you can clone the repository and work on it locally:

```
git clone git@github.com:Subzidion/SeattleBudget.git
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.