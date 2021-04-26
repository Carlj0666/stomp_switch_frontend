const pedalsUl = document.getElementById("pedals-list-ul")
const newPedalsForm = document.getElementById("new-pedal-form")

const pedalNameInput = document.getElementById("pedal-name")
const pedalPriceInput = document.getElementById("price")
const pedalEffectInput = document.getElementById("effect")
const pedalBrandInput = document.getElementById("brand-name")
const pedalImageInput = document.getElementById("image-link")

// create_table "pedals", force: :cascade do |t|
//     t.string "name"
//     t.float "price"
//     t.string "effect"
//     t.integer "brand_id", null: false
//     t.datetime "created_at", precision: 6, null: false
//     t.datetime "updated_at", precision: 6, null: false
//     t.string "image_link"

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

  liTag.innerHTML = `${pedal.attributes.brand_name}`
  //Want to add functionality so the brand name expands to show pedals, those expand to show details
  pedalsUl.append(liTag)
}

fetchPedals()