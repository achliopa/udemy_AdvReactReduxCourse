import { saveComment } from '../';
import { SAVE_COMMENT } from '../types';

describe('save comment', ()=>{
	it('has the correct type',()=> {
		const action= saveComment();
		expect(action.type).toEqual(SAVE_COMMENT);
	});

	it('has the correct payload',()=> {
		const comment = 'test comment'
		const action= saveComment(comment);
		expect(action.payload).toEqual(comment);
	});
});
