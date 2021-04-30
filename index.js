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

