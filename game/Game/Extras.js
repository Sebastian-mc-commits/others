import {
  playerInformation
} from "../main.js"

export default class Extras {

  #triggerOpacityAnimation
  constructor() {
    this.#triggerOpacityAnimation = "opacityAnimation 0.3s infinite alternate"
    const {
      context,
      signal
    } = playerInformation
    this._playerContext = context
    this._playerSignal = signal
  }

  killEntity = (entry, {
    top = "5rem",
    left = "5rem",
    animationTime
  }) => {

    const styles = entry.style
    styles.display = "none"
    styles.left = left
    styles.top = top

    setTimeout(() => {
      styles.display = ""
      const {
        playerTouched,
        _getKillers,
        allowDeath
      } = this._playerContext()
      this.immortalize(entry, 3000, allowDeath, () => {

        if (!playerTouched(_getKillers())) return

        this.killEntity(entry, {
          top,
          left,
          animationTime
        })
      })

    }, animationTime)
  }

  immortalize(player, time, allowDeath, timeEndedCallback) {
    const styles = player.style

    styles.animation = this.#triggerOpacityAnimation
    allowDeath.current = false

    setTimeout(() => {
      styles.animation = ""
      allowDeath.current = true
      timeEndedCallback()
    }, time)
  }
}