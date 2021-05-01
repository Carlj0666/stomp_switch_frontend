const baseURL = "http://127.0.0.1:3000"

const pedalsUl = document.getElementById("pedals-list-ul")
const newPedalsForm = document.getElementById("new-pedal-form")

newPedalsForm.addEventListener('submit', processForm)

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

function createPedals(pedalsData) {
  pedalsData.forEach(pedalData => {
    new Pedal({id: pedalData.id, ...pedalData.attributes})
  })
}

Pedal.fetchPedals()
.then(pedals => {
  createPedals(pedals.data)
  Pedal.renderAll()
})

