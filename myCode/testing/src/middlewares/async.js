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