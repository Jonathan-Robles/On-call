// let prueba = addOptionsToSelect
  
PRUEBA.addEventListener('change', function () {
  if (prueba.value == "Illness" || prueba.value == "Personal Matter") {
    prueba.previousElementSibling.textContent = "Reason for call out";
    prueba.name = "Reason for call out";
  } else {
    prueba.previousElementSibling.textContent = "Reason";
    prueba.name = "Reason";
  }
  console.log('hola')
})

let fm = document.getElementById('form');
fm.addEventListener("submit", function (e) {
  e.preventDefault()

  const result = new FormData(form);
  let x = [...result];
  let information = "";
  let additionalInfo = document.getElementById('info').value;
  additionalInfo = additionalInfo.replaceAll("'","").replaceAll("[","").replaceAll("]","").split(',');

  x.forEach( y =>{
        information += `  ${y[0]} : ${y[1]}  <br>`;
  });
  information += "Notes : emptied & open shift. DPM called & notified <br>"
  prompty.innerHTML = `${information}<br>`;

  additionalInfo.forEach(item=>{
    console.log(item.trim())
  })
const ARR = ['Name','Position','Availability','Travel/Local','Organization Sector', 'Job Title', 'Facility Location']  
  for(const i in additionalInfo){
    prompty.innerHTML += `${ARR[i]} : ${additionalInfo[i]}<br>`;
  }
    let time = document.getElementById("time");
    let id = document.getElementById("id");
  
    prompty.innerHTML+= `Time : ${time.value} <br>`;
    prompty.innerHTML+= `SalesForce Id : ${id.value} <br>`
  

});
