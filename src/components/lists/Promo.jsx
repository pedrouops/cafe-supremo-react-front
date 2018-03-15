import React from 'react'
import '../layout/Promo/Default/design.css'

const Promo = ({ id, name, description, data }) => {
  const href = '#' + id
  const alt = name
  const src =
    data['promo_image_banner'].link.href.replace(
      '/items/',
      '/digital-assets/'
    ) + '/default'
  return (
    <div>
      <a href={href}>
        <div className='promo-default'>
          <div className='contentItem Right Light'>
            <div className='name'>{name}</div>
            <div className='description'>{description}</div>
            <button type='button'>more</button>
          </div>

          <img className='image image-fill' src={src} alt={alt} />
        </div>
      </a>
    </div>
  )
}
export default Promo
