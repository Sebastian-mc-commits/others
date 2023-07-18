import {
  charms
} from "../main.js"
import routes from "../utils/types/game/routes.js"

export default function _key(keyPressed, character, movement) {

  const {
    BOTTOM,
    LEFT,
    RIGHT,
    TOP
  } = routes
  let direction = "left"
  let position = 0
  let route = LEFT

  switch (keyPressed) {
    case "a":
    case LEFT: {
      direction = "left"
      position = this.getPosition(character).left - movement
      break
    }

    case "w":
    case TOP: {
      direction = "top"
      position = this.getPosition(character).top - movement
      route = TOP
      break
    }

    case "d":
    case RIGHT: {
      direction = "left"
      position = this.getPosition(character).left + movement
      route = RIGHT
      break
    }

    case "s":
    case BOTTOM: {
      direction = "top"
      position = this.getPosition(character).top + movement
      route = BOTTOM
      break
    }

    case "e": {

      const isCharmFull = charms.charmsSettings.current[charms.e().charm].powerUpQuantity > 0
      if (!this.unlocks.current.includes("e") || !isCharmFull) {
        // alert("No skill available yet")
        return {}
      }

      const {
        playerContext
      } = this._playerContext()

      charms.e().minusCharm()

      return _key.call(this, playerContext.route, character, movement * 7)
    }

    case " ": {
      if (!this.unlocks.current.includes(" ")) {
        return {}
      }

      this._disabledKeys.current = [...this._disabledKeys.current, " ", "s", "w"]
      direction = "top"
      position = this.getPosition(character).top - movement - 20
      route = TOP
      break
    }

    default: {
      return {}
    }
  }

  return {
    direction,
    position,
    route
  }
}