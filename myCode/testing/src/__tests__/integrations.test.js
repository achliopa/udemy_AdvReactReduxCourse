import React from 'react';
import Root from '../Root';
import { mount } from 'enzyme';
import moxios from 'moxios';
import App from '../components/App';

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


it('can fetch a list of comments and display them', (done)=>{
	//attempt to render the entire app
	const wrapped = mount(
		<Root>
			<App/>
		</Root>
	);
	// find the 'fetchComments' button and click it
	wrapped.find('.fetch-comments').simulate('click');
	// introduce a pause
	// setTimeout(()=>{
	// 	wrapped.update();
	// 	//expect to find a list of comments
	// 	expect(wrapped.find('li').length).toEqual(2);
	// 	done();
	// 	wrapped.unmount();
	// },100);
	moxios.wait(()=>{
		wrapped.update();
		//expect to find a list of comments
		expect(wrapped.find('li').length).toEqual(2);
		done();
		wrapped.unmount();
	});
});