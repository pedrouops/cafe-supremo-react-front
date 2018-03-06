import React from 'react'
import '../layout/Promo/Default/design.css'

const Promo = ({ id, href, contentId, name, description, src, alt }) => (
  <div>
    <a href={href}>
      <div className='promo-default'>
        <div className='contentItem Right Light' id={contentId}>
          <div className='name'>{name}</div>
          <div className='description'>{description}</div>
          <button type='button'>more</button>
        </div>

        <img
          className='image image-fill'
          id={contentId + '-image'}
          src={src}
          alt={alt}
        />
      </div>
    </a>
  </div>
)
export default Promo
