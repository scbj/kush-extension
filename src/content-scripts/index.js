import message from '@/message'
import { watch } from '@/utils'

import controller from '@/content-scripts/controller'
import reader from '@/content-scripts/reader'

message.on('playback:toggle', () => controller.togglePlaying())
message.on('playback:next', () => controller.next())
message.on('playback:previous', () => controller.previous())

watch({
  value: () => reader.playing(),
  onChanged: playing => message.notifyBackground('playback:statusChanged', { playing }),
  interval: 200
})

watch({
  value: () => reader.url(),
  onChanged: () => message.notifyBackground('playback:trackChanged', reader.readAll()),
  interval: 400
})
