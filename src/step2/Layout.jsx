import React, { Component } from 'react'

import content from './content.json'
const allItems = content.ALL.data.items

const items = allItems.filter(item => item.type === 'Blog')

export default class Layout extends Component {
  render () {
    return (
      <div>
        <h1>Hello Content</h1>
        {items.map((item, index) => <div key={index}>{item.name}</div>)}
      </div>
    )
  }
}
