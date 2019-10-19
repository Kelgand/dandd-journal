const defaultState = {
	text: "",
	errorMessage: null,
	day: 1,
	month: 0,
	year: 2019,
	showAddNew: false
}

export default (state = defaultState, action) => {
	const { type, payload } = action;
	switch(type){
		case "EDIT_NEW_ENTRY_DATE":
			const { year, month, day } = payload; 
			return {
				...state,
				year,
				month,
				day
			}
		case "EDIT_NEW_ENTRY_TEXT":
			const { text } = payload;
			return {
				...state,
				text
			}
		case "TOGGLE_ADD_NEW_WINDOW":
			return {
				...state,
				showAddNew: !state.showAddNew
			}
			break;
		default:
			return state;
	}
};