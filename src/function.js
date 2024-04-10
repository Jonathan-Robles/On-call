
  
  function createdInputText() {
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
        div1.innerHTML += x;
      })
  }


  function createdInputRadio() {
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
        div1.innerHTML += x;
      })
  }

  

  function dropDownStates() {
    fetch("src/states.json")
      .then((res) => res.json())
      .then((data) => {
        let temp =`<div class="container main-box input-group input-group-sm">
                  <lable class="input-group-text bold" for="">Station</lable>
                  <select id="states" class="form-select" name="Station" >`;
  
          for (const state in data) {
            temp +=`<OPTION value="${data[state]['station']}">
                            ${data[state]['station']} / ${data[state]['abbr']}
                    </OPTION>`
            }
        temp += `</select>`
        div1.innerHTML += temp;
      } );
  }
  
  function addDateDropDown() {
    let x = `<div class="container main-box ">
      <div class="input-group input-group-sm">
      <lable class="input-group-text bold" for="Scheduled Shift Date">Scheduled Shift Date</lable>
      <input class="form-control" id="Scheduled Shift Date" name="Scheduled Shift Date" type="date">
      </div></div>`;
    return x;  
  }

  function addButton() {
    const submitBtn = document.createElement("button");
            submitBtn.innerHTML = "Click to generate notes below ";
            submitBtn.setAttribute("type", "submit");
            submitBtn.setAttribute("class", "btn btn-primary");    
    form.innerHTML += submitBtn.outerHTML;

  }