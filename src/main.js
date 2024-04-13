// alt + shift + f    => Format the code

// const app = document.getElementById("app");
// const myForm = document.createElement("form");

// myForm.setAttribute("id", "form");
// app.appendChild(myForm);



fm =document.getElementById('form');
fm.addEventListener("submit", function (e) {
  e.preventDefault()

  const result = new FormData(form);
  console.log(result)
  let x = [...result];
  console.log(x)
  let information = "";

  x.forEach(function (y) {
      if (y[0] == "Position"){
          information += "Notes : emptied & open shift. DPM called & notified <br>"
      }
    information += `  ${y[0]} : ${y[1]}  <br>`;
  });
  console.log(information)
  prompty.innerHTML = `${information}`;
});






// add the elements to the HTML file


createdInputText(div1);
createdInputReason(div2);

dropDownStates(div3);
addDateDropDown(div4);
createdInputRadio(div5);
addButton();
