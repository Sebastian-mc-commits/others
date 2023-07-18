import {
  Character
} from "./Game/index.js"

import player from "./Game/player.js";
import {
  CharacterStatus
} from "./components/index.js";
import useLayoutEffect from "./helpers/useLayoutEffect.js";

const playerStatus = CharacterStatus()
export const charms = playerStatus.charms()

useLayoutEffect(() => {
  playerStatus.init()

  const characterOptions = {
    animationTime: 300,
    characterMovement: 50,
    container: document.body
  }

  const design = {
    top: "5rem",
    left: "5rem"
  }

  new Character(characterOptions, design)
})

export const playerInformation = player({
  element: document.querySelector("#player"),
  datasetKiller: "killer",
  touchElements: "[data-touch]",
  datasetPowerUp: "powerUp"
})