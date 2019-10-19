import React from 'react';

import Holidays from './holidays/holidays.jsx';
import AddEntry from './addEntry/index.js';
import './entries.css';

import {GetCalendarData, DeleteEntry} from './entriesActions';

let Converter = require('react-showdown').Converter;
let converter = new Converter({"strikethrough": true});

export default class Entries extends React.Component{
	constructor(props){
		super(props);
		this.handleDeleteEntry = this.handleDeleteEntry.bind(this);
		this.state = {
			url: '/api'
		}
	};

	
	componentDidMount() {
		fetch(this.state.url)
		.then(res => {
			return res.json();
		})
		.then(res => {
			this.props.dispatch(GetCalendarData(res));
		})
	};

	handleDeleteEntry(year, month, day) {
		const { dispatch } = this.props;
		fetch(this.state.url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({year, month, day}) // body data type must match "Content-Type" header
		})
		.then(res => res.json())
		.then(res => {
			if(res.status === 'success'){
				dispatch(DeleteEntry(year, month, day));
			}
		})
	}
	
	render(){
		const { currentMonth, currentYear, monthsList, holidays } = this.props.calendar;
		const { entries } = this.props;
		
		let entriesToShow = Object.values(entries).map(year => {
				return Object.values(year).map(month => {
					return Object.values(month).filter(day => {
						if(currentYear !== null && day.year !== currentYear){
							return false;
						}
						
						if(currentMonth !== null && day.month !== currentMonth){
							return false;
						}
						
						return true;
					});
				});
		}).flat(2);
		
		if(currentYear !== null){
			return(
				<div className="entriesContainer">
					<Holidays holidays={holidays} currentMonth={currentMonth} monthsList={monthsList} />
					{
						entriesToShow.map(day => {
							return(
								<div className="event" key={`${day.year}${day.month}${day.day}`}>
									<div className="eventTitle">
										<div>{`${monthsList[day.month].name} ${day.day}, ${day.year}`}</div>
										<span onClick={() => this.handleDeleteEntry(day.year, day.month, day.day)}>X</span>
									</div>
									{converter.convert(day.text)}
								</div>
							)
						})
					}
					<AddEntry />
				</div>
			)
		} else {
			return (
				<div className="entriesContainer">
					<h1>Welcome to the Fang Steppers travel log</h1>
					<p>
						This is a collection of our D&D group's travels. It is half note taking, half programming practice.
					</p>
					<p>
						Click on a month or a year to the left to begin. All entries can be created or edited using markdown for styling.
					</p>
				</div>
			)
		}
	}
}