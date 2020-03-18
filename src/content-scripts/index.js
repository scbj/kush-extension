import configuration from '@bit/scbj.kush.configuration'

import message from '@/message'
import { watch } from '@/utils'

import actions from './actions'
import getters from './getters'

/**
 * Returns the specified value.
 * @param {String} value
 */
function fetch (value) {
  const config = configuration.getters[value]
  const func = getters[config.method]
  try {
    return func(config.props)
  } catch (error) {
    return error.toString()
  }
}

/**
 * Emits an event with the specified values as payload.
 * @param {String} eventName
 * @param {String[]} valuesIncludes
 */
function emit (eventName, valuesIncludes) {
  const constructPayload = (prev, value) => {
    prev[value] = fetch(value)
    return prev
  }
  const payload = valuesIncludes.reduce(constructPayload, {})
  message.notifyBackground(eventName, payload)
}

/**
 * Creates a watcher that emits events when the observed value has changed.
 * @param {Object} watcher
 * @param {String} watcher.emit
 * @param {Number} watcher.interval
 * @param {String[]} watcher.payload
 * @param {String} watcher.value
 */
function configureWatcher ({
  emit: eventName,
  interval,
  payload: valuesIncludes,
  value: valueName
}) {
  watch({
    value: () => fetch(valueName),
    onChanged: _ => emit(eventName, valuesIncludes),
    interval
  })
}

/**
 * Subscribes to the specified event and associate it with a listof actions
 * to be executed when it is triggered.
 * @param {Object} command
 * @param {Array} command.actions
 * @param {String} command.trigger
 */
function configureCommand ({ actions: all, trigger: eventName }) {
  const performActions = payload => {
    all.forEach(config => {
      const func = actions[config.name]
      func(config.props, payload)
    })
  }
  message.on(eventName, performActions)
}

configuration.watchers.forEach(configureWatcher)
configuration.commands.forEach(configureCommand)
