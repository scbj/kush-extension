/**
 *
 * @param {Object} params
 * @param {String} params.accessToken
 * @param {String} params.refreshToken
 */
function authenticate ({ accessToken, refreshToken }) {
  console.log('🐞: authenticate -> refreshToken', refreshToken)
  console.log('🐞: authenticate -> accessToken', accessToken)
}

function connect () {
  console.log('🐞: connect')
}

function emit (eventName, payload) {
  console.log('⚡: server.emit(...)', eventName, payload)
}

function on (eventName, func) {
  func()
}

export default {
  authenticate,
  connect,
  emit,
  on
}
