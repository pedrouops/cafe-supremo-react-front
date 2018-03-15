import ReconnectingWebSocket from 'reconnecting-websocket'

class BotService {
  constructor (addMessage) {
    debug('constructor: ')
    this.addMessage = addMessage
      this.channel = 'BF6391FA-5958-4A22-B340-CCFA04F5959E'
    this.userId = '1'
    this.websocketConnectionUrl = 'ws://141.144.22.238:8888/chat/ws'
    this.connect()
  }

  connect () {
    let self = this

    // Values that will not change can be const types



    let connection = this.websocketConnectionUrl + '?user=' + this.userId
      debug('initWebSocketIfNeeded: connection ' + connection)
      this.ws = new ReconnectingWebSocket(connection)

      this.ws.onmessage = function (evt) {
        debug('Message received: ' + evt.data)
        let response = JSON.parse(evt.data)
        if (response.body && response.body.messagePayload) {
          const messagePayload = response.body.messagePayload

          // ES6 Note the use of Backquotes
          debug(`messagePayload is ${messagePayload.text}`)

          var test = messagePayload.text
          let messageRecieved = ''

          // check if its an array of Blog items
          if (test.indexOf('textposition') !== -1) {
            messageRecieved = JSON.parse(test)
          } else {
            messageRecieved = JSON.stringify(messagePayload.text)
          }

          self.addMessage(messageRecieved)
        } else if (response.error) {
          debug('FAIL:' + response.error.message)
          self.addMessage(response.error.message)
        }
      
    }
  }
    
  sendToBot (message) {
      const messageToBot = message ? {
        to: {
          type: 'bot',
          id: this.channel
        }, messagePayload: { type: 'text', text: message }
      } :{
        to: {
          type: 'bot',
          id: this.channel
        }
      } 
      const ws = this.ws
    // wait for websocket until open
    waitForSocketConnection(this.ws, function () {
      ws.send(JSON.stringify(messageToBot))
      debug('Message sent: ' + JSON.stringify(messageToBot))
    })
  }
}

// debug method
const debug = message => console.log(message)

const waitForSocketConnection = (socket, callback) => {
  setTimeout(function () {
    if (socket.readyState === 1) {
      callback()
    } else {
      debug('waiting for connection...')
      waitForSocketConnection(socket, callback)
    }
  }, 1000) // wait 1 second for the connection...
}

export default BotService
