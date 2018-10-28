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

* 