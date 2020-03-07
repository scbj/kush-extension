const events = {}

function dispatchEvent ({ eventName, payload }) {
  const funcs = events[eventName]
  for (const func of funcs) {
    func(payload)
  }
}

export default {
  /**
   * @param {String} eventName
   * @param {Object} payload
   */
  notifyBackground (eventName, payload) {
    return browser.runtime.sendMessage({
      eventName,
      payload
    })
  },

  /**
   * @param {Number} tabId
   * @param {String} eventName
   * @param {Object} payload
   */
  notify (tabId, eventName, payload) {
    return browser.tabs.sendMessage(tabId, {
      eventName,
      payload
    })
  },

  /**
   * Fired when a message is sent from either an extension process (by sendToBackground) or a content script (by sendToForeground).
   */
  on (eventName, func) {
    if (eventName in events === false) {
      events[eventName] = []
    }
    events[eventName].push(func)

    if (!browser.runtime.onMessage.hasListener(dispatchEvent)) {
      browser.runtime.onMessage.addListener(dispatchEvent)
    }
  },

  off (eventName, func) {
    if (eventName in events) {
      const index = events[eventName].findIndex(func)
      if (index > -1) {
        events[eventName].splice(index, 1)
      }
    }
  }
}
