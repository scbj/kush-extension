function click (selector) {
  const button = document.querySelector(selector)
  button.click()
}

export default {
  togglePlaying () {
    click('.playControl.sc-ir.playControls__control.playControls__play')
  },

  next () {
    click('.skipControl.sc-ir.playControls__control.playControls__next.skipControl__next')
  },

  previous () {
    click('.skipControl.sc-ir.playControls__control.playControls__prev.skipControl__previous')
  }
}
