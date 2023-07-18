export default function globalCharmContext(context, charmSettings) {

  return function () {

    return {
      minusCharm: (quantity = 1) => {
        const charm = context()._getElement(this.charm).querySelector("span")
        let powerUpQuantity = charmSettings.current[this.charm].powerUpQuantity - quantity

        if (powerUpQuantity < 1) {
          charm.textContent = 0
          powerUpQuantity = 0
        } else {
          charm.textContent = context()._charmDesigns.forwarder.repeat(powerUpQuantity)
        }

        charmSettings.current = {
          ...charmSettings.current,
          [this.charm]: {
            powerUpQuantity
          }
        }
      }
    }
  }
}