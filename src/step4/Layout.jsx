import React, { Component } from 'react'

import content from './content.json'

const allItems = content.ALL.data.items

const items = allItems.filter(item => item.type === 'Blog')

const fullItem = item => content[item.id].data

const toHref = link =>
  link.href.replace('/items/', '/digital-assets/') + '/default'

const fields = [
  'blog_category',
  'blog_textposition',
  'blog_textcolor',
  'blog_content',
  'blog_image_ad',
  'blog_image_thumbnail',
  'blog_image_header',
  'blog_image_ad_small',
  'blog_author'
]

export default class Layout extends Component {
  render () {
    return (
      <div>
        <h1>Hello Content</h1>
        {items
          .map(fullItem)
          .map((item, index) => <Blog key={index} item={item} />)}
      </div>
    )
  }
}

const Blog = ({ item }) => {
  const { data } = item
  const {
    blog_category,
    blog_textposition,
    blog_textcolor,
    blog_content,
    blog_image_ad,
    blog_image_thumbnail,
    blog_image_header,
    blog_image_ad_small,
    blog_author
  } = data
  const content = { __html: blog_content } // to be used with dangerouslySetInnerHTML
  const image = toHref(blog_image_thumbnail.link)

  return (
    <div>
      <div>
        <strong>{item.name}</strong>: {data.blog_category}
      </div>
      <div>
		<img src={image}/> 
      </div>
      <div dangerouslySetInnerHTML={content}></div>
    </div>
  )
}
