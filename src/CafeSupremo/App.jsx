import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Layout from './themes/CafeSupremoTheme/Default'
import pageData from './render/pagedata'

// Main JavaScript
global.jQuery = require('jquery')
require('bootstrap')

export default class CafeSupremo extends Component {
  getChildContext () {
    return {
      pageData: pageData('slug')
    }
  }
  render () {
    return (
      <React.Fragment>
        <Layout />
      </React.Fragment>
    )
  }
}
CafeSupremo.childContextTypes = {
  pageData: PropTypes.object
}
