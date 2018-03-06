import React from 'react'

import './assets/css/footer.css'
import './designs/default/socialbar.css'
import Slot from '../../components/system/Slot'

const Footer = () => (
  <div>
    <footer>
      <Slot className='footer scs-slot scs-responsive' id='footer' />
    </footer>
  </div>
)

export default Footer
