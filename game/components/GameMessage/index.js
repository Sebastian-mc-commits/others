import {
  DOMhelpers,
  navigation,
  useLayoutEffect
} from "../../helpers/index.js"

useLayoutEffect(() => {
  navigation.setLinkStyles(
    import.meta.url)
})

const gameMessageHTML = (outerHTML) => `
  <section class="gameMessage" id="gameMessage">
  <div class="cube">

  </div>

  <div id="body">
    ${outerHTML}
  </div>
  </section>
`

const setForwardAnimation = (entry, delayBetween) => {

  entry.classList.add("forward")
  setTimeout(() => {
    entry.classList.remove("forward")
  }, delayBetween)

}

const displayGameMessage = (element, gameMessage, {
  delayBetween
}) => {

  const {decomposeElement, mutateDOM} = DOMhelpers

  const {
    element: newElement,
    body
  } = decomposeElement(element, "#gameMessage")

  mutateDOM(newElement(), {
    errorCase: () => element.insertAdjacentHTML("afterbegin", gameMessageHTML(gameMessage)),
    successCase: () => setForwardAnimation(newElement(), delayBetween),
    displayAlways: () => body().innerHTML = gameMessage
  })
}

export default displayGameMessage