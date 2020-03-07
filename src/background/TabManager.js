export default class TabManager {
  playingTab = null
  searchingTab = null

  async open (url) {
    if (this.playingTab === null) {
      this.playingTab = await browser.tabs.create({ url })
      console.log('🐞: TabManager -> open -> this.playingTab', this.playingTab)
    }
  }
}
