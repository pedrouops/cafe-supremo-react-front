import React from 'react'
import '../layout/Ad/Highlight/design.css'

const Ad = ({ data,name, description }) => {
    const categoryLink =data['ad_commerceurl']
    const position=data['ad_textposition']
    const brightness=data['ad_textcolor']
    const src  = data['ad_image_banner'].link.href.replace('/items/', '/digital-assets/') + '/default'

    return (
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
}
export default Ad
