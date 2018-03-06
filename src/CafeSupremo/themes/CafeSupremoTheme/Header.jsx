import React from 'react'

import './assets/css/header.css'
import Slot from '../../components/system/Slot'

const Header = () => (
  <div>
    <div className='header row'>
      {/* These columns are flipped so they are in the correct order in single column mode */}
      <div className='logo col-xs-4'>
        <Slot className='logocontainer scs-slot' id='logocontainer' />
      </div>
      <div className='col-xs-8'>
        <Slot className='searchcontainer scs-slot' id='searchcontainer' />
      </div>
      <Slot className='menucontainer scs-slot' id='navMenu' />
    </div>
  </div>
)
export default Header
