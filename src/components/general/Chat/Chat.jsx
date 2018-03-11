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
      // set this back to null so the textbox dissapears
      addMessage(this.state.message)
      this.setState({ message: '' })
      count = count + 1
    }
  }



  render () {
    return (
      <div className='search-container'>
        <div className='search-row'>
          <div className='search-col-4'>
            <div className='search-card'>
              <div className='search-card-body'>
                <div className='search-card-title'>
                  Search the Supremo content base using an AI bot
                  <div className='search-card-header'>
                    <form>
                          <input type='text'
                            placeholder='Content to search for eg. Coffee'
                            className='search-content-input'
                            value={this.state.message}
                            onChange={ev => this.setState({ message: ev.target.value })}
                          />

                          <button onClick={this.sendMessage} className='search-content-button' >
                            Search
                          </button>
                     </form>
                  </div>
                </div>

                <div className='search-messages'>
                  {this.state.messages.map((message, index) => {
                    if (index % 2 === 0) {
                      return (
                        <div className='bubble-left' key={index}>
                          {message}
                        </div>
                      )
                    } else {
                      return (
                        <div className="search-response" key={index} >


                          {message.map(ContentItem => <div className="search-item">
                                <img className='search-image' src={ContentItem.image}  />
                                <div className="search-blog-title" >  {ContentItem.name }  -  {ContentItem.description } </div>
                                <div className="search-blog-body"  >  {ContentItem.body }   </div>
                              <div className="search-blog-end" >     </div>
                                                 </div>
                              )}

                         </div>
                      )
                    }
                  })}
                </div>
              </div>
              <div className='chat-card-footer'>
                <br />

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
