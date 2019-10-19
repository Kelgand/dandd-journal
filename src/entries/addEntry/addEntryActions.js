export function EditNewEntryDate(year, month, day){
	return {
		type: "EDIT_NEW_ENTRY_DATE",
		payload: {
			year,
			month,
			day
		}
	}
}

export function EditNewEntryText(text){
	return {
		type: "EDIT_NEW_ENTRY_TEXT",
		payload: {
			text
		}
	}
}

export function SaveNewEntry(year, month, day, text){
	console.log(JSON.stringify(text));
	return {
		type: "SAVE_NEW_ENTRY",
		payload: {
			year,
			month,
			day,
			text
		}
	}
}

export function ToggleAddNewWindow(){
	return {
		type: "TOGGLE_ADD_NEW_WINDOW",
		payload: {}
	}
}