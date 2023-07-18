import {
  useSignalJs
} from "../helpers/index.js";
import Global from "./Global.js"
import {
  _key as key
} from "./index.js";


export default class Character extends Global {

  #characterMovement;
  #container;
  #top;
  #left;

  constructor({
    animationTime,
    characterMovement,
    container,
  }, {
    top,
    left
  }) {
    super(animationTime)
    this.#characterMovement = characterMovement
    this.#container = container
    this.#top = top
    this.#left = left
    this._key = key.bind(Object.assign(this, this._playerSignal.current));
    this.unlocks = useSignalJs([])
    this.#init()
  }

  #onKeyPress = (keyPressed) => {
    const player = this._playerContext().getPlayer

    return () => {
      const movePlayer = this._key(keyPressed, player, this.#characterMovement)

      if (keyPressed === " " && this.unlocks.current.includes(" ")) {
        setTimeout(() => {
          player.style.top = (this.getPosition(player).top + this.#characterMovement + 20).toString() + "px"

          setTimeout(() => {
            const newKeys = this._disabledKeys.current.filter(key => ![" ", "s", "w"].includes(key))

            this._disabledKeys.current = newKeys
          }, this._animationTime)

        }, this._animationTime)
      }
      return movePlayer
    }
  }

  #listener = (event) => {
    if (this._disabledKeys.current.includes(event.key)) return
    const movePlayer = this.#onKeyPress(event.key)()
    const isEmpty = !!Object.keys(movePlayer).length

    if (!isEmpty) return
    const {
      position,
      direction,
      route
    } = movePlayer

    const {
      getPlayer: player
    } = this._playerContext()

    player.style[direction] = position.toString() + "px"
    setTimeout(() => {
      this._playerPosition.callFn({
        route,
        characterMovement: this.#characterMovement,
      }, {
        top: this.#top,
        left: this.#left
      })

    }, this._animationTime)

    this._playerContext().playerContext = {
      route,
      position
    }
  }

  #init() {
    this.#container.addEventListener("keypress", this.#listener)
  }
}