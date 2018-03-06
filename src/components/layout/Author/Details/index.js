import React from 'react'
import './design.css'

const ContentLayout = () => (
  <div className='author-details'>
    <div className='document'>
      <img className='image' src={imageAvatarURL} />
      <div className='title'>
        <div className='name'>{name}</div>
        <div className='description'>{description}</div>
      </div>
      <div className='contentItem'>
        <div className='bio'>{data.author_bio}</div>
      </div>
    </div>
  </div>
)
