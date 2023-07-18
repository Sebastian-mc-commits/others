export const mutateDOM = (element, {
  errorCase,
  successCase = () => { },
  displayAlways = () => {}
}) => {

  if (!!element) {
    displayAlways()
    successCase()
    return
  }
  
  errorCase()
  displayAlways()

  setTimeout(successCase, 100)
}

export const decomposeElement = (parentElement, elementSelector, bodySelector = "#body") => {

  const newElement = () => parentElement?.querySelector(elementSelector)
  return {
    element: newElement,
    body: () => newElement()?.querySelector(bodySelector)
  }
}