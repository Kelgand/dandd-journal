export function GetCalendarData(entries){
	return {
		type: "GET_CALENDAR_ENTRIES",
		payload: {
			entries
		}
	}
}

export function DeleteEntry(year, month, day){
	return {
		type: 'DELETE_ENTRY',
		payload: { year, month, day }
	}
}