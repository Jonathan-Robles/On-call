let stationElement = document.getElementById('Station');
const saleforceId = document.getElementById('Cand_id');
const employeeName = document.getElementById('Employee_Name');
const formElement = document.getElementById('form');
const excelFileElement = document.getElementById('excel-file');

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
class Excel {
	constructor(content) {
		this.content = content;
	}
	allRows() {
		return this.content;
	}
	headers() {
		return this.content[0];
	}
}

excelFileElement.addEventListener('change', function () {
	readXlsxFile(excelFileElement.files[0], { sheet: 1 }).then(function (rows) {
		const xlsx = new Excel(rows);
		const data = xlsx.allRows();
		sessionStorage.setItem('contact', JSON.stringify(data))
	})
})

formElement.addEventListener("submit", function (e) {
	e.preventDefault()

	let formData = new FormData(form);
	console.log(formData)
	formData = [...formData];
	console.log("FormData as Array:", formData);
	// const station = stationElement.value.slice(6);
	// console.log(station)
	let information = "";

	let additionalInfo = document.getElementById('info').value;
	additionalInfo = additionalInfo.replaceAll('"', " ").replaceAll("{", "").replaceAll("}", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", "").split(',');

	formData.forEach(y => {
		if (y[0] !== 'info') {
			information += `  ${y[0]} : ${y[1]}  <br>`;
		}
	});

	let formDataObj = Object.fromEntries(formData);
	localStorage.setItem(formDataObj.Cand_id, JSON.stringify(formDataObj));


	information += "Notes : emptied & open shift. DPM called & notified <br>"
	if (formDataObj.Station) {
		information += getManagerNames(formDataObj.Station.slice(6).trim());
	} else {
		console.error("Station value is undefined or empty.");
	}
	prompty.innerHTML = `${information} <br>`;

	const ARR = ['Name', 'Position', 'Availability', 'Travel/Local', 'Organization Sector', 'Job Title', 'Facility Location'];

	for (const i in additionalInfo) {
		prompty.innerHTML += ` ${additionalInfo[i]} <br> `;
	}

	let time = document.getElementById("time");
	let id = document.getElementById("id");

	prompty.innerHTML += `Time : ${time.value} <br>`

});




