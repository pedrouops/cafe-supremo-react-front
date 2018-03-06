import './design.css'

const ContentLayout = () => (
  <a href={scsData.detailPageLink}>
    <div className='blog-headline'>
      <div className='contentItem {data.blog_textposition} {{data.blog_textcolor} id={{id}}-contentItem'>
        <div className='button-wrapper'>
          <div className='button'>{data.blog_category}</div>
        </div>
        <div className='date'>{formattedDate}</div>
        <div className='name'>{name}</div>
        <div className='description'>{description}</div>
      </div>

      <img className='image' src={imageURL} alt='' />
    </div>
  </a>
)
