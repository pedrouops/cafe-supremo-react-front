import React from 'react'
import Promo  from '../lists/Promo'
import Blog  from '../lists/Blog'
import Ad  from '../lists/Ad'


const registry = {
    Promo:Promo, Blog:Blog, Ad: Ad
}

const noMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0
}

const unknown = () => (<div>LIST NOT FOUND</div>)

const Component = ({ type, id, data }) => {
  console.log(type, id, data)
  const List = registry[data.contentTypes[0]] || unknown
  return (
    <div className='scs-component-bounding-box'>
      <div
        className='scs-contentlist scs-component scs-contentlist-default-style'
        style={noMargin}
      >
        <div className='scs-component-content' style={{ width: '100%' }}>
          <div className='scs-contentlist-container'>
            <List />
          </div>
        </div>
      </div>
      <div className='scs-hidden' />
    </div>
  )
}

export default Component
