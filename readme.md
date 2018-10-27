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

* we start with a simple project. a comment form.
* it has a text box to write comment and a button to submit. underneath in page alist of saved comments

### Lecture 7 - Installing Dependencies

* `npm install --save redux react-redux`

### Lecture 8 - React and Redux Design

* we will have 3 components in app: App component [CommentBox component, CommentList component]
* CommentBox will have the form
* on reuux side state will contain acomments array of strings and an actioncreator called saveComments adding a commnet to the list via the comments reducer

### Lecture 9 - What do we test?

* look at each individual part of the application
* imagine telling a friend'here's what this piece of code does'
* write a test to verify each part does what you expect (functional testing)
	* test 1: test CommentBox creates a textbox and a button
	* test 2: when we click on button contents of txtbox clear out

### Lecture 10 - Starting from Scratch

* we do a basic Appcomponet. boilerplate CoomnetBox and CommentList components. verify they appear in App
* we delete all contents of /src folder
* we add a root file index.js . react always assumes we have an index.js as root
* we add a components folder and an App.js (top level react component) and the 2 subcomponents

### Lecture 11 - Rendering the App

* in App we add boilerplate code and import it in index.js.
* in index.js we import react and reactDOM and render App (top level component) as `ReactDOM.render(<App />, document.querySelector('#root'));`

### Lecture 12 - Showing Components in the App

* we add boilerplate code in the 2 subcomponents and import them in App adding them to the jsx

### Lecture 13 - Valid Test File names

* jest looks in .spec.js and .test.js files
* in a folder called /__tests__ it includes all files
* we make a /__tests__ folder and add App.test.js adding imports (react, react-dom., App)

### Lecture 14 - Test Structure

* `it('<description>',()=>{<function with test logic>});`

### Lecture 15 - Tricking React with JSDOM

* when we run `npm run test` it starts Jest in CLI
* React expects to run in  browser not in CLI
* crete-react-app creates adependency in the project called JSDOM
* JSDOM is a js implementation (simulation) of how browser works
* when we write `const div = document.createElement('div');` we create a div in JSDOM (fake div)
* JSDOM allows us to use document (bbrowser parent cobject) to create a fake div and use it to anchor (render) App `ReactDOM.render(<App />, div);`
* then we test. we look in div and see in CommonBox exists
* before we exit test we cleanup. we remove App from div (to improve performance, and save memory) `ReactDOM.unmountComponentAtNode(div);`

### Lecture 16 - Verifying Component Existence

* we cl the html in div `console.log(div.innerHTML);`
* the actual asserion is `expect(div.innerHTML).toContain('Comment Box');`

### Lecture 17 - Test Expectations

* our assertion (expectation) is broken down as:
	* expect: global function
	* (<value that we are inpecting>): the thing we want to verify
	* .<matcher statement> : designates how we want to inspect the 'subject'	
	* (<value that we expect to see>): expected balue, what we want our subject to be

### Lecture 18 - Limiting Test Knowledge

* we are testing the App component but in our test we are asserting code in the ContentBox component
* we waat test files named for a component and testing that component
* we can test the EXISTENCE on subcomponents in a component under test not their internals

### Lecture 19 - Enzyme Setup

* we would like to test that App has an instance of CommentBox
* we ll use enzyme library `npm install --save enzyme enzyme-adapter-react-<react major version>`
* we need to confire enzyme. in /src we add a file 'setupTests.js'. in it we bind adapter to enzyme
```
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
```
* ewverytime enzyme starts it looks for /src/setupTests.js for config. runs it before tests

### Lecture 20 - Enzyme Renderers

* with enzyme we dont have to manually render our component in a test div
* Enzyme API gives us 3 capabilities on running our tests (render)
	* Static: render the given component and return plain HTML. we cannot interact
	* Shallow: render "just" the given component and none of its children. faster test
	* Full DOM: render the component and all of its children + let us modify itr afterwards (interact)
* [enzyme docs](https://airbnb.io/enzyme)
* we use shallow rendering in our first test to test existens of child component (without importing it)

### Lecture 21 - Expectations for Component Instances

* we refactor App.test.js (we remove ReactDOm) and  `import { shallow } from 'enzyme'; `
* shallow ommits rendering only React child components
* our test becomes
```
	const wrapped = shallow(<App />);
	expect(wrapped.find(CommenBox).length).toEqual(1);
```
* try tdd, break the test after passing, then fix again
we do the same for comments list 

### Lecture 24 - Absolute Path imports

* we up to now we use relative path imports
* we ll makje them use absolute imports
* in our root path we add a file called .env in there we add `NODE_PATH=src/`
* we restart server and test runner
* in App.test.js we refactor path imports e.g `import CommentList from 'components/CommentList';` so all imports are absolute in respect to the NODE_PATH
* seems it has problems with Create TReact App script. going back to relative paths
### Lecture 25 - Code Reuse with beforeEach

* we add beforeEach extracting common test code there (it runs first)
* varieables shold not be declared in beforeEach (scoping issues) but as globals with 'let' (to reassigne it multiple times with beforeEach). beforeEach runs multiple times

### Lecture 26 - CommentBox component

* commentbox has a text area and a button
* 