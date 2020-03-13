import {
  ACTION_PLAYBACK_TOGGLE_STATUS,
  EVENT_PLAYBACK_STATUS_CHANGED,
  EVENT_PLAYBACK_TRACK_CHANGED
} from '@bit/scbj.kush.constants'

import message from '@/message'
import { ACCOUNT_AUTHENTICATED } from '@/constants'
import server from '@/background/server'

function onAuthenticated (payload) {
  const { accessToken, extension, refreshToken } = payload
  server.authenticate({ accessToken, refreshToken })
  server.connect(extension.id)

  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('extension', JSON.stringify(extension))
  localStorage.setItem('refreshToken', refreshToken)

  server.on(ACTION_PLAYBACK_TOGGLE_STATUS, () => {
    console.log('🐞: ACTION_PLAYBACK_TOGGLE_STATUS', ACTION_PLAYBACK_TOGGLE_STATUS)
    let querying = browser.tabs.query({
      audible: true
    })
    querying
      .then(tabs => tabs.length > 0 && message.notify(tabs[0].id, ACTION_PLAYBACK_TOGGLE_STATUS))
      .catch(error => console.log(`Error: ${error}`))
  })
}

function autoConnect () {
  const accessToken = localStorage.getItem('accessToken')
  const extension = JSON.parse(localStorage.getItem('extension'))
  const refreshToken = localStorage.getItem('refreshToken')
  if (accessToken && extension) {
    onAuthenticated({ accessToken, refreshToken, extension })
  }
}

message.on(ACCOUNT_AUTHENTICATED, onAuthenticated)
message.on(EVENT_PLAYBACK_STATUS_CHANGED, payload => server.emit(EVENT_PLAYBACK_STATUS_CHANGED, payload))
message.on(EVENT_PLAYBACK_TRACK_CHANGED, payload => server.emit(EVENT_PLAYBACK_TRACK_CHANGED, payload))

autoConnect()
