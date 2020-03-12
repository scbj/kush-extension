import {
  ACTION_PLAYBACK_NEXT,
  ACTION_PLAYBACK_PREVIOUS,
  ACTION_PLAYBACK_TOGGLE_STATUS,
  EVENT_PLAYBACK_STATUS_CHANGED,
  EVENT_PLAYBACK_TRACK_CHANGED
} from '@bit/scbj.kush.constants'

import message from '@/message'
import { watch } from '@/utils'

import controller from '@/content-scripts/controller'
import reader from '@/content-scripts/reader'

message.on(ACTION_PLAYBACK_NEXT, () => controller.next())
message.on(ACTION_PLAYBACK_PREVIOUS, () => controller.previous())
message.on(ACTION_PLAYBACK_TOGGLE_STATUS, () => controller.togglePlaying())

watch({
  value: () => reader.playing(),
  onChanged: playing => message.notifyBackground(EVENT_PLAYBACK_STATUS_CHANGED, { playing }),
  interval: 200
})

watch({
  value: () => reader.url(),
  onChanged: () => message.notifyBackground(EVENT_PLAYBACK_TRACK_CHANGED, reader.readAll()),
  interval: 400
})
