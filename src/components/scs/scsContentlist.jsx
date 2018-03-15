import React from 'react'
import Promo from '../lists/Promo'
import Blog from '../lists/Blog'
import Ad from '../lists/Ad'

// import promoItems from '../../data/items/Promos.json'
// import blogItems from '../../data/items/Blogs.json'
// import adItems from '../../data/items/Ads.json'
import { find } from '../../content/contentQueryService'

const registry = {
  Promo: Promo,
  Blog: Blog,
  Ad: Ad
}
/*
const items = {
  Promo: promoItems,
  Blog: blogItems,
  Ad: adItems
}
*/
const noMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0
}

const unknown = () => <div>LIST NOT FOUND</div>

const Component = ({ type, id, data }) => {
  console.log(type, id, data)
  const { layoutCategory, maxResults, contentTypes, sortOrder } = data
  const layout = registry[contentTypes[0]] || unknown
  const query = {
    contentType: contentTypes[0],
    maxResults: maxResults,
    sortOrder: sortOrder
  }

  const model = find(query) // items[contentTypes[0]] || []
  console.log(model)
  return (
    <div className='scs-component-bounding-box'>
      <div
        className='scs-contentlist scs-component scs-contentlist-default-style'
        style={noMargin}
      >
        <div className='scs-component-content' style={{ width: '100%' }}>
          <div className='scs-contentlist-container'>
            <List list={model} layout={layout} />
          </div>
        </div>
      </div>
      <div className='scs-hidden' />
    </div>
  )
}

const List = ({ list, layout }) => {
  return (
    <div className={'scs-component-container scs-sectionlayout'}>
      <div className='scs-container-styles'>
        <div className='scs-component-content'>
          {list.map((e, index) => (
            <ComponentContainer
              key={index}
              {...e}
              Layout={layout}
              position={index % 2 === 0 ? 'Left' : 'Right'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const ComponentContainer = ({ Layout, ...other }) => (
  <div className='scs-component-bounding-box'>
    <div
      className='scs-custom-component scs-component scs-component-default-style'
      style={noMargin}
    >
      <div className='scs-component-content' style={{ width: '100%' }}>
        <div className='scs-custom-component-wrapper'>
          <Layout {...other} />
        </div>
      </div>
      <div />
    </div>
    <div className='scs-hidden' />
  </div>
)

export default Component
