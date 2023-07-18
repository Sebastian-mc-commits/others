const useSignalJs = (value, checkIfValueHasChanged = false) => {

  const hasValueChanged = (newValue, prevValue) => {

    let areTheSame = false

    if (!checkIfValueHasChanged || !Array.isArray(newValue) || typeof newValue !== typeof prevValue) return false

    switch (typeof newValue) {
      case "object": {

        if (Array.isArray(newValue)) {
          areTheSame = Array.isArray(prevValue) && newValue.every((el, index) => el === prevValue[index])
          break
        }

        areTheSame = Object.values(newValue).every((value, index) => value === prevValue[index])
        break
      }

      case "string":
      case "number": {
        areTheSame = newValue === prevValue
        break
      }

      default: {
        areTheSame = false
        break
      }
    }

    return areTheSame
  }

  return {
    get current() {
      return value;
    },

    set current(newValue) {

      if (!hasValueChanged(newValue, value) && typeof this.onHandlerChangeValue === "function") {
        this.onHandlerChangeValue(newValue);
      }
      value = newValue;
    },

    /**
     * @param {any} newValue
     */
    set __current__(newValue) {
      value = newValue;
    },

    /**
     * @param {any} newValue
     */
    callFn(...newValue) {
      if (!hasValueChanged(newValue, value)) {
        this.onHandlerChangeValue.apply(null, newValue)
      }
      value = newValue;
    },

    onHandlerChangeValue: () => {}
  };
};

export default useSignalJs;