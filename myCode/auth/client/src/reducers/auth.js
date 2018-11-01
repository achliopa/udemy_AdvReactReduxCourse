import { USER_AUTH } from '../actions/types';

const INITIAL_STATE = {
	authenticated: '',
	errorMessage: ''
};

export default function(state= INITIAL_STATE,action){
	switch(action.type) {
		case USER_AUTH:
			return { ...state, authenticated: action.payload};
		case AUTH_ERROR:
			return { ...state, errorMessage: action.payload};
		default:
			return state;
	} 
}