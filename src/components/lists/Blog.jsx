import React from 'react'
import '../layout/Blog/Highlight/design.css'

const blog = {
  href:
    '/CafeSupremo/blog/blogdetails/Blog/Blog_core_d18f5d5e-3e94-454b-bd38-aaadcac5a75a/Cake Batter The Right Way!',
  type: 'RECIPES',
  title: 'Blog',
  date: 'November 8, 2017',
  name: 'Cake Batter The Right Way!',
  description: 'Step by step guide for the perfect consistency',
  contentId: 'Blog_core_d18f5d5e-3e94-454b-bd38-aaadcac5a75a',
  src:
    'https://www.mycontentdemo.com/content/published/api/v1/digital-assets/DigitalAsset_proxy_81812417-0cd8-4ece-97a6-1e85c9867a5a/default?cb=_cache_7d24',
  alt: ''
}

const Component = () => {
  const list = [blog]
  const layout = Blog
  console.log(JSON.stringify(list, null, 2))

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
const noMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0
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
const Blog = ({ href, type, title, date, name, description, src, alt }) => (
  <a href={href}>
    <div className='blog-highlight'>
      <div className='contentItemWrapper'>
        <button type='button'>{type}</button>
        <div className='contentItem'>
          <div className='titleWrapper'>
            <span className='title'>{title} / </span>
            <span className='date'>{date}</span>
          </div>
          <div className='name'>{name}</div>
          <div className='description'>{description}</div>
        </div>
      </div>
      <img className='image' src={src} alt={alt} />
    </div>
  </a>
)

export default Component
