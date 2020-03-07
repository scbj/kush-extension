import message from '@/message'
import controller from '@/content-scripts/controller'
import reader from '@/content-scripts/reader'
import { loop } from '@/utils'

message.on('playback:toggle', () => controller.togglePlaying())
message.on('playback:next', () => controller.next())
message.on('playback:previous', () => controller.previous())

const state = {
  url: null,
  playing: null
}

function watchPlaybackStatus () {
  const playing = reader.playing()
  if (playing !== state.playing) {
    state.playing = playing
    message.notifyBackground('playback:statusChanged', { playing })
  }
}

function watchMetadata () {
  const url = reader.url()
  if (url && url !== state.url) {
    // Store the new value
    state.url = url

    // Get others metadata
    const data = reader.readAll()
    message.notifyBackground('playback:trackChanged', data)
  }
}

loop(() => {
  watchPlaybackStatus()
  watchMetadata()
}, 200)
