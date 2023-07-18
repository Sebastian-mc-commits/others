import {
  useSignalJs
} from "../helpers/index.js"
import Extras from "./Extras.js"
import _extras from "./_extras.js"
import _key from "./_key.js"

export default class Global extends Extras {

  constructor(animationTime) {

    super()
    this._disabledKeys = useSignalJs([], true)
    this._playerPosition = useSignalJs(0)
    this._animationTime = animationTime

    this._playerPosition.onHandlerChangeValue = ({
      route,
      characterMovement,
    }, params) => {

      const {
        playerTouched,
      } = this._playerContext()

      const element = playerTouched()

      if (element) {

        const props = {
          characterMovement,
          element,
          route,
          ...params,
        }

        const type = props.element.dataset?.type
        const getBehavior = _extras.call(this, props)[type]

        if (typeof getBehavior !== "function") return

        getBehavior()
      }
    }
  }

  _getAllMoveKeys() {
    return [" ", "a", "w", "s", "d"]
  }

  _disableKeys = (releaseKeys, keys) => {
    this._disabledKeys.current = [...this._disabledKeys.current, ...keys]

    setTimeout(() => {

      this._disabledKeys.current = this._disabledKeys.current.filter(key => !keys.includes(key))
    }, releaseKeys)
  }

  getPosition(entry) {
    return entry.getBoundingClientRect()
  }

}