import React, { Component } from 'react';
import Map from './Map';

class MapIndex extends Component {
	render() {
		return(
				<Map
					google={this.props.google}
					center={{lat: 10.483821, lng: -66.903395}}
					height='400px'
					width='700px'
					zoom={15}
				/>
		);
	}
}

export default MapIndex;