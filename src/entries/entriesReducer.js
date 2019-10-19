const defaultState = {};

export default (state = defaultState, action) => {
	const { type, payload } = action;
	switch(type){
		case "SAVE_NEW_ENTRY":
			const { year, month, day, text } = payload;
			let result = {...state};
			if(!result[year]){
				result[year] = {};	
			}

			if(!result[year][month]){
				result[year][month] = {};
			}

			result[year][month][day] = {year, month, day, text};
			return result;
			break;
		case "DELETE_ENTRY":
			{
			const { year, month, day } = payload;
			let result = {...state};
			delete result[year][month][day];
			return result;
			}
		case "GET_CALENDAR_ENTRIES":
			return payload.entries;
		default:
			return state;
	}
};