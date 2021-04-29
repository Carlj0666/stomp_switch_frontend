const baseURL = "http://127.0.0.1:3000"

const pedalsUl = document.getElementById("pedals-list-ul")
const newPedalsForm = document.getElementById("new-pedal-form")
const pedalNameInput = document.getElementById("pedal-name")
const pedalPriceInput = document.getElementById("price")
const pedalEffectInput = document.getElementById("effect")
const pedalBrandInput = document.getElementById("brand_name")
const pedalImageInput = document.getElementById("image_link")
// const pedalBrandIdInput = document.getElementById("brand_id") // added later in debug

newPedalsForm.addEventListener('submit', processForm)

function processForm(event) {
  event.preventDefault()

  const formInfo = {pedal:  {
    name: pedalNameInput.value,
    brand_name: pedalBrandInput.value,
    effect: pedalEffectInput.value,
    price: pedalPriceInput.value,
    image_link: pedalImageInput.value

  }}
 
  const configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formInfo)
  }

  fetch("http://127.0.0.1:3000/pedals", configObj)
  .then(response => response.json())
  .then(data => {
    renderPedal(data.data)
    newPedalsForm.reset()
  })
}

function fetchPedals() {
fetch("http://127.0.0.1:3000/pedals")
.then(response => response.json())
.then(data => renderPedals(data))
}


function renderPedals(dataFromFetch) {
  
  //get the pedals from data
  const pedals = dataFromFetch.data
  console.log(pedals)
  //iterate over each pedal in the json array and associate it with an li
  pedals.forEach(pedal => {
    renderPedal(pedal)
  })
}

function renderPedal(pedal) {
  //create li's for the pedals
  const liTag = document.createElement("li")
  //assign the inner text of the li
  liTag.id = `pedal-${pedal.id}`

  liTag.innerHTML = 
  `<div data-id="${pedal.id}">${pedal.attributes.brand_name}</div>
  <button class="delete" data-id="${pedal.id}">Delete</button>
  `
  // delete functionality, use above line 72 - <button class="delete" pedal_data_id="${pedal.id}">Delete</button>
  //Want to add functionality so the brand name expands to show pedals, those expand to show details
  const deleteButton = liTag.querySelector(".delete")
  deleteButton.addEventListener("click", deletePedal)
  pedalsUl.appendChild(liTag)

}

function deletePedal(event) {
  const id = event.target.dataset.id
  

    const configObj = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
    fetch(baseURL + "/" + "pedals" + "/" + id, configObj)
    .then(response => {
      if (response.status = "204") {
      event.target.parentElement.remove()
      }
    })

}

fetchPedals()