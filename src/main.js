// let prueba = addOptionsToSelect

function convertDateToISOFormat(dateString) {
	// Split the date string assuming it is in dd/MM/yyyy format
	let parts = dateString.split('/');
	// Rearrange the parts to yyyy-MM-dd
	return `${parts[2]}-${parts[0]}-${parts[1]}`;
}



let stationElement = document.getElementById('Station');
let saleforceId = document.getElementById('Cand_id');

saleforceId.addEventListener('change', function () {
	let storedData = localStorage.getItem(saleforceId.value);
	if (storedData) {
		let lsData = JSON.parse(storedData)
		Object.keys(lsData).forEach(item => {
			let field = document.getElementById(item);
			if (field) {
				field.value = lsData[item];
				if (field.id == 'Station') {
					createWdLinks(field);
				}
			} else {
				console.warn(`No form field found with ID: ${item}`);
			}
		});
	} else {
		let stationElement = document.getElementById('Station');
		if (stationElement) {
			stationElement.addEventListener('change', () => {
				createWdLinks(stationElement);
			})
		} 
		console.warn('No data found in localStorage for the given ID');
	}
})



let formTag = document.getElementById('form');

formTag.addEventListener("submit", function (e) {
	e.preventDefault()
	let formData = new FormData(form);
	formData = [...formData];

	let information = "";

	let additionalInfo = document.getElementById('info').value;
	additionalInfo = additionalInfo.replaceAll('"', " ").replaceAll("{", "").replaceAll("}", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", "").ARRsplit(',');

	formData.forEach(y => {
		if(y[0] !=='info'){
		information += `  ${y[0]} : ${y[1]}  <br>`;
		}
	});

	let obj2 = Object.fromEntries(formData);

	localStorage.setItem(obj2.Cand_id, JSON.stringify(obj2))

	information += "Notes : emptied & open shift. DPM called & notified <br>"
	prompty.innerHTML = `${information} <br>`;

	const ARR = ['Name', 'Position', 'Availability', 'Travel/Local', 'Organization Sector', 'Job Title', 'Facility Location'];

	for (const i in additionalInfo) {
		prompty.innerHTML += ` ${additionalInfo[i]} <br> `;
	}

	let time = document.getElementById("time");
	let id = document.getElementById("id");

	prompty.innerHTML += `Time : ${time.value} <br>`

});




function createWdLinks(stationValue) {
	let dateObject = new Date;
	let firstPart = 'https://wd5.myworkday.com/loyalsource/d/app/wfs-scheduler/index$.htmld/';
	let secondPart = '$.htmld/calendar$.htmld/week$.htmld/';
	let date = convertDateToISOFormat(dateObject.toLocaleDateString());
	let finalPart = '$.htmld';

	const workdayLinks = [
		{ id: "d4ba9a1fd0821001443e26c8cdb50000", name: "Alexa", sector: "YUM", sector2: "" },
		{ id: "d4ba9a1fd0821001443e06e888ba0000", name: "Amanda", sector: "SDC", sector2: "" },
		{ id: "ea208a98a8f61001af7295abb5b60000", name: "Brianna", sector: "DRT", sector2: "" },
		{ id: "ea208a98a8f61001afdcf7cd4a0c0000", name: "Carolyne", sector: "ELC", sector2: "" },
		{ id: "ea208a98a8f61001af6c999dc3830000", name: "Courtney", sector: "LRT", sector2: "" },
		{ id: "d4ba9a1fd0821001443e20c4dff00000", name: "Emma", sector: "TCA", sector2: "" },
		{ id: "ea208a98a8f61001afa54f416fac0000", name: "Kyle", sector: "BBT", sector2: "MIP" },
		{ id: "d4ba9a1fd0821001443e017d780f0000", name: "Fiona", sector: "EPT", sector2: "" },
		{ id: "d4ba9a1fd0821001443dffae7cc40002", name: "Taylor", sector: "RGV", sector2: "" }
	];

	let sectoress = stationValue.value.slice(0, 3);
	let managerData = workdayLinks.filter(item => item.sector == sectoress || item.sector2 == sectoress);
	let managerLink = managerData.map(item => {
		return {
			name: item.name,
			link: firstPart + item.id + secondPart + date + finalPart
		};
	});

	const navElement = document.getElementById('pss-link');
	window.open(managerLink[0].link);
	// console.log(managerLink);
	navElement.innerHTML = managerLink.map(item => `<a href="${item.link}" target="_blank">${item.name}</a>`).join(' ');
}
