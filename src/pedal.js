class Pedal {

  static all = []

  constructor({name, price, effect, brand_id, image_link, brand_name}) {
    this.name = name
    this.price = price
    this.effect = effect
    this.brand_id = brand_id
    this.image_link = image_link
    this.brand_name = brand_name

    Pedal.all.push(this)
  }
}