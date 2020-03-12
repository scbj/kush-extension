import createSocketIO from 'socket.io-client'

let socket = null

/**
 *
 * @param {Object} params
 * @param {String} params.accessToken
 * @param {String} params.refreshToken
 */
function authenticate ({ accessToken, refreshToken }) {
  localStorage.setItem('accessToken', accessToken)
}

function connect (extensionId) {
  const accessToken = localStorage.getItem('accessToken')
  console.log('🐞: connect')
  socket = createSocketIO('http://localhost:3000', {
    query: {
      accessToken,
      extensionId,
      type: 'extension'
    }
  })
}

function emit (eventName, payload) {
  socket.emit(eventName, payload)
}

function on (eventName, func) {
  socket.on(eventName, func)
}

export default {
  authenticate,
  connect,
  emit,
  on
}
