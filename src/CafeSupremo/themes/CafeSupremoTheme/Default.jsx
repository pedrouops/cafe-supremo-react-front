import React from 'react'

import './designs/default/design.css'
import './assets/css/styles.css'
import './assets/plugins/bootstrap/css/bootstrap.css'

import Header from './Header'
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

export default Default
