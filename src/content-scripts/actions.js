export default {
  click ({ target }) {
    const button = document.querySelector(target)
    button.click()
  },

  /**
   * Navigate to the specified URL.
   * @param {Object} props
   * @param {Object} payload
   * @param {String} payload.url
   */
  navigate (props, { url }) {
    window.location.href = url
  }
}
