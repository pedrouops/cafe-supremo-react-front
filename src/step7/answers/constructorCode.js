//import
import ReconnectingWebSocket from 'reconnecting-websocket'


//constructor


this.state = {
  count: 0,
  message: '',
  messages: []
}

// debug method
const debug = message => console.log(message)

debug('constructor: ')
// todo
let count = 0
let self=this

// Values that will not change can be const types

const channel = 'BF6391FA-5958-4A22-B340-CCFA04F5959E'
const userId = '1'
const websocketConnectionUrl = 'ws://141.144.22.238:8888/chat/ws'

let currentConnection
let ws
this.waitingForText = false

const messageToBot = {
  to: {
    type: 'bot',
    id: channel
  }
}

let connection = websocketConnectionUrl + '?user=' + userId
if (connection !== currentConnection) {
  currentConnection = connection
  debug('initWebSocketIfNeeded: currentConnection ' + currentConnection)
  debug('initWebSocketIfNeeded: connection ' + connection)
  ws = new ReconnectingWebSocket(connection)

  ws.onmessage = function (evt) {
    self.waitingForText = false
    debug('Message received: ' + evt.data)
    let response = JSON.parse(evt.data)
    if (
      response.hasOwnProperty('body') &&
      response.body.hasOwnProperty('messagePayload')
    ) {

      var messagePayload = response.body.messagePayload;

      //ES6 Note the use of Backquotes
      debug(`messagePayload is ${messagePayload.text}`);

      var test = messagePayload.text;
      var messageRecieved = "";

      //check if its an array of Blog items
      if (test.indexOf('textposition') !== -1) {
        messageRecieved = JSON.parse(test);
      } else {
        messageRecieved = JSON.stringify(messagePayload.text);
      }

      addMessage(messageRecieved);

      } else if (response.hasOwnProperty('error')) {
        debug("FAIL:" + response.error.message);
        addMessage(response.error.message);
      }
  }
}

const sendToBot = function (message, isAcknowledge) {
  // wait for websocket until open
  waitForSocketConnection(ws, function () {
    self.waitingForText = true
    ws.send(JSON.stringify(message))
    debug('Message sent: ' + JSON.stringify(message))
  })
}
const waitForSocketConnection = function (socket, callback) {
  setTimeout(function () {
    if (socket.readyState === 1) {
      callback()
    } else {
      debug('waiting for connection...')
      waitForSocketConnection(socket, callback)
    }
  }, 1000) // wait 1 second for the connection...
}

//Send initial message to bot
if (this.state.count === 0) {
  sendToBot(messageToBot)
}

const addMessage = data => {
  console.log('addMessage - ' + data)
  this.setState({
    messages: [...this.state.messages, data]
  })

}

this.sendMessage = ev => {
  ev.preventDefault()

  messageToBot.messagePayload = { type: 'text', text: this.state.message }

  sendToBot(messageToBot)
  addMessage(this.state.message)
  // set this back to null so it resets the text input
  this.setState({ message: '' })
  count = count + 1
}
