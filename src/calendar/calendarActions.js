export function setViewedDate(year, month){
	return {
		type: "SET_VIEWED_DATE",
		payload: {
			month,
			year
		}
	}
};