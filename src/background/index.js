import {
  ACTION_PLAYBACK_TOGGLE_STATUS,
  EVENT_PLAYBACK_STATUS_CHANGED,
  EVENT_PLAYBACK_TRACK_CHANGED
} from '@bit/scbj.kush.constants'

import message from '@/message'
import { ACCOUNT_AUTHENTICATED } from '@/constants'
import server from '@/background/server'

function onAuthenticated (payload) {
  server.authenticate({
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken
  })
  server.connect()
}

message.on(ACCOUNT_AUTHENTICATED, onAuthenticated)
message.on(EVENT_PLAYBACK_STATUS_CHANGED, payload => server.emit(EVENT_PLAYBACK_STATUS_CHANGED, payload))
message.on(EVENT_PLAYBACK_TRACK_CHANGED, payload => server.emit(EVENT_PLAYBACK_TRACK_CHANGED, payload))

message.on(ACCOUNT_AUTHENTICATED, () => {
  let querying = browser.tabs.query({
    audible: true
  })
  querying
    .then(tabs => tabs.length > 0 && message.notify(tabs[0].id, ACTION_PLAYBACK_TOGGLE_STATUS))
    .catch(error => console.log(`Error: ${error}`))
})

const accessToken = localStorage.getItem('accessToken')
if (accessToken) {
  onAuthenticated({ accessToken })
}
