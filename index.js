const pedals = document.getElementById("pedalsList")

fetch("http://127.0.0.1:3000/pedals")
.then(response => response.json())
.then(data => renderPedals(data))

function renderPedals(dataFromFetch) {
  //get the pedals from data
  const pedals = dataFromFetch.data
  //iterate over each pedal in the json array and associate it with an li
  pedals.forEach(pedal => console.log(pedal))
  //create li's for the pedals
  debugger

}

