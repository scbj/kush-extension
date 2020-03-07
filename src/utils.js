/**
 *  Execute a function every specified milliseconds.
 * @param {Function} func The callback functiont to execute
 * @param {Number} wait Milliseconds to wait
 */
function loop (func, wait) {
  try {
    func()
  } catch (error) {
    console.debug('Unhandled error on loop: ' + JSON.stringify(error))
  }
  setTimeout(_ => loop(func, wait), wait)
}

export { loop }
