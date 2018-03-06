import React from 'react'
import '../layout/Blog/Highlight/design.css'



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

export default Blog
