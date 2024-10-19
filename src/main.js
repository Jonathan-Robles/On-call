// let prueba = addOptionsToSelect

function convertDateToISOFormat(dateString) {
	// Split the date string assuming it is in dd/MM/yyyy format
	let parts = dateString.split('/');
	// Rearrange the parts to yyyy-MM-dd
	return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

window.onload = function(){
	
	let dateObject = new Date;
	let	dateStr2 = dateObject.toLocaleDateString().slice(0,10);
	let isoDate = convertDateToISOFormat(dateStr2);
	
	let dateInputElement = document.getElementById('Scheduled Shift Date');
	if(dateInputElement){
		dateInputElement.value = isoDate;
		
		console.log(dateInputElement.value);
	}else{
		console.log(`No element found with ID:`);
	}
}




PRUEBA.addEventListener('change', function () {
	if (prueba.value == "Illness" || prueba.value == "Personal Matter") {
		prueba.previousElementSibling.textContent = "Reason for call out";
		prueba.name = "Reason for call out";
	} else {
		prueba.previousElementSibling.textContent = "Reason";
		prueba.name = "Reason";
	}

})



let saleforceId = document.getElementById('Cand_id');

saleforceId.addEventListener('change', function () {
	let storedData = localStorage.getItem(saleforceId.value);

	if (storedData) {
		let lsData = JSON.parse(storedData)

		Object.keys(lsData).forEach(item => {
			let field = document.getElementById(item);

			if (field) {
				field.value = lsData[item];
			} else {
				console.warn(`No form field found with ID: ${item}`);
			}
		});

		console.log(lsData);
	} else {
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
	additionalInfo = additionalInfo.replaceAll("'", "").replaceAll("[", "").replaceAll("]", "").split(',');

	formData.forEach(y => {
		information += `  ${y[0]} : ${y[1]}  <br>`;
	});

	let obj2 = Object.fromEntries(formData);

	localStorage.setItem(obj2.Cand_id, JSON.stringify(obj2))






	// console.log(saleforceId.value)

	// console.log(localStorage[obj2.Cand_id]);
	// console.log(saleforceId.value);


	information += "Notes : emptied & open shift. DPM called & notified <br>"
	prompty.innerHTML = `${information} <br>`;

	const ARR = ['Name', 'Position', 'Availability', 'Travel/Local', 'Organization Sector', 'Job Title', 'Facility Location'];

	// console.log(additionalInfo)

	for (const i in additionalInfo) {
		prompty.innerHTML += ` ${additionalInfo[i]} <br> `;
	}

	let time = document.getElementById("time");
	let id = document.getElementById("id");

	prompty.innerHTML += `Time : ${time.value} <br>`;
	// prompty.innerHTML+= `SalesForce Id : ${id.value} <br>`



});


