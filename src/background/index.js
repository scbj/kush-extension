import configuration from '@/configuration.json'
import { ACCOUNT_AUTHENTICATED } from '@/constants'
import message from '@/message'
import socket from './socket'
import tabs from './tabs'

function configureDispatcher ({ emit: eventName }) {
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

message.on(ACCOUNT_AUTHENTICATED, payload => {
  const { accessToken, extension } = payload

  // Connect Socket.io
  socket.connect(accessToken, extension.id)

  configuration.watchers.forEach(configureDispatcher)
  configuration.commands.forEach(configureCommand)
})
