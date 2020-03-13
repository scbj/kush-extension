import configuration from '@/configuration.json'
import message from '@/message'
import { getBackgroundImageUrlOf, watch } from '@/utils'

const methods = {
  attribute ({ attributeName, target }) {
    return document
      .querySelector(target)
      .getAttribute(attributeName)
  },

  exists ({ target }) {
    return !!document
      .querySelector(target)
  },

  backgroundImage ({ target }) {
    const element = document.querySelector(target)
    const url = getBackgroundImageUrlOf(element)
    return url
  }
}

const actions = {
  click ({ target }) {
    const button = document.querySelector(target)
    button.click()
  }
}

function fetch (value) {
  const config = configuration.values[value]
  const func = methods[config.method]
  return func(config.props)
}

function emit (eventName, valuesIncludes) {
  const constructPayload = (prev, value) => {
    prev[value] = fetch(value)
    return prev
  }
  const payload = valuesIncludes.reduce(constructPayload, {})
  message.notifyBackground(eventName, payload)
}

function configureWatcher ({
  emit: eventName,
  interval,
  payload: valuesIncludes,
  value
}) {
  watch({
    value: () => fetch(value),
    onChanged: _ => emit(eventName, valuesIncludes),
    interval
  })
}

function configureCommand ({ actions: all, trigger: eventName }) {
  const performActions = payload => {
    all.forEach(config => {
      const func = actions[config.name]
      func(config.props)
    })
  }
  message.on(eventName, performActions)
}

configuration.watchers.forEach(configureWatcher)
configuration.commands.forEach(configureCommand)
