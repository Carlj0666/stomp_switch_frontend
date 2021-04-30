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

  static renderAll() {
    Pedal.all.forEach(pedal => {
      pedal.render()
    })
  }

  render() {
    //create li's for the pedals
    const liTag = document.createElement("li")
    //assign the inner text of the li
    liTag.id = `pedal-${this.id}`
  
    const divTag = document.createElement("div")
    divTag.dataset.id = this.id
    divTag.innerText = this.name
    liTag.appendChild(divTag)
  
    const brand = document.createElement("p") 
    brand.dataset.id = this.id
    brand.innerText = this.brand_name
    divTag.appendChild(brand)
  
    const brandLabel = document.createTextNode("Brand: ")
    brand.prepend(brandLabel)
  
    const effect = document.createElement("p") 
    effect.dataset.id = this.id
    effect.innerText = this.effect
    divTag.appendChild(effect)
  
    const effectLabel = document.createTextNode("Effect: ")
    effect.prepend(effectLabel)
  
    const price = document.createElement("p") 
    price.dataset.id = this.id
    price.innerText = this.price
    divTag.appendChild(price)
  
    const priceLabel = document.createTextNode("Price: ")
    price.prepend(priceLabel)
  
    const imageUrl = this.image_link
    
    const imageLink = document.createElement("img")
    imageLink.src = imageUrl
    imageLink.alt = "Image of the " + this.name
    imageLink.style.height = "auto"
    imageLink.style.width = "300px"
    divTag.appendChild(imageLink)
  
    // can also destructure:
      // const pedalStats pedal.attributes
        // let {name, effect, price, brand_name, image_link} = pedalStats
        // in the console name == "Zoia" etc.
    // OR
      // function pedalStats(name, effect, price, brand_name, image_link){
        // return `<div>
        // <p>${name}</p>
        // ETC..
        //</div>`
      //}
  
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete")
    deleteButton.dataset.id = this.id
    deleteButton.innerText = "Delete"
    liTag.appendChild(deleteButton)
  
  
    deleteButton.addEventListener("click", this.deletePedal)
    pedalsUl.appendChild(liTag)
  
  }
  
  deletePedal(event) {
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
    
        if (response.status === 204) {
        event.target.parentElement.remove()
        }
      })
  }

}

