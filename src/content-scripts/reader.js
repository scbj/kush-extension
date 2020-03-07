export default {
  channel () {
    return document
      .querySelector('a.playbackSoundBadge__lightLink.sc-link-light')
      .getAttribute('title')
  },

  readAll () {
    return {
      channel: this.channel(),
      title: this.title(),
      thumbnail: this.thumbnail()
    }
  },

  title () {
    return document
      .querySelector('a.playbackSoundBadge__titleLink')
      .getAttribute('title')
  },

  playing () {
    return !!document
      .querySelector('button.playing')
  },

  thumbnail () {
    const element = document.querySelector('.playControls__soundBadge span.sc-artwork.image__full')
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
  },

  url () {
    return document
      .querySelector('a.playbackSoundBadge__titleLink')
      .getAttribute('href')
  }
}
