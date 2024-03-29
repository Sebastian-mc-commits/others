import useSignalJs from "./useSignalJs.js"

const functionTree = useSignalJs([], false)

export default function useLayoutEffect(callback) {
  functionTree.current = [
    ...functionTree.current,
    callback
  ]

}

if (!window?.isContentUnloaded) {
  document.addEventListener("DOMContentLoaded", event => {
    window.isContentUnloaded = true
    functionTree.current.forEach(fn => {
      fn(event)
    })
  })
}

// document.visibilityState