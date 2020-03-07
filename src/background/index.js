import message from '@/message'

message.on('playback:statusChanged', ({ playing }) => {
  console.log('⚡ playback:statusChanged', playing)
})

message.on('playback:trackChanged', payload => {
  console.log('⚡ playback:trackChanged', payload)
})

message.on('account:authenticated', payload => {
  console.log('⚡ account:authenticated', payload)
})

console.log('🔥')
