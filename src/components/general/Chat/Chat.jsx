import React from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'

class Chat extends React.Component {
  constructor (props) {
    // allows you to access this.props in the constructor method
    super(props)
    // initialize the state
    // State is similar to props, but it is private and fully controlled by the component.
    this.state = {
      count: 0,
      message: '',
      messages: []
    }

    // debug method
    const debug = message => console.log(message)

    debug('constructor: ')
    // todo
    var self = this
    var count = 0

    // Values that will not change can be const types

    const channel = 'B96D1D9B-1EC3-43DA-88DA-E15DEB0819B1'
    const userId = '1'
    const websocketConnectionUrl = 'ws://141.144.22.238:8888/chat/ws'

    var currentConnection
    var ws
    self.waitingForText = false

    const messageToBot = {
      to: {
        type: 'bot',
        id: channel
      }
    }

    var connection = websocketConnectionUrl + '?user=' + userId
    if (connection !== currentConnection) {
      currentConnection = connection
      debug('initWebSocketIfNeeded: currentConnection ' + currentConnection)
      debug('initWebSocketIfNeeded: connection ' + connection)
      ws = new ReconnectingWebSocket(connection)

      ws.onmessage = function (evt) {
        self.waitingForText = false
        debug('Message received: ' + evt.data)
        var response = JSON.parse(evt.data)
        if (
          response.hasOwnProperty('body') &&
          response.body.hasOwnProperty('messagePayload')
        ) {
          var messagePayload = response.body.messagePayload

          // ES6 Note the use of Backquotes
          debug(`messagePayload is ${messagePayload.text}`)
          debug('Message payload: ' + JSON.stringify(messagePayload))

          var messageRecieved = JSON.stringify(messagePayload.text)
          addMessage(messageRecieved)
        } else if (response.hasOwnProperty('error')) {
          debug('FAIL:' + response.error.message)
          addMessage(response.error.message)
        }
      }
    }

    var sendToBot = function (message, isAcknowledge) {
      // wait for websocket until open
      waitForSocketConnection(ws, function () {
        self.waitingForText = true
        ws.send(JSON.stringify(message))
        debug('Message sent: ' + JSON.stringify(message))
      })
    }
    var waitForSocketConnection = function (socket, callback) {
      setTimeout(function () {
        if (socket.readyState === 1) {
          callback()
        } else {
          debug('waiting for connection...')
          waitForSocketConnection(socket, callback)
        }
      }, 1000) // wait 1 second for the connection...
    }

    if (this.state.count === 0) {
      sendToBot(messageToBot)
    }

    const addMessage = data => {
      console.log('addMessage - ' + data)
      this.setState({
        messages: [...this.state.messages, data]
      })

      console.log('addMessage -count ' + count)
      //  console.log("Messages - "+this.state.messages);
    }

    this.sendMessage = ev => {
      ev.preventDefault()

      console.log('SHOULD SEND: ' + this.state.message)

      this.state.message = "What's my balance for savings"
      messageToBot.messagePayload = { type: 'text', text: this.state.message }
      console.log('SHOULD SEND Overridden: ' + this.state.message)

      sendToBot(messageToBot)
      // set this back to null so the textbox dissapears
      addMessage(this.state.message)
      this.setState({ message: '' })
      count = count + 1
    }
  }

  render () {
    return (
      <div className='chat-container'>
        <div className='row'>
          <div className='chat-col-4'>
            <div className='chat-card'>
              <div className='chat-card-body'>
                <div className='chat-card-title'>
                  Search the Supremo Content Base{' '}
                  <button id='someButton2'>X</button>
                </div>

                <div className='messages'>
                  {this.state.messages.map((message, index) => {
                    if (index % 2 === 0) {
                      return (
                        <div className='bubble-left' key={index}>
                          {message}
                        </div>
                      )
                    } else {
                      return (
                        <div className='bubble-right' key={index}>
                          {message}
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
              <div className='chat-card-footer'>
                <br />
                <input
                  type='text'
                  placeholder='Content to search for eg. Coffee'
                  className='form-control'
                  value={this.state.message}
                  onChange={ev => this.setState({ message: ev.target.value })}
                />
                <br />
                <button
                  onClick={this.sendMessage}
                  className='btn btn-primary form-control'
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
