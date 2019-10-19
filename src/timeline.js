let converter = new showdown.Converter();
converter.setOption("strikethrough", true);

var daysList = ["One","Two","Three","Four","Five","Six","Seven", "Eight", "Nine", "Ten"];
var monthsList = [{name: "Horisal", daysInMonth: 29},{name: "Misuthar", daysInMonth: 30},{name: "Dualahei", daysInMonth: 30},{name: "Thunsheer", daysInMonth: 31},{name: "Unndilar", daysInMonth: 28},{name: "Brussendar", daysInMonth: 31},{name: "Sydenstar", daysInMonth: 32},{name: "Fessuran", daysInMonth: 29},{name: "Quen'pillar", daysInMonth: 27},{name: "Cuersaar", daysInMonth: 29},{name: "Duscar", daysInMonth: 32}];

var holidaysArray = [
	{year: 2019, month: 0, day: 1, text: "New Dawn"},
	{year: 2019, month: 0, day: 27, text: "Hillsgold"},
	{year: 2019, month: 1, day: 7, text: "Day of Challenging"},
	{year: 2019, month: 2, day: 13, text: "Renewal Festival"},
	{year: 2019, month: 3, day: 11, text: "Harvest's Rise"},
	{year: 2019, month: 3, day: 31, text: "Merryfrond's Day"},
	{year: 2019, month: 4, day: 18, text: "Deep Solace"},
	{year: 2019, month: 4, day: 26, text: "Zenith"},
	{year: 2019, month: 5, day: 15, text: "Artisan's Faire"},
	{year: 2019, month: 5, day: 20, text: "Elvendawn/Midsummer"},
	{year: 2019, month: 6, day: 14, text: "Morn of Largesse"},
	{year: 2019, month: 6, day: 15, text: "Highsummer"},
	{year: 2019, month: 7, day: 3, text: "Harvest's Close"},
	{year: 2019, month: 8, day: 10, text: "The Hazel Festival"},
	{year: 2019, month: 8, day: 22, text: "Civilization's Dawn"},
	{year: 2019, month: 9, day: 13, text: "Night of Ascension"},
	{year: 2019, month: 9, day: 21, text: "Zan's Cup"},
	{year: 2019, month: 10, day: 2, text: "Barren Eve"},
	{year: 2019, month: 10, day: 5, text: "Embertide"},
	{year: 2019, month: 10, day: 20, text: "Winter's Crest"}
	];

let eventsObject = {}
let holidayObject = {};
let lastShown = {type: null};
let addStatus = {type: null};

function CreateCalendar(days, months){
	let currentYear = 2019;
	let totalDays = CountDaysInMonths(monthsList);
	let daysInWeek = days.length;
	let daysRemainingInWeek = daysInWeek;
	
	let weekContainer = document.getElementById("weekContainer");
	let weeksInYear = Math.ceil(totalDays / daysInWeek);
	
	let yearElement = document.createElement("div");
	yearElement.setAttribute("id", "year"+currentYear); 
	yearElement.classList.add("year");
	
	let yearFiller = document.createElement("div");
	yearFiller.classList.add("yearFiller");
	yearFiller.setAttribute("onclick", `ShowEventsInYear(${currentYear}, event)`);
	yearFiller.innerHTML = `<h3>${currentYear.toString().split('').join("<br>")}</h3>`;
	
	yearElement.appendChild(yearFiller);
	
	months.map(function(month, monthIndex){
		let monthElement = document.createElement("div");
		monthElement.setAttribute("id", month.name + currentYear);
		monthElement.setAttribute("onclick", `ShowEventsInMonth('${monthIndex}', ${currentYear})`);
		monthElement.classList.add("month", "days"+month.daysInMonth);
		monthElement.innerHTML = "<div class='monthName'>" + month.name + "</div>";
		
		yearElement.appendChild(monthElement);
	});
	
	document.getElementById("calendarContainer").appendChild(yearElement);
	
	for(let i = 0; i < weeksInYear; i++){
		let week = document.createElement("div");
		week.classList.add("week");
		week.setAttribute("onClick", `ShowEventsInWeek(${i}, ${currentYear})`)
		weekContainer.appendChild(week);
	}
}

function ParseEvents(events, type){
	let eventExists = false;
	let eventObj = type == "event" ? eventsObject : holidayObject;
	
	events.map(function(event){
		if(!eventObj[event.year]){
			eventObj[event.year] = {};
		}
		
		if(!eventObj[event.year][event.month]){
			eventObj[event.year][event.month] = {};
		}
		
		if(eventObj[event.year][event.month][event.day] && type == "event"){
			eventExists = true;
		} else {
			eventObj[event.year][event.month][event.day] = event;
		}
		
		HighlightWeekOfEvent(event, type, true);
	});
}

function HighlightWeekOfEvent(event, type, enable){
	let dayOfYearOfEvent = event.day-1 + CountDaysInMonths(monthsList.slice(0, event.month));
	let weekOfEvent = Math.floor(dayOfYearOfEvent / daysList.length);
	if(enable){
		document.getElementsByClassName("week")[weekOfEvent].classList.add(type);
	} else {
		if(GetAllEventsInWeek(eventsObject, weekOfEvent).length == 0){
			document.getElementsByClassName("week")[weekOfEvent].classList.remove("event");
		}
	}
}

function GetAllEventsInWeek(arr, week){
	let lengthOfWeek = daysList.length;
	let daysPriorToWeek = lengthOfWeek * week;
	let currentMonth = 0;
	
	for(; currentMonth < monthsList.length; currentMonth++){
		if(daysPriorToWeek > monthsList[currentMonth].daysInMonth){
			daysPriorToWeek -= monthsList[currentMonth].daysInMonth;
		} else {
			break;
		}
	}
	
	let events = [];
	let daysInMonth = monthsList[currentMonth].daysInMonth;
	for(let i = 0; i <= lengthOfWeek; i++){
		let day = 0;
		let month = 0;
		let year = 2019;
		
		if(daysPriorToWeek + i > daysInMonth){
			month = currentMonth + 1;
			day = daysPriorToWeek + i - daysInMonth;
		} else {
			month = currentMonth;
			day = daysPriorToWeek + i;
		}
		
		if(arr[year][month]){
			if(arr[year][month][day]){
				events.push(arr[year][month][day]);
			}
		}
	}
	
	return events;
}

function GetAllEventsInMonth(arr, month, year){
	if(arr[year] && arr[year][month]){
		return Object.values(arr[year][month]);
	} else {
		return [];
	}
}

function GetAllEventsInYear(arr, year){
	let events = [];
	
	if(arr[year]){
		Object.values(arr[year]).map(function(month){
			events = events.concat(Object.values(month));
		})
	}
	
	return events;
}

function CountDaysInMonths(months){
	return months.reduce(function(total, month){
		return total + month.daysInMonth;
	}, 0);
}

function ShowEventsInWeek(week, year){
	lastShown = {type: "week", week: week, year: year};
	Display(GetAllEventsInWeek(holidayObject, week), GetAllEventsInWeek(eventsObject, week));
}

function ShowEventsInMonth(month, year){
	lastShown = {type: "month", month: month, year: year};
	Display(GetAllEventsInMonth(holidayObject, month, year), GetAllEventsInMonth(eventsObject, month, year));
}

function ShowEventsInYear(year){
	lastShown = {type: "year", year: year};
	Display(GetAllEventsInYear(holidayObject, year), GetAllEventsInYear(eventsObject, year));
}

function Display(holidays, events){
	document.getElementById("welcome").classList.add("hide");
	if(holidays){
		let holidayList = document.getElementById("holidayList");
		holidayList.innerHTML = "<h2>Holidays</h2>";
		
		holidays.sort(EventSort).map(function(holiday){
			let holidayElement = document.createElement("li");
			holidayElement.innerText = `${monthsList[holiday.month].name} ${holiday.day}: ${holiday.text}`;
			holidayList.appendChild(holidayElement);
		});
	}
	
	if(events){
		let dayList = document.getElementById("days");
		dayList.innerHTML = "";
		events.sort(EventSort).map(function(event){
			let dayElement = document.createElement("div");
			dayElement.classList.add("day");
			
			let html = `<span class='dayTitle'>${monthsList[event.month].name} ${event.day}</span>: <br><div id=${event.year}-${event.month}-${event.day}>` + converter.makeHtml(event.text) + "</div>";
			
			dayElement.innerHTML = html;
			dayList.appendChild(dayElement);
		});
	}
}

function EventSort(a, b){
	if(a[0] != b[0]){
		return a[0] - b[0];
	} else if(a[1] != b[1]){
		return a[1] - b[1];
	} else if(a[2] != b[2]){
		return a[2] - b[2];
	}
	
	return 0;
}

function RefreshView(){
	if(lastShown.type == "week"){
		ShowEventsInWeek(lastShown.week, lastShown.year);
	} else if(lastShown.type == "month"){
		ShowEventsInMonth(lastShown.month, lastShown.year);
	} else if(lastShown.type == "year"){
		ShowEventsInYear(lastShown.year);
	}
}

function GetInitialData(){
	fetch("https://jbrooks.me/timeline/events")
		.then(function(res){
			return res.json();
		})
		.then(function(data){
			if(!data.err){
				console.log(data.results);
				ParseEvents(data.results, "event");
			} else {
				console.log(data.err);
			}
		})
}

CreateCalendar(daysList,monthsList);
ParseEvents(holidaysArray, "holiday");
GetInitialData();

