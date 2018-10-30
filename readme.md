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
* we make commentbox a class based component and add a simple form

### Lecture 27 - TextArea Implementation

* we add state (ES6 style)
* we add arrow function handlers for textare adn form (to avoid binding this at constructor)
* we dont add redux we just celar form at submit

### Lecture 28 - CommentBox Test File

* commentbox has no children components
* we use  FullDOM render from enzyme for testing
* we add a new test file
* we want to test that commentbox shows text are and button

### Lecture 29 - Asserting Element Existence

* fullDOM rendering mounts the component under test to the DOM. tests can affect each other if they use same dom
* we should .unmount() after test
* to use fullDOM rendering we import mount `import { mount } from 'enzyme';`
* the dom is provided by jsdom
* we use find to assert existence of components or html (using css selector)
* our test is
```
	const wrapped = mount(<CommentBox />);
	expect(wrapped.find('textarea').length).toEqual(1);
	expect(wrapped.find('button').length).toEqual(1);
```
* we dont do cleanup in our test yet

### Lecture 30 - AfterEach Statements

* we move declaration in beforeEach (we pass it in as a callback arrow function)
* we add afterEach(called after each test) to unmount the mounted component
```
afterEach(()=>{
	wrapped.unmount();
});
```

### Lecture 31 - Simulating Change Events

* we want to test that state property is wired up correctly in the component
* any time we change the textarea the onChange property gets fired up (callback gets called)
* our test flow is: find the textarea element => simulate a 'change' event => provide a fake event object => force the component to update => assert the textarea value has changed

### Lecture 32 - Providing Fake Events

* we use .find() to grab textarea
* we use enzyme .simulate('<eventname>',{ event mock object}) to simulate an event
* event name is the pro name without the on
* to simulate the event object we pass in the properties like in the event handler
```
.simulate('change', {
		target: { value: 'new comment'}
	})
```

### Lecture 33 - Forcing Component Updates

* the event handler calls setState() and forces the component to rerender but asynchronously. not instantly. it queues the render request to react
* we want our component o renrender synchronously when we test as our assertion is immediatly after
* enzyme offers update)( method to enable forcing rerender)

### Lecture 34 - Retrieving Prop Values

* we want to test that the text area receives the correct 'value' prop
* we ll use enzyme '.prop(key)' method in our test
* our test code in full is
```
	wrapped.find('textarea').simulate('change', {
		target: { value: 'new comment'}
	});
	wrapped.update();
	expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
```

### Lecture 35 - Form Submit Exercise

* our next test tests submit. when input is submitted, text area should be emptied
* we simulate events
* solution
```
it('empties textare when submitting input', () => {
	wrapped.find('textarea').simulate('change', {
		target: { value: 'new comment'}
	});
	wrapped.update();
	wrapped.find('form').simulate('submit');
	wrapped.update();
	expect(wrapped.find('textarea').prop('value')).toEqual('');
});
```

### Lecture 37  - Describe Statements

* describe() groups tests and reuse code without affecting other tests
* we put last 2 textarea tests in and add a beforeEach for the common setup code

### Lecture 38 - Redux Setup

* comment list has to  do on accessing the list of comments from redux state
* we add a folder for reducers called /reducers and add 2 files index.js for the app reducer and comments.js for the comments list piece of state reducer
* comments piece of state will have an action creator saveComment to save the comment on form submit at commentBox and a state.comments piece for rendering the list in commentList by  binding state to props
* our boilerplate reducer is 
```
export default function(state = [], action) {
	switch(action.type)  {
		default: 
			return state;
	}
}
```
* by state we meant the piece of state the reducer is responsible for
* our app reducer in index.js is 
```
import { combineReducers} from 'redux';
import commentsReducer from './comments';

export default combineReducers)({
	comments: commentsReducer
});
```

### Lecture 39 - The Provider Tag

* to use state in our app we need to wire the reducers and state in redux store. 
* this is done in our apps root file (index.js)
* we import Provider helper createStore method and combineReducer we just made
```
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
```
* when we import a dir in es6 looks for the index.js in it and imports whatever is inside
* Provider tag wraps our app jsx. it contains redux store and through it redux state is available throughout our app to COmponents (containers) that use the connect() wrapper to bind to the redux store made available by Provider
* all we have to do to use it is wrap App tag with Provider passing in store prop createStore where we pass our combined reducer method and the initial state(if any)
```
ReactDOM.render(
	<Provider store={createStore(reducers, {})}>
		<App />
	</Provider>
	, document.querySelector('#root')
);
```

### Lecture 40 - The SaveComment Action Creator

* this action creator will add the coment form textarea to the commnets list in state
* we add a folder /actions and a  file in it index.js to host our creators and types.js for our action type definition a.g `export const SAVE_COMMENT = 'save_comment';`
* nothing new here in reducers we handle this type adding the comment to  the list with list interpolation
```
		case SAVE_COMMENT:
			return [ ...state, action.payload];
```

### Lecture 41 - Bonding React with Redux

* we use mapDistpatchToProps or dirreclty passing the action creator to connect in CommentBox
* our action call in teh submit handler becomes `this.props.saveComment(this.state.comment);`
* our connect becomes `export default connect(null,actions)(CommentBox);`
* our tests are failing with redux added

### Lecture 42 - Redux Test Errors

* jest complains on not finding redux store. 
* when we assemble a redux app, we wrap our App component with Provider which contains an instance of redux store
* when we wrap a component with connect() it expects to see a parent component wrapped with Provider tag
* in our test evironment redux specific components are missing. as we import and render react components in isolation
* one solution is to import all redux related main components in test file
* this brakes DRy as we have to repeat a lot of code
* a better way is to refactor index.js. out the PRedux setup code in a helper method and import it in our tests

### Lecture 43 - Adding a Root Component

* we put the reusable code in a new file code Root.js
* in there we make the Root reusable component as functional component
```
export default (props) => {
	return (
		<Provider store={createStore(reducers, {})}>
			{props.children}
		</Provider>
	);
};
```
* {props.children} is a react syntax. it allows to use this component to wrap other components indipendent of their internals
* we import it in index.js and use it to wrap App
* we use Root to wrap our components under test
```
	wrapped = mount(
		<Root>
			<CommentBox/>
		</Root>
	);
```

### Lecture 44 - Testing Reducers

* we want to test that save comment action saves a comment. 
* also that if we give a wrong type we dont get an error
* in reducers folder we add a folder __tests__ and a comments.test.js file
* tests are simple. we just assert the return of the reducer function
* our test
```
	const action = {
		type: SAVE_COMMENT,
		payload: 'Test Comment'
	};
	const newState = commentsReducer([],action);
	console.log(newState);
	expect(newState).toEqual(['Test Comment']);
```

### Lecture 45 - Handling Unknown Types

```
it('handles action with unknown type', ()=> {
	const newState = commentsReducer([],{});
	expect(newState).toEqual([]);
});
```

### Lecture 46 - Testing Action Creators

* we follow the same drill like reducer. add a __tests__ folder and a test file
```
	it('has the correct payload',()=> {
		const comment = 'test comment'
		const action= saveComment(comment);
		expect(action.payload).toEqual(comment);
	});
```

### Lecture 47 - Comment List Wireup

* we make CommentList a class component and connect it to state with mappStateToProps
* we use a render helper to render our list using map()
```
	renderComments() {
		return this.props.comments.map(comment => {
			return (
				<li key={comment}>{comment}</li>
			);
		});
	}
```
* we bind redux state eto props
```
function mapStateToProps({comments}) {
	return { comments };
}

export default connect(mapStateToProps)(CommentList);
```

### Lecture 48 - Getting Data into Redux

* we are ready to test the component
* we add a testfile CommentList.test.js adding boilerplate same like CommentBox testfile
* we want to test that the component shows an li element per comment
* text from each comment is visible
* commentlist uses redux state to render the list. we dont have it in our testfile
* we have redux store but we cannot modify it in test. we have to dispatch an action
* passing comments in props is not a solution as mapstatetoprops will overwrite it with empty string

### Lecture 49 - Redux Initial State

* in Roots we pass Provider which accepts initial state which we set as eppty object
* we pass the initial state as a prop to roots to use it in testing
```
		<Root initialState={initialState}>
			<CommentList/>
		</Root>
```

### Lecture 50 - Cheerio Queries

* our first test
```
it('creates one LI per comment', () => {
	expect(wrapped.find('li').length).toEqual(2);
});
```
* our second test needs to access the actual rendered text in the li
* with enzyme we can use the .text() method in wrapped eleemnt but enzyme does not recommend it. it recommends using render() method
* render() uses CheerioWrapper (!?!!?!!). [cheerio](https://github.com/cheeriojs/cheerio) is a library like jQuery
* if we test for text(not html)
```
expect(wrapped.render().text()).toContain('Comment 1');
expect(wrapped.render().text()).toContain('Comment 2');
```

### Lecture 51 - One more feature

* we are not testing http requests. we should do it
* we add a button 'Fetch Comments' to hit a remote API that will populate our list
* we will hit a [json placeholder api](https://jsonplaceholder.typicode.com/)
* this API returns JSON
* we install axios lib and redux-promise middleware and moxios module`npm install --save axios redux-promise moxios`

### Lecture 52 - Fetching a Remote Resource

* redux middlewares are hooked up in redux store config
* we import it `import reduxPropmise from 'redux-promise';` in Root. we import applyMiddleware from redux
* we add it as a 3rd param to store `const store = createStore(reducers, initialState, applyMiddleware(reduxPromise));`
* we add a new action type FETCH_COMMENTS
* we add a fetchComments action creator using axios
```
export function fetchComments() {
	const response = axios.get('http://jsonplaceholder.typicode.com/comments');

	return {
		type: FETCH_COMMENTS,
		payload: response
	}
}
```

### Lecture 53 - Parsing Comments List

* parsing comments out of response into  alist will be done in reducer
* we first add a button and wire it ot he creator
* we add the second button out of the form to avoid triggering subbmit
* our parsing in reducer using map is
```
		case FETCH_COMMENTS:
			const comments = action.payload.data.map(comment=>comment.name);
			return [...state, ...comments];
```

### Lecture 54 - Integration Tests

* we need to test our new functionality
* we can add tests in our already existing testfiles
* we ll try integration testing approach. test complete functionality e.g 'does dlicking Fetch COments shows a list of LIs?' testing many parts together

### Lecture 55 - Integration Tests in Action

* well add a __tests__ folder in src to add our integration tests
* we add a file integrations.test.js
* we add our usual imports for testing
* our test will
	* attempt to render the entire app
	*  find the 'fetchComments' button and click it
	* expect to find a list of comments

### Lecture 56 - Fixin a broken test

* commentbox test fails. we fix it
* integration test doesnot check state so we do not care to initialize it at Root

### Lecture 57 - Simulating Button Clicks

* we want to find the button and simulate a click event
* we add to it a class nae to be able to select it `wrapped.find('.fetch-comments').simulate('click');`
* we try to test the list rendered `expect(wrapped.find('li').length).toEqual(500);` gives errors

### Lecture 58 - Why failure?

* in our test:
	* we simulate click event on the button element
	* action creator gets called
	* request issued
	* request fails
* when we run jest in command line environment our app is executed in a different env using JSDOM. axios requests fail inside JSDOM
* our response is undefined and cannot map on it
* we need to use moxios (mock out axios api) 
* axios talks to moxios mocking the apis o that axios does not fail

### Lecture 59 - Faking Requests with Moxios

* we add a beforeEach and an after Each to use moxios
```
beforeEach(()=>{
	moxios.install();
	moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
		status: 200,
		response: [{ name: 'Fetched #1'},{ name: 'Fetched #2'}]
	});
});

afterEach(()=>{
	moxios.uninstall();
});
```
* we install and uninstall it and use it to stub the axios req to a certain url mocking the repsonse and gicing a status: 200 (ALL OK)

### Lecture 60 - The reason for failure

* is that axios req is async and our assetion in sync
* we add delay

### lecture 61 - Introducing a Pause

* we use setTimeout
```
	// introduce a pause
	setTimeout(()=>{
		//expect to find a list of comments
		expect(wrapped.find('li').length).toEqual(2);
	},100);
```
* we need to tell jest to wait a bit for the settimeout to end before ending the test
* we use a callback called done passed in the test as argument and call it when we are done
```
	setTimeout(()=>{
		wrapped.update();
		//expect to find a list of comments
		expect(wrapped.find('li').length).toEqual(2);
		done();
		wrapped.unmount();
	},100);
```

### Lecture 62 - Moxios wait function

* moxios hasa .wait() method. we refactor to use it. it works like setTIemout without the time in ms
```
	moxios.wait(()=>{
		wrapped.update();
		//expect to find a list of comments
		expect(wrapped.find('li').length).toEqual(2);
		done();
		wrapped.unmount();
	});
```

## Section 3 - Higher Order Components

### Lecture 64 - An Introduction to Higher Order Components (HOC)

* HOCs are normal React Components made to help us reuse code
* Component + HOC = Component (enhanced or COmposed)
* Enhanced components have additional functionality or data

### Lecture 65 - Connect a Higher Order Component

* connect function from react-redux is a HOC
* we use it to share code from react-redux lib with our react components adding a way to bind to the redux side of our app

### Lecture 66 - App Overview

* we ll split our existing app into 2 pages and use react-router lib to navigate between them
* CommentList will apear in / root route
* CommentBox will apear in /post route
* we will add authentication in our app. a simple one without backend support
* if we are not logged in we wont be able to view COmmentBox and be redirected to /
* we will implement a requireAuth HOC that will verify auth status. and reirectif necessary, we will add this HOC to  CommentBox
* we can easily add the HOC to other furture components/pages in our app. (reuse)

### Lecture 67 - Adding React Router

* we `npm install --save react-router-dom`
* we import Route and BrowserRouter from react-router-dom and use them to wrap our App component in index.js
```
	<Root>
		<BrowserRouter>
			<Route path='/' component={App} />
		</BrowserRouter>
	</Root>
```

### Lecture 68 - Adding Routes

* we ll define routes inside of App component replacing tags with Routes.
* we dont break convention as BrowserRoute tag still wraps tags
* specific paths first. but still it renders no mater the path. we use exact prop in root path tag

### Lecture 69 - Auth Reducer

* we can freely navigate between routes
* we ll treat authentication simply. just a boolean in redux state
* we add a new reducer to handle auth boolean in state in auth.js
* we make a new type and action creator
```
export function changeAuth(isLoggedIn){
	return {
		type: CHANGE_AUTH,
		payload: isLoggedIn
	};
}
```
* reducer just parser. the login flag is set on actioncreator call

### Lecture 70 - Rendering a Header

* we ll connect our reducer into combine reducer
* we add a button in App to call the action 
* we make it a class component
* we add a renderheader() hlper method to render the header
* for rendering the button we add another helper

### Lecture 71 - Wiring Up state

* we need to know the auth state var to change the text on the button and call the actioncreator witht the correct param
* we need to map state to props

### Lecture 72 - Changing Auth State

* we call action creator from button `return (<button onClick={this.props.changeAuth(false)}>Sign Out</button>);`

### Lecture 73 - Steps for Building a HOC

* the steps to build a HOC
	* write the logic you want to resuse into  component
	* create a HOC file and add the HOC scaffold (boilerplate code)
	* move the reusable logic into the HOC
	* pass props/config/behaviour through to child component
* we add the logic in ComponentBox component
* to check if he is logged in we need access to auth redux piece of state. we use mapstatetoprops
```
function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}
```
* we add lifecycle methods to check for auth when rendering or renrendering. (componentDidMount, componentDidUpdate)
* we call a simple check helper
```
	shouldNavigateAway() {
		if(!this.props.auth) {
			console.log('PLEASE LEAVE')
		}
	}
```

### Lecture 74 - Forced Navigation with React Router

* instead of just cling a message we want to navigate our user away from the page when not logged in
* we use react-router lib and history object to do prog navigation `this.props.history.push('/')`
* we got our resusable rlogic ready

### Lecture 75 - Creating the HOC

* in /components folder we add a nerw file requireAuth.js to host our HOC
* when we start our filenames with lowercase it means they export a function. when we start with capital we export a class
* our HOC scaffold is
```
import React, { Component } from 'react';

export default (ChildComponent) => {
	class ComposedComponent extends Component {
		render() {
			return <ChildComponent />;
		}
	}

	return ComposedComponent;
};
```
* to use the HOC
	* we import the HOC file in a component file
	* we wrap the component with HOC on export `export default requireAuth(CommentBox);`
* from HOC source file we export a function. to use it we call the function with the component class as a param (child component)
* in a barebone boilerplate HOC we hust render the componet and return it
* when we import the wrapped component in a other react component what we get is the enahanced component

### Lecture 76 - Placing Reusable Logic

* we go to step 3 move logic in HOC scaffold
* we copy lifecycle methods helper and map method. we return the container wrapping it with connect
* in essence we have 2 levels of HOC (our and connect)

### Lecture 77 - Passing Through Props

* connect HOC makes use of props. mapStateToProps, mapDispatchToProps
* we can use this approach in any HOC. pass params as arguments and pass them as props to the child component
* a child prop can inherit props from its environment. e.g Route
* there is a hierarchy in props injected down to CommentBox: App => Route (history) => connect(actions) => requireAuth => CommentBox
* injected props higher in hioerarchy than our HOC appear in our HOC class
* it is our responsibility in HOC to pass them down to the childcompement
* the way to pass them down is in return statement `return <ChildComponent {...this.props} />;`

## Section 4 - Middlewares with Redux

### Lecture 78 - Introduction to Middlewares

* we used a middleware (redux-promise)
* the flow of comm between react and redux in changing and using redux state: 
	* React Component calls a Redux Action Creator
	* Action Creator creates and Action obj
	* Action obj is sent to Redux Middleware
	* Middleware forwards action to Reducers
	* Reduces produce new state
	* State is seto to React Component

### Lecture 79 - The purpose of Redux Promise

* we know that : see Moder React and Redux course notes
* we use `debugger;` hook to inspect inside the action creator and check action object
* if we dont use redux-promise the action payload is a pending promise
* we use middlewares to intercept actions before sent to reducer look into them and control when they will be sent

### Lecture 80 - How Async Middleware Work

* we can cascade (chain) middlewares in a middleware stack. they run in sequence before action reaches reducers
* we will implelement our own custom Async Middleware that will
	* check if action contains a promise in its payload
	* if no it will send action to next middleware
	* if yes it will wait till it resolves
	* when it resolves it will extract the data  make a new action and send it again throught middleware pipeline but this time the paylopad will contain the data not the promise
* this approach works regardless of middleware order

### Lecture 81 - Crazy Middleware Syntax

* we create a new dir in /src called /middlewares and add async.js for our custom middleware
* we add boilerplate middleware code
```
export default function({dispatch}) {
	return function(next) {
		return function(action) {

		}
	}
}
```
* we define functions returning each other (NESTING NASTY CODE). this is the signature of middleware code
* each function gets called with a diferent param necessary for the middleware operation
	* dispatch is the method called to send the action object to reducers. control the action flow
	* next is the method called to pass control to the next middleware in pipline
	* action is the action object from action creator
* we will refactor the code using ES6 and arrow functions
```
export default ({dispatch}) => next => action =>  {

}
```

### Lecture 82 - Forwarding Actions

* we call next
```
	if(!action.payload || !action.payload.then) {
		return next(action);
	}
```

### Lecture 83 - Waiting for Promise Resolution

* action goes into dispatch mechanism. a funnel that forwards action into middleware pipeline and reducers
```
export default ({dispatch}) => next => action => {
	// check to see if the action has a promise as payload
	// if it does wait for it to resolve
	//if not call next
	if(!action.payload || !action.payload.then) {
		return next(action);
	}

	// we want to wait for the promise to resolve gets its data 
	// and make a new action object and dispatch it
	action.payload.then(function(response) {
		const newAction = { ...action, payload: response};
		dispatch(newAction);
	});
}
```

### Lecture 84 - Observing the Middleware

* we wireapp our new middleware replacing redux-promise in Root `import async from './middlewares/async';`
* we use debugger; in FETCH_COMMENTS cas ein reducer to llok inside logging action in console
* we remove debugger statement and add it in middleware
* to catch promise resolution we add a breaklpoint in our middleware callback in promise then

### Lecture 85 - State Validation Middleware

* our next middleware will be good for big projects
* our current app state schema is
	* comments Array<String>
	* auth Boolean
* in our app is unlikely to enter wrong type of data in a state piece. if we do so our app will brake or have unpredicted behaviour
* Our Schema Middleware will:
	* wait till it is the last middleware to run. it will send the actionb to the NEXT middleware
	* if all is done it will get the new updated redux state.
	* it will validate its structure and type of vals in state.
	* if is valid do nothing
	* if invalid log warning
* this middleware will be for dev environe,mnts
* it will run AFTER reeducers calculate new state

### Lecture 86 - JSON Schema

* how to validate state??? 
* we will use JSON schema lib for validating JSON docs [JSON Schema](https://json-schema.org/)
* we will format our state schema doc and use it in the lib

### Lecture 87 - Generating JSON Schema

* we install the lib `npm install --save tv4`
* to build our schema we use [jsonschema tool](https://www.jsonschema.net/)
* wenter a state sample in JSON format in the tool to get the schema
```
{
  "comments": [
    "Comment #1",
    "Comment #2"
  ],
  "auth": true
}
```
* infered schema
```
 1 {
 2   "definitions": {},
 3   "$schema": "http://json-schema.org/draft-07/schema#",
 4   "$id": "http://example.com/root.json",
 5   "type": "object",
 6   "title": "The Root Schema",
 7   "required": [
 8     "comments",
 9     "auth"
10   ],
11   "properties": {
12     "comments": {
13       "$id": "#/properties/comments",
14       "type": "array",
15       "title": "The Comments Schema",
16       "items": {
17         "$id": "#/properties/comments/items",
18         "type": "string",
19         "title": "The Items Schema",
20         "default": "",
21         "examples": [
22           "Comment #1",
23           "Comment #2"
24         ],
25         "pattern": "^(.*)$"
26       }
27     },
28     "auth": {
29       "$id": "#/properties/auth",
30       "type": "boolean",
31       "title": "The Auth Schema",
32       "default": false,
33       "examples": [
34         true
35       ]
36     }
37   }
38 }
```

### Lecture 88 - Middleware Creation

* we add a new file in middlewares folder and add boilerplate code
* first we do nothing so that ationhits reducers
* we add inferred JSON schema to a new file stateSchema.js
* we import tv4 lib and scehma
* we use a seconf param of middleware object `export default ({dispatch, getState}) => next => action => {` get State contains the new State produced by reducers
* we consolo log the validation result `console.log(tv4.validate(getState(), stateSchema));`

### Lecture 89 - Emmitting Warnings

* we import the middleware in Root
* the order of middleware in applyMiddleware sets the order in the pipeline
* we test it printing a browser warning in console `console.warn()`

## Section 5 - Server Setup - Authentication

### Lecture 90 - Introduction to Authentication

* the authentication flow where authentication is handled in backend is
	* client => server: username,password
	* server: looks a username, password
	* server => client: credentials are good, you are authenticated. here is an identifying piece of information include it in all future requests (token)
	* client: can now make authenticated requests
	* client=>server: i need protected info, here is my token 
	* server=>client: i see your identifying piece of info tht authenticates you. here is the info

### Lecture 91 - Cookies vs Tokens

* Cookie:
	* automatically included in all requests
	* unique to each domain
	* cannot be sent to different domains
	* Request:
	```
	//headers
	cookie: {}
	//body
	{
		color: 'red'
	}
	```
* Token
	* have to manually  wire up
	* can be sent to any domain
	* Request:
	```
	//headers
	authorization: fdaryrwyt742gwdyuwq
	//body
	{
		color: 'red'
	}
	```
* cookies give state to the HTTP protocol that is stateless
* tokens a reusefull for distreibuted applications on different domains

### Lecture 92 - Scalable Architecture

* in our app when the user visits our homepage home-app.com the user gets index.html+bundle.js from the content server.
* our-app.com point s to the content server. only serves index.html and bundle.js.
* no auth is required
* to get data from our api server auth is required.
* API server is 100% separate. there might be several ones
* we can spin multiple content servers in different geographic locations
* maybe we have a mobile app that hits the api servers. so we expect much more load to the API servers. we might need a load balancer

### Lecture 93 - Server Setup

* we make a new project folder /auth and in it we put a /server folder for our API server
* in server we run `npm init`
* we install some dependencies `npm install --save express mongoose morgan body-parser`
* we add an index.js root file

### Lecture 94 - More Server Setup

* API server is an express node server . node projects run on ES5 syntax. so we do oldschool js imports
* code is standard express node server setup
```
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
```

### Lecture 95 - Express Middleware

```
const app = express();

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
```

* our express app uses 2 moddlewares . body parser and morgan for logging requests
* body parser is used to parse http body
* we install nodemon to avoid restarting app after change `npm install --save nodemon`
* we add a script in package.json "dev": "nodemon index.js"

### Lecture 96 - Express Route Handler

* we add a new file router.js to add express route handlers
* we export a module es5 style
* we import router in index.js and pass into to it the app `router(app);`
* a typical es5 style express route handler looks like
```
	app.get('/', function(req,res,next){
		res.send(['foo','bar']);
	});
```
* next is used for error handling

### Lecture 97 - Mongoose Models

*  in our app the libraryies we will use are
	* low level request handling: HTTP module for handling HTTP requests
	* routing, server logic: BosyParser to parse incoming HTTP requests, Morgan for logging, Express to parse response + routing
	* Database: MongoDB to store data, Mongoose to work with MongoDB
	* Authentication: Bcrypt-Nodejs to store a users password safely,Passport-JWT to authenticate users using a JWT, Passport Local to authenticate useing username/password, Passport JS to authenticate users
* we will create a new user model and feed it to mongoose
* we create a new folder /models and add a file called user.js for our model
* we import mongoose ans mongoose.Schema
* to create a model we need a schema a blueprint of our model
```
const userSchema = new Schema({
	email: String,
	password: String
});
```
* we need to enfore uniqueness on our email. so instead of a string we pass an object ` {type: String, unique: true}`
* mongodb is case insensitive. store email always lowercase `{type: String, unique: true, lowercase: true}`
* we create our model from schema `const model = mongoose.model('user', userSchema);` user is the collection in MongoDB. model is a class
* we export it

### Lecture 98 - MongoDB Setup

* we install mongoDB (linux)
* we start it with mongod

### Lecture 99 - Inspecting the Database

* we need to configure mongoose mongodb connection
* we require mongoose in our root file
* we connect `mongoose.connect('mongodbL//localhost:auth/auth');
* we use Robo3T for visualising mongoDB `

### Lecture 100 - Authentication Controller

* our incoming request goet throught the router. then it will go to 1 of 3 controllers depending on path. comments controller, auth controller, posts controller. each one returns a response (HTTP)
* typically we have 1 controller per resource
* we will implment the authentication controller in separate file. we add a folder /controllers and a file in it. authentication.js
* the controller exports a route handler method. router imports it and send request there for handling depending on the path
```
const Authentication = require('./controllers/authentication');
module.exports = function(app) {
	app.post('/signup', Authentication.signup);
}
```
* we test in postman

### Lecture 101 - Searching for users

* we fleshout the controller with the following
	* see if a user with a given email exists
	* if a user with eamil exists return an error
	* if a user with email does niot exist , create and save user record 
	* respond to request indicating user was created
* we extract data from request. data come in http body as json. bodyParser middleware works and gives us js in boby e.g `const password = req.body.password;`
* we import our user model class and use its class method findOne
```
	User.findOne({ email: email }, function(err,existingUser){
		
	});
```

### Lecture 102 - Creating User Accounts

* our signup route controller  (heavy use of callbacks)
```
const User = require('../models/user');

exports.signup = function(req,res,next) {
	const email = req.body.email;
	const password = req.body.password;
	// see if a user with a given email exists
	User.findOne({ email: email }, function(err,existingUser){
		if(err){return next(err);}
		// if a user with eamil exists return an error
		if(existingUser){
			return res.status(422).send({error: 'Email is in use'});
		}
		//if a user with email does niot exist , create and save user record 
		const user = new User({
			email: email,
			password: password
		});

		user.save(function(err){
			if (err) { return next(err);}

			// respond to request indicating user was created
			res.json(user);
		});
	});
}
```

### Lecture 103 - Encrypting Passwords with Bcrypt

* we add a fix to return early if request contains no data
* passwords should not be stored unencrypted
* we install bcrypt `npm install --save bcrypt-nodejs`
* in our user model file we import it
* we add a save hook to user schema intercepting the save to DB flow doing the encryption (first generate salt, then hash). code is a bit criptic with callback hell
```
// on save hook, encrypt password
userSchema.pre('save', function(next) {
	const user = this;

	bcrypt.genSalt(10, function(err, salt) {
		if(err){return next(err);}

		bcrypt.hash(user.password, salt, null, function(err,hash) {
			if (err){return next(err);}

			user.password = hash;
			next();
		});
	});
});
```

### Lecture 104 - Salting a password

* the context of this function is the user model (when it is called)
* the flow that bcrypt uses then encrypting: salt+password= salt+hashed password
* comparing a password at sign in (decrypt): salt+hashedpasswd (from db) => salt+submitted password (user) = hashed passwd => compare to db hashed ifequal all ok
* what we store in DB is salt+hashedpassword

### Lecture 105 - JWT Overview

* how we compare password with hash later on (sign in)?
* in our signup when all OK we respond with a dummy json. WTF? we need a token to treat them as loged in.
* we need to produce this item. we ll use JWT. How it works???
* At signup or sign in: User ID+our secret string = JSON Web Token (JWT)
* When user hits the app with the JWT in his request: JWT + Our secret string = User Id. we know who he is
* keep Secret string secret. NO github

### Lecture 106 - Creating a JWT

* we install a lib for jwt `npm install --save jwt-simple`
* we add a config.js file in project root and add it to .gitignore (for secrets)
* in our authentication controller we import config and jwt lib
* we add a helpermethod withan argument (usermodel)
* we create JWT with an item that identifies the entity  and does not change. id is ok for that
```
//pass in user model
function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}
```
* sub is the subject of token
* iat means issued at time
* we return the token in our reply (generate and return)

### Lecture 107 - Installing Passport

* we need to give users ability to signin.
* we need to find a way to check user is authenticated when hitting protected resources
* before hitting resource controllers aafter router we need to check
* we will use passport js `npm install passport passport-jwt`
* we put all passport related code in passport.js in anew folder /services
* we import passport ibs and user model
```
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
```

### Lecture 108 - Passport Strategies

* our request hits passport before going to route handler.
* passport uses a strategy to authenticate. example strategiew: jwt user/passwo
* we installled jwt strategy as passport-jwt
* we define a config object to config the strategy
* we create the strategy (instatiate the class) passing in params. the config object and a callback. 
* the callback gets 2 arguments. payload=decoded token (user.id for our app + timestamp). done is a callback to use to say we are ok to authenticate user
```
//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// see if user ID in payload existss in our DB
	// if it does call done() with that 
	// if not call done() without a user
	User.findById(payload.sub, function(err,user){
		if (err) {return done(err, false);}
		if(user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});
```

### Lecture 109 - Using Strategies with Passport

* the stategy will be called when a request hits the server with a jwt in it
* we set the options teeling passport where to look for the jwt in the http request and where to look for the secret key to decode the token
```
// setup options for JWT strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};
```
* we also have to tell passport to use this strategy `passport.use(jwtLogin);`

### Lecture 110 - Making an Authenticated Request

* we need to wire passport to our request handling flow.
* we import passport in router.js ans our service file
* we create an express middleware to use `const requireAuth = passport.authenticate('jwt', { session: false });`
* passport by default wants to create a cookie session. we disable that
* we use it  asa middleware

### Lecture 111 - Signin with Local Strategy

* we implement the '/login' route
* in signin we get a username and password not a token like in signup
* we use a local pstrategy. we install the plugin `npminstall --save passport-local`
* we import it `const LocalStrategy = require('passport-local');`
* we create our strategy `const localLogin = new LocalStrategy({ usernameField: 'email'},function(email,password,done));`
* we specify in config object that our user fiels will be email

### Lecture 112 - Purpose of Local Strategy

* we have 3 flows
	* signing up => verufy email is not in use => token
	* signin in => verify email/password => token
	* auth'd req => verify token => resource access
*  we need to encrypt the password to compare

