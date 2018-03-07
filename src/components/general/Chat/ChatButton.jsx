import React from 'react'
import Chat from './Chat'
import './chat.css'
class ChatButton extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = { isClicked: false }
  }
  handleClick(){
    this.setState({isClicked : !this.state.isClicked});
  }

  render () {
    return this.state.isClicked ? (
      <div className='chat-outer-box'>
          <Chat/>
         </div>
          ) : (
        <div className='chat-open-button'> <button className='chat-hidden-button' id='someButton' onClick={this.handleClick}>

               </button>
         </div>
      )
  }
}
export default ChatButton