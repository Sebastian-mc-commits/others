import {
  useLayoutEffect,
  navigation,
  DOMhelpers,
  useSignalJs
} from "../../helpers/index.js";
import globalCharmContext from "./globalContext.js";


useLayoutEffect(() => {
  navigation.setLinkStyles(
    import.meta.url)
})

const getElementHTML = (body) => `
  <section class="playerStatus" id="playerStatus" data-touch='true' data-type="bounceBack">
    <h4>Status</h4>
    <div id="body">
      ${body}
    </div>
  </section>
`

export default function characterStatus(bodyElement = "", parentElement = document.body) {
  const {
    decomposeElement,
    mutateDOM
  } = DOMhelpers

  const {
    body,
    element
  } = decomposeElement(parentElement, "#playerStatus")

  const charmsSettings = useSignalJs({
    forwarder: {
      powerUpQuantity: 3
    }
  })

  const currentContext = () => characterStatus(bodyElement, parentElement)
  const charmContext = globalCharmContext(currentContext, charmsSettings)


  return {

    init: () => {
      mutateDOM(element(), {
        errorCase: () => parentElement.insertAdjacentHTML("afterbegin", getElementHTML(bodyElement)),
      })
    },

    _getElement: (type) => parentElement.querySelector(`[data-charm-type='${type}']`),

    _charmElement: ({
      charmType,
      charmDesign
    }, ...styles) => `
    <strong class="status-power-up ${styles.join(" ")}" data-charm-type='${charmType}'>Forwarders 
      <span>
        ${charmDesign}
      </span>
    </strong>
  `,

    _charmDesigns: {
      forwarder: "♠"
    },

    charms: () => ({

      e: () => {
        const powerUp = {
          init: (charmsQuantity) => {
            body().insertAdjacentHTML("beforeend", currentContext()._charmElement({
              charmDesign: currentContext()._charmDesigns.forwarder?.repeat(charmsQuantity),
              charmType: currentContext().charms().e().charm
            }))

            charmsSettings.current = {
              ...charmsSettings.current,
              forwarder: {
                powerUpQuantity: charmsQuantity
              }
            }
          },

          charm: "forwarder",
        }

        return {
          ...charmContext.call({
            ...powerUp,
            h: "Hello",
          }),
          ...powerUp
        }
      },

      charmsSettings
    })
  }
}