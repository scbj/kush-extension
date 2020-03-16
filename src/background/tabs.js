let player = null

function getAudibleTabs () {
  const predicate = { audible: true }
  const single = tabs => tabs.length && tabs[0]

  return new Promise(resolve =>
    browser.tabs
      .query(predicate)
      .then(single)
      .then(tab => resolve(tab))
  )
}

setInterval(async () => {
  const audible = await getAudibleTabs()
  if (audible) {
    player = audible
  }
}, 1000)

export default {
  getPlayerTabId () {
    return player && player.id
  }
}
