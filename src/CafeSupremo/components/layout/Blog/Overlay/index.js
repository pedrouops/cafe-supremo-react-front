import './design.css'

const ContentLayout = () => (
  <a href={scsData.detailPageLink}>
    <div className='blog-overlay'>
      <div className='button-wrapper'>
        <div className='button'>{data.blog_category}</div>
      </div>

      <img className='image' src={imageAdSmallURL} />
      <div className='contentItem'>
        <div className='date'>{formattedDate}</div>
        <div className='name'>{name}</div>
        <div className='description'>{description}</div>
      </div>
    </div>
  </a>
)
