import tv4 from 'tv4';
import stateSchema from './stateSchema';

export default ({dispatch, getState}) => next => action => {
	// do nothing
	next(action);

	id(!tv4.validate(getState(), stateSchema)){
		console.warn('Invalid state schema detected');
	}
}