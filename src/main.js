// alt + shift + f    => Format the code

// const app = document.getElementById("app");
// const myForm = document.createElement("form");

// myForm.setAttribute("id", "form");
// app.appendChild(myForm);



fm =document.getElementById('form');
fm.addEventListener("submit", function (e) {
  e.preventDefault()

  const result = new FormData(form);
  let x = [...result];
  let information = "";

  x.forEach(function (y) {
    information += `  ${y[0]} : ${y[1]}  <br>`;
  });
  prompty.innerHTML = `${information}`;
});






// add the elements to the HTML file


createdInputText();

dropDownStates();
addButton();
div1.innerHTML += addDateDropDown();
createdInputRadio();
