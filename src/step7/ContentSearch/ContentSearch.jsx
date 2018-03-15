import React from 'react'
import './contentSearch.css'

class ContentSearch extends React.Component {
  constructor (props) {
    // allows you to access this.props in the constructor method
    super(props)

    // copy here
  }

  createMarkup (tmp) {
    return { __html: tmp }
  }

  render () {
    return (
      <div className='search-container'>
        <div className='search-row'>
          <div className='search-col-4'>
            <div className='search-card'>
              <div className='search-card-body'>
                <div className='search-card-title'>
                  <div className='search-card-header'>
                    /* input field here */
                  </div>
                </div>

                <div className='search-messages'>
                  /* output message responses and content items */
                </div>
              </div>
              <div className='chat-card-footer'>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContentSearch
