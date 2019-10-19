import React from 'react';

import { EditNewEntryText, EditNewEntryDate, SaveNewEntry, ToggleAddNewWindow } from './addEntryActions.js';

import './addEntry.css';

let Converter = require('react-showdown').Converter;
let converter = new Converter({"strikethrough": true});

export default class AddEntry extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			url: '/api'
		}
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSaveNewEntry = this.handleSaveNewEntry.bind(this);
		this.handleShowAddNewWindow = this.handleShowAddNewWindow.bind(this);
	};

	handleDateChange(year, month, day){
		const { dispatch } = this.props;
		dispatch(EditNewEntryDate(year, month, day))
	}

	handleTextChange(text){
		const { dispatch } = this.props;
		dispatch(EditNewEntryText(text));
	}

	handleSaveNewEntry(){
		const { dispatch } = this.props;
		const { year, month, day, text } = this.props.addEntry;
		fetch(this.state.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({year, month, day}) // body data type must match "Content-Type" header
		})
		.then(res => res.json())
		.then(res => {
			if(res.status === 'success'){
				dispatch(SaveNewEntry(year, month, day, text));
				dispatch(ToggleAddNewWindow());
			}
		});
	}

	handleShowAddNewWindow(){
		const { dispatch } = this.props;
		dispatch(ToggleAddNewWindow());
	}
	
	render(){
		const { text, year, month, day, errorMessage, showAddNew } = this.props.addEntry;
		const { monthsList } = this.props.calendar;
		if(showAddNew){
			return (
				<div className="newEntryContainer">
					<h3>Add New Entry</h3>
					<select id="addNewMonths" onChange={(event) => this.handleDateChange(year, parseInt(event.target.value), day)}>
						{
							monthsList.map((month, index) => {
								return <option value={index} key={month.name}>{month.name}</option>
							})
						}
					</select>
					<select id="addNewDays" onChange={(event) => this.handleDateChange(year, month, parseInt(event.target.value)+1)}>
						{
							new Array(monthsList[month].daysInMonth).fill(0).map((x, index) => {
								return (
									<option value={index} key={index}>
										{index + 1}
									</option>
								)
							})
						}
					</select>
					<input type="number" value={year} onChange={(event) => this.handleDateChange(parseInt(event.target.value), month, day)} />
					<br />
					<textarea value={text} onChange={(event) => this.handleTextChange(event.target.value)} /><br />
					<button onClick={() => this.handleSaveNewEntry()}>Save</button>
					{
						errorMessage ? <p>errorMessage</p> : null
					}
				</div>
			)
		} else {
			return (
				<button className='addNewButton' onClick={() => this.handleShowAddNewWindow()}>
					Add New
				</button>
			);
		}
	}
}