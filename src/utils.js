/**
 *  Executes a function every specified milliseconds.
 * @param {Function} func The callback functiont to execute
 * @param {Number} wait Milliseconds to wait
 */
export function loop (func, wait) {
  try {
    func()
  } catch (error) {
    console.debug('Unhandled error on loop: ' + JSON.stringify(error))
  }
  setTimeout(_ => loop(func, wait), wait)
}

/**
 * Watch a value with a specified interval and triggers a function if it has changed.
 * @param {Object} params
 * @param {Function} params.value The value to watch
 * @param {Function} params.onChanged The function to execute when it has changed
 * @param {Number} params.interval The interval before a new update
 */
export function watch ({ value: getValue, onChanged, interval }) {
  let storedValue = null

  // Execute each 200 milliseconds
  loop(() => {
    const value = getValue()
    if (value !== storedValue) {
      // Store the new value
      storedValue = value

      // Emit changes
      onChanged(value)
    }
  }, interval)
}
