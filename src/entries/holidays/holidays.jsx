import React from 'react';

import './holidays.css';

export default class Holidays extends React.Component{
	constructor(props){
		super(props);
	};
	
	render(){
		const { holidays, monthsList, currentMonth } = this.props;
		
		let holidaysToShow; 
		
		if(currentMonth !== null){
			holidaysToShow = holidays.filter(holiday => {
				return holiday.month === parseInt(currentMonth);
			})
		} else {
			holidaysToShow = holidays;
		}
		
		return(
			<div className="holidayContainer">
				<h3>Holidays {currentMonth !== null ? `in ${monthsList[currentMonth].name}` : "of the year"}</h3>
				<ul>
					{
						holidaysToShow.map(holiday => {
							return (
								<li key={`${holiday.text}`}>
									{`${monthsList[holiday.month].name} ${holiday.day}: ${holiday.text}`}
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}