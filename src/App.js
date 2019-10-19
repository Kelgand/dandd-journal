import React from 'react';
import './App.css';

import Calendar from './calendar/index.js';
import Entries from './entries/index.js';

function App() {
	return (
		<div className="mainContainer">
			<div id="header">
				FANG STEPPERS
			</div>
			<div className="content">
				<Calendar />
				<Entries />
			</div>
		</div>
	);
}

export default App;
