//const axios = require('axios');

var daysList = ["One","Two","Three","Four","Five","Six","Seven", "Eight", "Nine", "Ten"];
var monthsList = [{name: "Horisal", daysInMonth: 29},{name: "Misuthar", daysInMonth: 30},{name: "Dualahei", daysInMonth: 30},{name: "Thunsheer", daysInMonth: 31},{name: "Unndilar", daysInMonth: 28},{name: "Brussendar", daysInMonth: 31},{name: "Sydenstar", daysInMonth: 32},{name: "Fessuran", daysInMonth: 29},{name: "Quen'pillar", daysInMonth: 27},{name: "Cuersaar", daysInMonth: 29},{name: "Duscar", daysInMonth: 32}];
const holidays = [
	{month: 0, day: 1, text: "New Dawn"},
	{month: 0, day: 27, text: "Hillsgold"},
	{month: 1, day: 7, text: "Day of Challenging"},
	{month: 2, day: 13, text: "Renewal Festival"},
	{month: 3, day: 11, text: "Harvest's Rise"},
	{month: 3, day: 31, text: "Merryfrond's Day"},
	{month: 4, day: 18, text: "Deep Solace"},
	{month: 4, day: 26, text: "Zenith"},
	{month: 5, day: 15, text: "Artisan's Faire"},
	{month: 5, day: 20, text: "Elvendawn/Midsummer"},
	{month: 6, day: 14, text: "Morn of Largesse"},
	{month: 6, day: 15, text: "Highsummer"},
	{month: 7, day: 3, text: "Harvest's Close"},
	{month: 8, day: 10, text: "The Hazel Festival"},
	{month: 8, day: 22, text: "Civilization's Dawn"},
	{month: 9, day: 13, text: "Night of Ascension"},
	{month: 9, day: 21, text: "Zan's Cup"},
	{month: 10, day: 2, text: "Barren Eve"},
	{month: 10, day: 5, text: "Embertide"},
	{month: 10, day: 20, text: "Winter's Crest"}
	];

const defaultState = {
	currentYear: null,
	currentMonth: null,
	daysList,
	monthsList,
	holidays
}

export default (state = defaultState, action) => {
	const { type, payload } = action;
	switch(type){
		case "SET_VIEWED_DATE":
			return {
				...state,
				currentYear: payload.year,
				currentMonth: payload.month
			}
		default:
			return state;
	}
};