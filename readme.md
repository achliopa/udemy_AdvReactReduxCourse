# Udemy Course - Advanced React and Redux: 2018 Edition

* [Course](https://www.udemy.com/react-redux-tutorial/learn/v4/overview)
* [Repository](https://github.com/StephenGrider/AdvancedReduxCode)
* [BoilerPlate Project](https://github.com/StephenGrider/ReduxSimpleStarter)

## Section 2 - Testing

### Lecture 3 - Project Generation

* we should have a create-react-app tool (global npm module) installed in our system. if not we install it `npm install -g create-react-app`
* we use it to generate a clear new react app in /myCode folder `create-react-app testing`

### Lecture 4 - Our First Test

* in our generated project in /src App.js contains our root react code and Alspp.test.js our test code
* we remnove all jsx in the main div in app.js render() and put a simple text
* in App.test.js we see the first test and modify it to test for the test text in jsx `  expect(div.innerHTML).toContain('Hi there!');`
* we run `npm install` in our testing project
* start with 'npm start'
* fix watchman issue with
```
echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_watches && 
echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_queued_events && 
echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_instances && 
watchman shutdown-server
```

* run tests `npm run test` our test passes

### Lecture 5 - Introduction to Jest

* when we run create-react-app we got a sample project that contains:
	* React: the react lib
	* Webpack: to link our JS filesin a bundle
	* Babel: to transpile ES2015 and JSX into ES5 code
	* Jest: an automated test runner
* when we run "npm run test":
	* jest test runner starts up
	* jest finds all files ending in .test.js and executes tests inside of them
	* jest prints out results of tests to the terminal
	* jest waits for a file to change then runs tests again

### Lecture 6 - App Overview

* 