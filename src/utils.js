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

export function getBackgroundImageUrlOf (element) {
  if (element) {
    let bg = element.style.backgroundImage
    let url = bg.replace('url(', '').replace(')', '').replace(/"/gi, '')

    /**
     * Remove the definition at the end of the definition (ex: "120x120.jpg", "50x50.jpg"...etc)
     * and replace it with "500x500.jpg".
     * Calculate the length of the end from the sign "x" to deduce the number of characters to delete.
     */
    const large = '500x500.jpg'
    const end = url.substring(url.lastIndexOf('x'))
    // deduce string slice value
    const value = end.length === 8 ? -11 : -9

    return url.slice(0, value) + large
  }
}
