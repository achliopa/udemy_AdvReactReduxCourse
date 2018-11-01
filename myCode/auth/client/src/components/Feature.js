import Reac, { Component } from 'react';

class Feature extends Component {
	render() {
		return (
			<div>
				This si the feature!
			</div>
		);
	}
}

export default requireAuth(Feature);
