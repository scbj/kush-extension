function getBackgroundImageUrlOf (element) {
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

function attribute ({ attributeName, target, type }) {
  const value = document
    .querySelector(target)
    .getAttribute(attributeName)
  switch (type) {
    case 'Number': return +value
    default: return value
  }
}

function backgroundImage ({ target }) {
  const element = document.querySelector(target)
  const url = getBackgroundImageUrlOf(element)
  return url
}

function exists ({ target }) {
  return !!document
    .querySelector(target)
}

function stateExists ({ defaultState, targets }) {
  for (const [ state, target ] of Object.entries(targets)) {
    if (exists({ target })) {
      return state
    }
  }
  return defaultState
}

export default {
  attribute,
  backgroundImage,
  exists,
  stateExists
}
