import React from 'react'
import '../layout/Blog/Highlight/design.css'

const dateToMDY = date =>
  new Date(date.value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

const Blog = ({ data, name, description, id, updateddate }) => {
  const src =
    data['blog_image_ad'].link.href.replace('/items/', '/digital-assets/') +
    '/default'
  const alt = name
  const href = '#' + id
  const type = data['blog_category']
  const title = 'Blog'
  const date = dateToMDY(updateddate)

  return (
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
}
export default Blog
