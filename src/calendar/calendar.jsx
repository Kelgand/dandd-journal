import React from 'react';

import { setViewedDate } from './calendarActions.js';
import './calendar.css';
import Year from '../containers/year.jsx';

export default class Calendar extends React.Component{
	constructor(props){
		super(props);
		
		this.handleSetViewedDate = this.handleSetViewedDate.bind(this);
	};
	
	handleSetViewedDate(year, month){
		const { dispatch } = this.props;
		dispatch(setViewedDate(year, month));
	}
	
	render(){
		const { entries } = this.props;
		const { monthsList } = this.props.calendar;
		return(
			<div className="calendarContainer">
				{
					Object.keys(entries).map(year => {
						return (
							<Year year={year} months={monthsList} key={year} setDate={this.handleSetViewedDate} />
						)
					})
				}
			</div>
		)
	}
}