import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./components/layout/Ad/Default/design.css"
import "./components/layout/Ad/Highlight/design.css"
import "./components/layout/Author/Banner/design.css"
import "./components/layout/Author/Details/design.css"
import "./components/layout/Blog/Author/design.css"
import "./components/layout/Blog/Banner/design.css"
import "./components/layout/Blog/Default/design.css"
import "./components/layout/Blog/Details/design.css"
import "./components/layout/Blog/Headline/design.css"
import "./components/layout/Blog/Highlight/design.css"
import "./components/layout/Blog/Overlay/design.css"
import "./components/layout/Promo/Default/design.css"
// import "./components/layout/Promo/Details/design.css"

import Layout from './themes/CafeSupremoTheme/Default'
import pageData from './render/pagedata'

// Main JavaScript 
global.jQuery = require('jquery')
require( 'bootstrap')

export default class CafeSupremo extends Component {
  getChildContext() {
    return {
      pageData: pageData('slug')
    }
  }
  render() {
    return (
      <React.Fragment>
        <Layout/>
      </React.Fragment>
    );
  }
}
CafeSupremo.childContextTypes= {
    pageData: PropTypes.object
}
