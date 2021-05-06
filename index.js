const baseURL = "http://127.0.0.1:3000"

const pedalsUl = document.getElementById("pedals-list-ul")
const newPedalsForm = document.getElementById("new-pedal-form")
const cheapPedalButton = document.getElementById("cheap")

newPedalsForm.addEventListener('submit', processForm)
cheapPedalButton.addEventListener('click', Pedal.showCheapPedals)

function processForm(event) {
  event.preventDefault()
  const formInfo = {
    pedal:  {
      name: event.target[0].value,
      brand_name: event.target[1].value,
      effect: event.target[2].value,
      price: event.target[3].value,
      image_link: event.target[4].value
    }
  }
 
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formInfo)
  }

  fetch("http://127.0.0.1:3000/pedals", config)
  .then(response => response.json())
  .then(pedal => {
    const newPedal = new Pedal({id: pedal.data.id, ...pedal.data.attributes})
    newPedal.render()
    newPedalsForm.reset()
  })
}


Pedal.fetchPedals()
.then(pedals => {
  Pedal.createPedals(pedals.data)
  Pedal.renderAll()
})







