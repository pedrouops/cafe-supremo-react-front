import './design.css'

const ContentLayout = () => (
  <div className='blog-details'>
    <div className='document-wrapper'>
      <div className='document'>
        <div className='button-wrapper'>
          <div className='button'>{data.blog_category}</div>
        </div>
        <div className='contentItem'>
          <div className='date'>{formattedDate}</div>
          <div className='name'>{name}</div>
          <div className='description'>{description}</div>
          <div className='content'>{data.blog_content}</div>
        </div>
      </div>
    </div>
  </div>
)
