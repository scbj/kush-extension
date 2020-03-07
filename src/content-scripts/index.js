import message from '@/message'
import { watch } from '@/utils'
import {
  PLAYBACK_NEXT,
  PLAYBACK_PREVIOUS,
  PLAYBACK_STATUS_CHANGED,
  PLAYBACK_TOGGLE,
  PLAYBACK_TRACK_CHANGED
} from '@/constants'

import controller from '@/content-scripts/controller'
import reader from '@/content-scripts/reader'

message.on(PLAYBACK_NEXT, () => controller.next())
message.on(PLAYBACK_PREVIOUS, () => controller.previous())
message.on(PLAYBACK_TOGGLE, () => controller.togglePlaying())

watch({
  value: () => reader.playing(),
  onChanged: playing => message.notifyBackground(PLAYBACK_STATUS_CHANGED, { playing }),
  interval: 200
})

watch({
  value: () => reader.url(),
  onChanged: () => message.notifyBackground(PLAYBACK_TRACK_CHANGED, reader.readAll()),
  interval: 400
})
