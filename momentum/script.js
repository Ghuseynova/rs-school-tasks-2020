const time = document.querySelector('.js-time');
const dateEl = document.querySelector('.js-date');
const dayTime = document.querySelector('.js-day-time');
const nameEl = document.querySelector('.js-name');
const focusEl = document.querySelector('.js-focus');
const bgEl = document.querySelector('.js-bg');
const city = document.querySelector('.js-city');
const weatherAdditinal = document.querySelector('.js-additional');
const quote = document.querySelector('.js-quote');
const btnRefreshBg = document.querySelector('.js-bg-btn');
const btnNewQuote = document.querySelector('.js-other-quote');

function showTime() {
	const date = new Date();
	const hour = date.getHours();
	const min = date.getMinutes();
	const sec = date.getSeconds();

	time.innerHTML = `<span>${addZero(hour)}</span>:<span>${addZero(
		min
	)}</span>:<span>${addZero(sec)}</span>`;
}

function showDate() {
	const weekDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const date = new Date();

	const month = months[date.getMonth()];
	const day = date.getDate();
	const weekDay = weekDays[date.getDay()];

	dateEl.innerHTML = `${weekDay}, ${month} ${day}`;
}

function addZero(num) {
	return num <= 9 ? `0${num}` : num;
}

function getName() {
	const name = localStorage.getItem('name');
	if (name !== null) {
		nameEl.innerText = name;
	} else {
		nameEl.innerText = 'Brave Soldier';
	}
}

function getFocus() {
	const focus = localStorage.getItem('focus');
	if (focus !== null) {
		focusEl.innerText = focus;
	} else {
		focusEl.innerText = 'Karabakh is Azerbaijan!';
	}
}

function setName(e) {
	if (e.type === 'keypress') {
		if (e.which === 13) {
			localStorage.setItem('name', e.target.innerText);
			e.target.blur();
		}
	} else {
		localStorage.setItem('name', e.target.innerText);
	}
}

function setFocus(e) {
	if (e.type === 'keypress') {
		if (e.which === 13) {
			localStorage.setItem('focus', e.target.innerText);
			e.target.blur();
		}
	} else {
		localStorage.setItem('focus', e.target.innerText);
	}
}

function changeGreeting() {
	const date = new Date();

	const hour = date.getHours();

	if (hour >= 6 && hour <= 12) {
		dayTime.innerText = 'Good Morning, ';
	} else if (hour > 12 && hour <= 18) {
		dayTime.innerText = 'Good Afternoon, ';
	} else if (hour > 18 && hour <= 24) {
		dayTime.innerText = 'Good Evening, ';
	} else {
		dayTime.innerText = 'Good Night, ';
	}
}

async function getPhotos(query) {
	try {
		const response = await fetch(
			`https://api.unsplash.com/search/photos?query=${query}&client_id=XrKens-IJ7zxbExkVkczcaE1ZIPz2DAyqtE65ZKn5pM`,
			{
				method: 'GET',
			}
		);

		if (!response.ok) {
			throw new Error(`${name} of user not find`);
		} else {
			const photos = await response.json();
			return photos;
		}
	} catch (e) {
		console.log(e);
	}
}

function changeBg() {
	const date = new Date();

	const hour = date.getHours();

	let bgImg;

	if (hour >= 6 && hour <= 12) {
		getPhotos('morning').then((data) => {
			const bgImg = data.results[0].urls.full;
			bgEl.style.backgroundImage = `url(${bgImg})`;
		});
		bgEl.style.backgroundImage = `url(${bgImg})`;
	} else if (hour > 12 && hour <= 18) {
		getPhotos('afternoon').then((data) => {
			const bgImg = data.results[0].urls.full;
			bgEl.style.backgroundImage = `url(${bgImg})`;
		});
		bgEl.style.backgroundImage = `url(${bgImg})`;
	} else if (hour > 18 && hour <= 24) {
		getPhotos('evening').then((data) => {
			const bgImg = data.results[0].urls.full;
			bgEl.style.backgroundImage = `url(${bgImg})`;
		});
	} else {
		getPhotos('night').then((data) => {
			const bgImg = data.results[0].urls.full;
			bgEl.style.backgroundImage = `url(${bgImg})`;
		});
		bgEl.style.backgroundImage = `url(${bgImg})`;
	}
}

showTime();
showDate();
getName();
getFocus();
changeGreeting();
changeBg();
// getPhotos();

nameEl.addEventListener('keypress', setName);
nameEl.addEventListener('blur', setName);
focusEl.addEventListener('keypress', setFocus);
focusEl.addEventListener('blur', setFocus);

setInterval(showTime, 1000);
