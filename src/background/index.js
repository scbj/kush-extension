import message from '@/message'
import {
  ACCOUNT_AUTHENTICATED,
  // PLAYBACK_NEXT,
  // PLAYBACK_PREVIOUS,
  PLAYBACK_STATUS_CHANGED,
  PLAYBACK_TOGGLE,
  PLAYBACK_TRACK_CHANGED
} from '@/constants'

import server from '@/background/server'

function onAuthenticated (payload) {
  server.authenticate({
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken
  })
  server.connect()
}

message.on(ACCOUNT_AUTHENTICATED, onAuthenticated)
message.on(PLAYBACK_STATUS_CHANGED, payload => server.emit(PLAYBACK_STATUS_CHANGED, payload))
message.on(PLAYBACK_TRACK_CHANGED, payload => server.emit(PLAYBACK_TRACK_CHANGED, payload))

message.on(ACCOUNT_AUTHENTICATED, () => {
  let querying = browser.tabs.query({
    audible: true
  })
  querying
    .then(tabs => tabs.length > 0 && message.notify(tabs[0].id, PLAYBACK_TOGGLE))
    .catch(error => console.log(`Error: ${error}`))
})
