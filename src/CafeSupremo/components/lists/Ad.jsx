import React from 'react'

const commerceLinks = [
  {
    categoryLink:
      'https://ccstore-z5ga.oracleoutsourcing.com/coffee-pods/category/2468',
    contentId: 'Ad_core_6d9baffc-9010-4b46-a927-1804785c72c4',
    name: 'A LITTLE PARTY IN EVERY POD',
    description: 'Try something special, with that special someone',
    brightness: 'Dark',
    src:
      'https://www.mycontentdemo.com/content/published/api/v1/digital-assets/DigitalAsset_proxy_24ca1644-fbe3-45db-a69f-7278b5c82aca/default'
  },
  {
    categoryLink:
      'https://ccstore-z5ga.oracleoutsourcing.com/aroma-beans/product/1234',
    contentId: 'Ad_core_1ad5aaf6-a3de-40ee-b604-f0d9467679d7',
    name: 'LOVE AT FIRST ROAST',
    description:
      'Get this months imports from around the globe in all of your favorite flavors',
    brightness: 'Light',
    src:
      'https://www.mycontentdemo.com/content/published/api/v1/digital-assets/DigitalAsset_proxy_752f96f0-c3f5-4bea-a01a-2f0a8b5e2063/default'
  },
  {
    categoryLink:
      'https://ccstore-z5ga.oracleoutsourcing.com/oracle-mug/product/Mug123',
    contentId: 'Ad_core_5745fa53-5790-428a-ad17-30d9f13f4d85',
    name: 'NOW, ALL YOU NEED IS THE SPOON',
    description: 'Cups, spoons and any other accessories you need',
    brightness: 'Dark',
    src:
      'https://www.mycontentdemo.com/content/published/api/v1/digital-assets/DigitalAsset_proxy_c8d7c231-f9dc-4a44-834f-86f8527c5677/default'
  }
]

const Component = () => {
  const list = commerceLinks
  return (
    <div className={'scs-component-container scs-sectionlayout'}>
      <div className='scs-container-styles'>
        <div className='scs-component-content'>
          {list.map((e, index) => (
            <ComponentContainer
              key={index}
              {...e}
              Layout={CommerceLink}
              position={index % 2 === 0 ? 'Left' : 'Right'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const noMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0
}

const ComponentContainer = ({ Layout, ...other }) => (
  <div className='scs-component-bounding-box'>
    <div
      className='scs-custom-component scs-component scs-component-default-style'
      style={noMargin}
    >
      <div className='scs-component-content' style={{ width: '100%' }}>
        <div className='scs-custom-component-wrapper'>
          <Layout {...other} />
        </div>
      </div>
      <div />
    </div>
    <div className='scs-hidden' />
  </div>
)
const CommerceLink = ({
  categoryLink,
  position,
  brightness,
  name,
  description,
  contentId,
  src
}) => (
  <div>
    <a href={categoryLink} target='_blank'>
      <div className='ad-highlight'>
        <div
          className={['contentItem', position, brightness].join(' ')}
          id={contentId + '-contentItem'}
        >
          <div className='name'>{name}</div>
          <div className='description'>{description}</div>
          <button type='button'>shop now</button>
        </div>
        <img
          className='image image-fill'
          id={contentId + '-image'}
          src={src}
          alt=''
        />
      </div>
    </a>
  </div>
)
export default Component
