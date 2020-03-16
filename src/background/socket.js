import io from 'socket.io-client'

let socket = null

/**
 * Connects to the socket io server.
 * @param {String} accessToken
 * @param {String} extensionId
 */
function connect (accessToken, extensionId) {
  const options = {
    query: {
      accessToken,
      extensionId,
      type: 'extension'
    }
  }
  socket = io(process.env.VUE_APP_SERVER_URL, options)
}

/**
 * Send a specified event with a optional payload.
 * @param {String} eventName
 * @param {Object} payload
 */
function emit (eventName, payload) {
  socket && socket.emit(eventName, payload)
}

/**
 * Subrsibres to a specified event.
 * @param {String} eventName
 * @param {Func} cb
 */
function on (eventName, cb) {
  socket && socket.on(eventName, cb)
}

export default {
  connect,
  emit,
  on
}
