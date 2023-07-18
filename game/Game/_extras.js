import {
  GameMessage
} from "../components/index.js"
import { charms } from "../main.js"
import {
  extra
} from "../utils/types/game/extra.js"

export default function _extras({
  characterMovement,
  element,
  route,
  ...props
}) {

  return {

    bounceBack: () => {
      const {
        getPlayer
      } = this._playerContext()

      const movement = (characterMovement + (characterMovement * 0.2)) * -1
      this._disableKeys(characterMovement, this._getAllMoveKeys())
      const {
        direction,
        position
      } = this._key(route, getPlayer, movement)
      getPlayer.style[direction] = position.toString() + "px"
    },

    killCharacter: () => {
      const {
        allowDeath,
        getPlayer
      } = this._playerContext()
      const {
        datasetKiller
      } = this._playerSignal.current

      this._disableKeys(characterMovement, this._getAllMoveKeys())

      if (element.dataset[datasetKiller] === route) {

        _extras.call(this, {
          route,
          characterMovement,
        }).bounceBack()

        return

      } else if (!allowDeath.current) return

      this.killEntity(getPlayer, props)
    },

    powerUp: () => {
      const {
        datasetPowerUp
      } = this._playerSignal.current

      const delay = 2000
      const activeKey = element.dataset[datasetPowerUp]
      GameMessage(document.body, extra[activeKey], {
        delayBetween: delay
      })

      const useCharm = charms[activeKey]

      if (typeof useCharm === "function") {
        useCharm()?.init(3)
      }

      this._disableKeys(delay, this._getAllMoveKeys())

      this.unlocks.current = [...this.unlocks.current, activeKey]

      element.remove()
    }
  }
}