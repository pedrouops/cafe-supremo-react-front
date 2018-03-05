import React from 'react'

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


const Blog = () => (
    <BlogEntry {...blog} />
    )

const BlogEntry = (props) => (
    <a href={props.href}>
      <div className='blog-highlight'>
        <div className='contentItemWrapper'>
          <button type='button'>{props.type}</button>
          <div
            className='contentItem'
            id='Blog_core_d18f5d5e-3e94-454b-bd38-aaadcac5a75a-contentItem'
          >
            <div className='titleWrapper'>
              <span className='title'>{props.title} / </span>
              <span className='date'>{props.date}</span>
            </div>
            <div className='name'>{props.name}</div>
            <div className='description'>{props.description}</div>
          </div>
        </div>
        <img
          className='image'
          id={props.contentId + '-imageAd'}
          src={props.src}
          alt={props.alt}
        />
      </div>
    </a>
)

export default Blog