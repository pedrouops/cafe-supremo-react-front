import React from 'react'

import './designs/default/design.css'
import './assets/css/styles.css'
import './assets/plugins/bootstrap/css/bootstrap.css'

import Header from './Header'
import Chat from './Chat'
import Footer from './Footer'
import Slot from '../../components/system/Slot'

const Default = () => (
  <div>
    <Header />
    <Slot className='headline scs-slot' id='headline' />
    <Slot className='headline scs-slot' id='content' />
    <Slot className='headline scs-slot' id='blog' />
    <Footer />
    <CookieConsent />
    <ChatButton/>
  </div>
)

class CookieConsent extends React.Component {
  constructor (props) {
    super(props)
    const hasConsented = window.localStorage.getItem('cookieConsent')
    this.state = { hasConsented: hasConsented === 'true' }
  }

  giveConsent () {
    window.localStorage.setItem('cookieConsent', 'true')
    this.setState({ hasConsented: true })
  }
  render () {
    return this.state.hasConsented ? (
      ''
    ) : (
      <div className='scs-cookie-consent' data-scs-consent-version='1'>
        This site uses cookies. Please review our{' '}
        <a href='#privacy-policy'>Privacy Policy</a>.{' '}
        <button
          alt='close'
          className='scs-cookie-consent-close'
          onClick={() => this.giveConsent()}
        />
      </div>
    )
  }
}

class ChatButton extends React.Component {
  constructor (props) {
    super(props)
    var isClicked = false;
    this.handleClick = this.handleClick.bind(this)
    this.state = { isClicked: isClicked === 'false' }
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


export default Default
