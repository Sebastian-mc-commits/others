import {
  useSignalJs
} from "../helpers/index.js"

function context() {

  const {
    signal,
    getPlayerProps,
    setPlayerProps,
    allowDeath
  } = this
  const playerContext = signal
  const useThisContext = () => context.call(this)

  return {
    _getTouchElements() {
      return useThisContext()._getElements(playerContext.current.touchElements)
    },

    _getElements(type) {
      return Array.from(document.querySelectorAll(type))
    },

    _getKillers() {
      return useThisContext()._getElements(`[data-${playerContext.current.datasetKiller}]`)
    },

    get playerContext() {
      return getPlayerProps()
    },

    set playerContext(newValue) {
      setPlayerProps(newValue)
    },

    get getPlayer() {
      return playerContext.current.element
    },

    allowDeath,

    playerTouched: function (type = useThisContext()._getTouchElements()) {
      return type.find(element => useThisContext()._areElementsTouching(element))
    },

    _areElementsTouching(element) {
      const rect = element.getBoundingClientRect();
      const playerRect = useThisContext().getPlayer.getBoundingClientRect()

      return !(
        playerRect.right < rect.left ||
        playerRect.left > rect.right ||
        playerRect.bottom < rect.top ||
        playerRect.top > rect.bottom
      );
    }
  }
}

function player(props) {

  const signal = useSignalJs(props, true)
  let playerProps = {}

  const setPlayerProps = (obj) => {
    playerProps = {
      ...playerProps,
      ...obj
    }
  }

  const getPlayerProps = () => playerProps

  signal.onHandlerChangeValue = (newProps) => {
    for (const key in newProps) {
      props[key] = newProps[key]
    }
  }

  const allowDeath = useSignalJs(true)

  return {
    context: context.bind({
      signal,
      getPlayerProps,
      setPlayerProps,
      allowDeath
    }),
    signal
  }
}

export default player