let player = null

function getAudibleTab () {
  const searchFor = { audible: true }
  const single = tabs => tabs.length && tabs[0]

  return new Promise(resolve =>
    browser.tabs
      .query(searchFor)
      .then(single)
      .then(tab => resolve(tab))
  )
}

setInterval(async () => {
  try {
    const audible = await getAudibleTab()
    if (audible) {
      player = audible
    }
  } catch (error) {
    console.error(error)
  }
}, 1000)

export default {
  getPlayerTabId () {
    return player && player.id
  }
}
