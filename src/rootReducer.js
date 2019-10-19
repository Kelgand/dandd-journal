import { combineReducers } from 'redux';
import CalendarReducer from './calendar/calendarReducer.js';
import entries from './entries/entriesReducer.js';
import addEntryReducer from './entries/addEntry/addEntryReducer.js';

export default combineReducers({
	calendar: CalendarReducer,
	entries,
	addEntry: addEntryReducer
});