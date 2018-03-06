import React from 'react'
import './design.css'

const ContentLayout = () => (
  <div className='blog-author'>
    <img className='image' src={imageAvatarURL} />
    <div className='contentItem'>
      <div className='name'>{author.name}</div>
      <div className='date'>{author.description}</div>
      <a href={author.detailPageLink}>More from this Writer ></a>
    </div>
  </div>
)
