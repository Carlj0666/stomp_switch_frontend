const pedalsUl = document.getElementById("pedals-list-ul")
const newPedalsForm = document.getElementById("new-pedal-form")

fetch("http://127.0.0.1:3000/pedals")
.then(response => response.json())
.then(data => renderPedals(data))


function renderPedals(dataFromFetch) {
  
  //get the pedals from data
  const pedals = dataFromFetch.data
  console.log(pedals)
  //iterate over each pedal in the json array and associate it with an li
  pedals.forEach(pedal => {
  //create li's for the pedals
    const liTag = document.createElement("li")
    //assign the inner text of the li
    liTag.innerText = `${pedal.attributes.brand_name}`
    pedalsUl.append(liTag)

  })
}

// function renderBRand()

