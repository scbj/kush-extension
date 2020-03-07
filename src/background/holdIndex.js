// import TabManager from './TabManager'

// browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log('🐞: sender', sender)
//   console.log('🐞: request', request)
//   console.log('Hello from the background')

//   // browser.tabs.executeScript({
//   //   file: 'content-script.js'
//   // })

//   let querying = browser.tabs.query({
//     audible: true
//   })

//   function logTabs (tabs) {
//     for (let tab of tabs) {
//       // tab.url requires the `tabs` permission
//       console.log(tab.url)
//     }
//   }

//   function onError (error) {
//     console.log(`Error: ${error}`)
//   }

//   querying
//     .then(logTabs)
//     .catch(onError)
// })

// // Instantiate the extension main object
// // const extension = new Extension()
// // const account = new Account()

// // account.on('login', ({ accessToken }) => {
// //   extension.connect({
// //     url: `https://apiexample.com/socket?token=${accessToken}`,
// //     id: ''
// //   })
// // })

// const manager = new TabManager()

// manager.open('https://soundcloud.com/astrokick/secret-mol-cule')

// console.log('Hmm d')
