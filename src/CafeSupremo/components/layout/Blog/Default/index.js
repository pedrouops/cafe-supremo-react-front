import './design.css'

const ContentLayout = () => (
  <a href={scsData.detailPageLink}>
    <div className='blog-default'>
      <div className='button-wrapper'>
        <div className='button'>{data.blog_category}</div>
      </div>

      <img className='image' src={imageHeaderURL} />
      <div className='contentItem'>
        <div className='name'>{name}</div>
        <div className='date'>{formattedDate}</div>
      </div>
    </div>
  </a>
)
