//Array for reasons.
const reasons = {
  'Reason': [
    "choose... /",
    "Personal Matter",
    "Illness",
    "Late",
    "Leave Early",
    "Inquiry/Notes",
    "NCNS",
  ]
}


const NAME = document.getElementById('name');
NAME.innerHTML = textInp('Employee Name', 'text')

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
  input.setAttribute('type', type);
  input.name = item;
  return label.outerHTML + input.outerHTML;
}

function options(arr) {
  let elements = '';
  arr.forEach(item => {
    const option = document.createElement('option');
    option.setAttribute('value', item);
    option.textContent = item;
    elements += option.outerHTML;
  })
  return elements
}

const PRUEBA = document.getElementById('prueba');
PRUEBA.innerHTML = options(reasons.Reason);


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
  .then((res) => res.json())
  .then((data) => {
    let x = Object.values(data);
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

function setInputFormat(){
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





