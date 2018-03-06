export default () => {
  // Get formatted date
  const formattedDate = dateToMDY(content.updateddate)

  // Get blog image
  const imageAdURL = contentClient.getRenditionURL({
    itemGUID:
      data.blog_image_ad instanceof Object
        ? data.blog_image_ad.id
        : data.blog_image_ad,
    contentType: contentType,
    secureContent: secureContent
  })

  function dateToMDY (date) {
    var dateObj = new Date(date.value)
    var options = { year: 'numeric', month: 'long', day: 'numeric' }
    var formattedDate = dateObj.toLocaleDateString('en-US', options)
    return formattedDate
  }

  return (
    <a href={scsData.detailPageLink}>
      <div className='blog-highlight'>
        <div className='contentItemWrapper'>
          <button type='button'>{data.blog_category}</button>
          <div className='contentItem'>
            <div className='titleWrapper'>
              <span className='title'>{type} / </span>
              <span className='date'>{formattedDate}</span>
            </div>
            <div className='name'>{name}</div>
            <div className='description'>{description}</div>
          </div>
        </div>
        <img className='image' id={id + '-imageAd'} src={imageAdURL} alt='' />
      </div>
    </a>
  )
}
