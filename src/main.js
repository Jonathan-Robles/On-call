// let stationElement = document.getElementById('Station');
const saleforceId = document.getElementById('Cand_id');
const employeeName = document.getElementById('Employee_Name');
const formElement = document.getElementById('form');

changeEventListener(saleforceId);
changeEventListener(employeeName);

// saleforceId.addEventListener('change', function () {
// 	const filteredIds = filterLocalStorageByValue(saleforceId.value);
// 	let storedData = localStorage.getItem(filteredIds);
// 	if (storedData) {
// 		let lsData = JSON.parse(storedData)
// 		Object.keys(lsData).forEach(item => {
// 			let field = document.getElementById(item);
// 			if (field) {
// 				field.value = lsData[item];
// 				if (field.id == 'Station') {
// 					createWdLinks(field);
// 				}
// 			} else {
// 				console.warn(`No form field found with ID: ${item}`);
// 			}
// 		});
// 	} else {
// 		let stationElement = document.getElementById('Station');
// 		if (stationElement) {
// 			stationElement.addEventListener('change', () => {
// 				createWdLinks(stationElement);
// 			})
// 		} 
// 		console.warn('No data found in localStorage for the given ID');
// 	}
// })



// employeeName.addEventListener('change', function () {

// 	let filteredId = Object.keys(localStorage).filter(item => localStorage[item].includes(employeeName.value))

// 	let storedData = localStorage.getItem(filteredId[0]);
// 	if (storedData) {
// 		let lsData = JSON.parse(storedData)
// 		Object.keys(lsData).forEach(item => {
// 			let field = document.getElementById(item);
// 			if (field) {
// 				field.value = lsData[item];
// 				if (field.id == 'Station') {
// 					createWdLinks(field);
// 				}
// 			} else {
// 				console.warn(`No form field found with ID: ${item}`);
// 			}
// 		});
// 	} else {
// 		let stationElement = document.getElementById('Station');
// 		if (stationElement) {
// 			stationElement.addEventListener('change', () => {
// 				createWdLinks(stationElement);
// 			})
// 		} 
// 		console.warn('No data found in localStorage for the given ID');
// 	}
// })


formElement.addEventListener("submit", function (e) {
	e.preventDefault()
	let formData = new FormData(form);
	formData = [...formData];

	let information = "";

	let additionalInfo = document.getElementById('info').value;
	additionalInfo = additionalInfo.replaceAll('"', " ").replaceAll("{", "").replaceAll("}", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", "").split(',');

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




