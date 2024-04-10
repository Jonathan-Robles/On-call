// alt + shift + f    => Format the code

const app = document.getElementById("app");
const myForm = document.createElement("form");

myForm.setAttribute("id", "form");
app.appendChild(myForm);


createdInputText(form);
createdInputRadio(form);
addButton();
addDateDropDown();


function addButton() {
  const submitBtn = document.createElement("button");
  const mainContainer = document.createElement("div");

  mainContainer.id = "main-container";

  submitBtn.innerHTML = "Click to generate notes below ";
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("class", "btn btn-primary");
  myForm.appendChild(mainContainer);
  myForm.appendChild(submitBtn);
}

function createdInputText(target) {
  fetch("src/data2.json")
    .then((res) => res.json())
    .then((data) => {
      let x = "";
      for (const property in data.textInput) {
        x += `<div class="container main-box ">
                    <div class="input-group input-group-sm">
                        <lable class="input-group-text bold" for="${property}">${property}</lable>
                        <input class="form-control" id="${property}" name="${property}" type="text">
                    </div>
                </div>`;
      }
      target.innerHTML += x;
    })
}
function createdInputRadio(target) {
  fetch("src/data2.json")
    .then((res) => res.json())
    .then((data) => {
      let x = "";
      for (const index in data.radioInput) {
        arr = data.radioInput[index];
        // console.log(data.radioInput)

        x += `<div class="container main-box input-group input-group-sm">
                <lable class="input-group-text bold" for="${index}">${index}</lable>`

        for (let i = 0; i < arr.length; i++) {
          // console.log(arr);

          x += `<div class="inp-box input-group-text">
                                <span class="input ">${arr[i]}</span>
                                <input name="${index}" value="${arr[i]}" type="radio">
                                </div>`
        }
        x += `</div>`
      }
      target.innerHTML += x;
    })
}
function addDateDropDown() {
  form.innerHTML += `<div class="container main-box ">
    <div class="input-group input-group-sm">
    <lable class="input-group-text bold" for="Scheduled Shift Date">Scheduled Shift Date</lable>
    <input class="form-control" id="Scheduled Shift Date" name="Scheduled Shift Date" type="date">
    </div></div>`;
}
// add the elements to the HTML file


form.addEventListener("submit", function (e) {
  e.preventDefault()

  const result = new FormData(form);
  let x = [...result];
  let information = "";

  x.forEach(function (y) {
    information += `  ${y[0]} : ${y[1]}  <br>`;
  });
  prompty.innerHTML = `${information}`;
});

//   dropDownStates("states", "State-License", key, container);

function dropDownStates(x) {
  fetch("src/states.json")
    .then((res) => res.json())
    .then((data) => {
      let temp =`<div class="container main-box input-group input-group-sm">
                <lable class="input-group-text bold" for="">Station</lable>
                <select id="states" class="form-select" name="Station" >`;

      // const select = document.createElement("select");
      // select.id = 'states';
      // select.name = 'states';
      // select.className = "form-select";

      for (const state in data) {
          temp +=`<OPTION value="${data[state]['station']}">
                          ${data[state]['station']} / ${data[state]['abbr']}
                  </OPTION>`

        // const option = document.createElement("option");
        // option.value = ``;
        // option.innerHTML = `${data[state]['station']} ,>${data[state]['abbr']}</span>`;
        // select.appendChild(option);
        // x.appendChild(select);
      }
      temp += `</select>`
      x.innerHTML += temp;
    });
}


dropDownStates(form)