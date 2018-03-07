import React from 'react'
import '../layout/Ad/Highlight/design.css'

const Ad = ({ categoryLink, position, brightness, name, description, src }) => (
  <div>
    <a href={categoryLink} target='_blank'>
      <div className='ad-highlight'>
        <div className={['contentItem', position, brightness].join(' ')}>
          <div className='name'>{name}</div>
          <div className='description'>{description}</div>
          <button type='button'>shop now</button>
        </div>
        <img className='image image-fill' src={src} alt='' />
      </div>
    </a>
  </div>
)
export default Ad
