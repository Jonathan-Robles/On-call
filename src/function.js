function convertDateToISOFormat(dateString) {
    // Split the date string assuming it is in dd/MM/yyyy format
    let parts = dateString.split('/');
    // Rearrange the parts to yyyy-MM-dd
    return `${parts[2]}-${parts[0]}-${parts[1]}`;
}
// Función para filtrar las claves de localStorage según el valor proporcionado

function filterLocalStorageByValue(searchValue) {
    // Verifica si el valor está vacío o solo contiene espacios
    if (!searchValue.trim()) return [];

    if (!isNaN(Number(searchValue))) {  // Verifica si `searchValue` es un número
        console.log('Es un número:', searchValue, typeof (Number(searchValue)));
        return Object.keys(localStorage).filter(key => key == searchValue);
    } else {
        console.log('No es un número');
        return Object.keys(localStorage).filter(key => {
            const itemValue = localStorage.getItem(key);
            if (itemValue) {
                return itemValue.includes(searchValue);
            }
            return false;
        });
    }
}

function createWdLinks(stationValue) {
    let dateObject = new Date;
    let firstPart = 'https://wd5.myworkday.com/loyalsource/d/app/wfs-scheduler/index$.htmld/';
    let secondPart = '$.htmld/calendar$.htmld/week$.htmld/';
    let date = convertDateToISOFormat(dateObject.toLocaleDateString());
    let finalPart = '$.htmld';

    const workdayLinks = [
        // { id: "d4ba9a1fd0821001443e26c8cdb50000", name: "Alexa", sector: "YUM", sector2: "" },
        // { id: "d4ba9a1fd0821001443e06e888ba0000", name: "Amanda", sector: "SDC", sector2: "" },
        // { id: "d4ba9a1fd0821001443dffae7cc40002", name: "Taylor", sector: "RGV", sector2: "" },
        // { id: "ea208a98a8f61001af6c999dc3830000", name: "Courtney", sector: "LRT", sector2: "" },
        // { id: "d4ba9a1fd0821001443e017d780f0000", name: "Fiona", sector: "EPT", sector2: "" },
        // { id: "ea208a98a8f61001afdcf7cd4a0c0000", name: "Carolyne", sector: "ELC", sector2: "" },
        // { id: "ea208a98a8f61001af7295abb5b60000", name: "Brianna", sector: "DRT", sector2: "" },

        { id: "4d26233016e9100153b9704e86700000", name: "Alexa", sector: "YUM", sector2: "" },
        { id: "4d26233016e91001539565218bb00000", name: "Amanda", sector: "SDC", sector2: "" },
        { id: "b3dfeb4648f210011ba4a4be88f30000", name: "TCA-SSF", sector: "TCA", sector2: "" },
        { id: "4d26233016e9100153a96796bc160000", name: "TCA-Sector", sector: "TCA", sector2: "" },
        { id: "6fcca292a21110015397dc34e60a0000", name: "RGV-Sector", sector: "RGV", sector2: "" },
        { id: "b3dfeb4648f210011ba4a4be88f50000", name: "RGV-Donna", sector: "RGV", sector2: "" },
        { id: "6fcca292a2111001538123259f6b0000", name: "LRT-Sector", sector: "LRT", sector2: "" },
        { id: "6fcca292a2111001538cb83903910000", name: "MIP-Sector", sector: "MIP", sector2: "" },

        { id: "4d26233016e9100153649940c89a0000", name: "EPT-Sector", sector: "EPT", sector2: "" },
        { id: "b3dfeb4648f210011ba4a4be88f40000", name: "EPT-Hard", sector: "EPT", sector2: "" },

        { id: "4d26233016e9100152ec389897c90000", name: "ELC-Sector", sector: "ELC", sector2: "" },
        { id: "4d26233016e9100152ddb730a28f0000", name: "DRT-Sector", sector: "DRT", sector2: "" },
        { id: "b3dfeb4648f2100151bf4949060d0000", name: "DRT-Firefly", sector: "DRT", sector2: "" },
        { id: "6fcca292a211100152d4c60dfe600000", name: "BBT-Sector", sector: "BBT", sector2: "" }
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
    if ((managerLink[0].link)) {
        window.open(managerLink[0].link);
    }
    // console.log(managerLink);
    navElement.innerHTML = managerLink.map(item => `<a href="${item.link}" target="_blank">${item.name}</a>`).join(' ');
}

function changeEventListener(inputElement) {

    inputElement.addEventListener('change', function () {
        const filteredIds = filterLocalStorageByValue(inputElement.value);
        console.log(filteredIds)

        let storedData = localStorage.getItem(filteredIds[0]);
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
}

function getManagerNames(stationName) {
    if (sessionStorage.contact) {
        const sessionData = JSON.parse(sessionStorage.contact);

        let dateFiltered = sessionData.filter(row => row.includes(stationName))
        const colIndexes = [6, 7, 8, 9];
        let generatedText = "";
        console.log('data filtered:', dateFiltered)
        colIndexes.forEach(index => {
            if (dateFiltered[0] !== undefined && dateFiltered[0] !== null) {
                let name = dateFiltered[0][index];
                if (name !== 0) {
                    generatedText += `@${name} `;
                }
            }
        });
        return generatedText;
    } else {
        console.log('No data storaged')
    }
}

const employeeInfoContainer = document.getElementById('employee-info-container');
employeeInfoContainer.innerHTML =
    container(textInp('info', 'text')) +
    container(textInp('Cand_id', 'text')) +
    container(textInp('Employee_Name', 'text'));

div3.innerHTML += container(textInp('Scheduled Shift Date', 'date'));

addButton();

function container(inner) {
    let div = document.createElement('DIV');
    div.classList.add('container', 'main-box', 'input-group', 'input-group-sm');
    div.innerHTML = inner;
    return div.outerHTML;
}

function textInp(item, type) {
    let label = document.createElement('label');
    label.setAttribute('for', item);
    label.textContent = item;
    let input = document.createElement('INPUT');
    input.setAttribute('id', item);
    input.setAttribute('type', type);
    input.setAttribute('class', 'form-control');
    input.name = item;
    return label.outerHTML + input.outerHTML;
}

const callReasonOptions = [
    "choose... /",
    "Personal Matter",
    "Illness", 
    "Late",
    "Leave Early",
    "Inquiry/Notes",
    "NCNS",
    "Covering a shift",
    "Clocking in/out issue",
    "Hotel / Checking in/out issue",
    "Flexing EE",
    "Swapping EE",
];

function createDropdownOptions(optionsArray) {
    return optionsArray.map(item =>
        `<option value="${item}">${item}</option>`).join('');
}

const reasonDropdown = document.getElementById('reason-dropdown');
reasonDropdown.innerHTML = createDropdownOptions(callReasonOptions);

reasonDropdown.addEventListener('change', function () {
    const selectedReason = reasonDropdown.value;
    const isSpecialReason = (selectedReason === "Illness" || selectedReason === "Personal Matter");
    // Operador ternario
    const labelText = isSpecialReason ? "Reason for call out" : "Reason";

    // Actualizar label y name
    reasonDropdown.previousElementSibling.textContent = labelText;
    reasonDropdown.name = labelText;
});

function selector(arr, selName) {
    let label = document.createElement('label');
    label.textContent = selName;
    label.classList.add('input-group-text', 'bold');

    const select = document.createElement('SELECT');
    select.classList.add('class', 'form-select');
    select.name = selName;
    select.id = selName;

    arr.forEach(item => {
        const option = document.createElement('OPTION');
        option.setAttribute('value', item);
        option.textContent = item;
        select.appendChild(option)
    })
    return label.outerHTML + select.outerHTML;
}

/// FETCHING STATIONS JSON FILE
let x = '';
fetch("src/states.json")
    .then((response) => response.json())
    .then((data) => {
        let x = Object.values(data);
        console.log(x)
        let abbr = [];
        x.forEach(item => {
            abbr.push(item.abbr + ' / ' + item.station)
        })
        let div2 = document.getElementById('div2');
        div2.innerHTML += container(selector(abbr, 'Station'));
    });




fetch("src/data2.json")
    .then((res) => res.json())
    .then((data) => {
        let x = "";
        for (const index in data.radioInput) {
            arr = data.radioInput[index];
            console.log(data.radioInput)

            x += `<div class="container main-box input-group input-group-sm">
                  <label class="input-group-text bold" for="${index}">${index}</label>`

            for (let i = 0; i < arr.length; i++) {
                x += `<div class="inp-box input-group-text">
              <span class="input ">${arr[i]}</span>
              <input name="${index}" value="${arr[i]}" type="radio">
              </div>`}
            x += `</div>`
        }
        let div3 = document.getElementById('div3');
        div3.innerHTML += x;
    })


function addButton() {
    const submitBtn = document.createElement("button");
    submitBtn.innerHTML = "Submit";
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("class", "btn btn-primary");
    form.innerHTML += submitBtn.outerHTML;
}

const divContainer = document.getElementsByTagName('div');
Object.keys(divContainer).forEach((item) => {
    divContainer[item].classList.add('container', 'main-box', 'input-group', 'input-group-sm')
});

const lblFormat = document.getElementsByTagName('label')
Object.keys(lblFormat).forEach((item) => {
    lblFormat[item].classList.add('input-group-text', 'bold')
});

function setInputFormat() {
    const inpFormat = document.getElementsByTagName('input')
    Object.keys(inpFormat).forEach((item) => {
        inpFormat[item].classList.add('form-control')
    });
}

//setInputFormat();

const sltFormat = document.getElementsByTagName("select")
Object.keys(sltFormat).forEach((item) => {
    sltFormat[item].classList.add('class', 'form-select');
});

//// SELECTOR REASON LABEL SWITCHER







