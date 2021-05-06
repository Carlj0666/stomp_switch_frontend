class Pedal {

  static all = []

  constructor({id, name, price, effect, brand_id, image_link, brand_name}) {
    this.id = id
    this.name = name
    this.price = price
    this.effect = effect
    this.brand_id = brand_id
    this.image_link = image_link
    this.brand_name = brand_name

    Pedal.all.push(this)
  }

  static async fetchPedals() {
    const response = await fetch("http://127.0.0.1:3000/pedals")
    const data = await response.json()
    return data
  }

  static createPedals(pedalsData) {
    pedalsData.forEach(pedalData => {
      new Pedal({id: pedalData.id, ...pedalData.attributes})
    })
  }

  static showCheapPedals() {
    console.log(pedalsUl)
    pedalsUl.innerHTML = ''
    const cheapPedals = Pedal.all.filter(element => {
      return element.price < 300
    })
      cheapPedals.forEach(cheapPedal => {
      cheapPedal.render()
    })
  }

  static renderAll() {
    Pedal.all.forEach(pedal => {
      pedal.render()
    })
  }



  render() {
    const liTag = document.createElement("li")
    liTag.id = `pedal-${this.id}`
  
    const divTag = document.createElement("div")
    divTag.innerText = this.name
    liTag.appendChild(divTag)
  
    const brand = document.createElement("p") 
    brand.innerText = "Brand: " + this.brand_name
    divTag.appendChild(brand)
  
    const effect = document.createElement("p") 
    effect.innerText = "Effect: " + this.effect
    divTag.appendChild(effect)
  
    const price = document.createElement("p") 
    price.innerText = "Price: $" + this.price
    divTag.appendChild(price)
  
    const imageUrl = this.image_link
    
    const imageLink = document.createElement("img")
    imageLink.src = imageUrl
    imageLink.alt = "Image of the " + this.name
    imageLink.style.height = "auto"
    imageLink.style.width = "300px"
    divTag.appendChild(imageLink)
  
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete")
    deleteButton.dataset.id = this.id
    deleteButton.innerText = "Delete"
    liTag.appendChild(deleteButton)
  
    deleteButton.addEventListener("click", this.deletePedal)
    pedalsUl.appendChild(liTag)

    const br = document.createElement("br")
    pedalsUl.appendChild(br)
  
  }
  
  deletePedal(event) {
    const deleteBtn = event.target
    const pedalId = deleteBtn.dataset.id
    const config = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }

    fetch(baseURL + "/pedals/" + pedalId, config)
    .then(response => {
      if (response.status === 204) {
        deleteBtn.parentElement.remove()
      }
    })
  }

}

