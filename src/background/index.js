import configuration from '@bit/scbj.kush.configuration'

import { ACCOUNT_AUTHENTICATED } from '@/constants'
import message from '@/message'
import socket from './socket'
import tabs from './tabs'

function intialize ({ accessToken, extension }) {
  socket.connect(accessToken, extension.id)

  const events = new Set(configuration.watchers.map(x => x.emit))
  Array.from(events).forEach(configureDispatcher)
  configuration.commands.forEach(configureCommand)
}

function configureDispatcher (eventName) {
  const dispatch = payload => socket.emit(eventName, payload)
  message.on(eventName, dispatch)
}

function configureCommand ({ trigger: eventName }) {
  const notifyContentScript = payload => {
    const tabId = tabs.getPlayerTabId()
    tabId && message.notify(tabId, eventName, payload)
  }
  socket.on(eventName, notifyContentScript)
}

function loadLocalStorage () {
  const state = localStorage.getItem('vuex')

  if (state) {
    const { accessToken, extension } = JSON.parse(state)
    accessToken && extension &&
      intialize({ accessToken, extension })
  }
}

loadLocalStorage()

// Message from Popup when user logged in
message.on(ACCOUNT_AUTHENTICATED, intialize)
