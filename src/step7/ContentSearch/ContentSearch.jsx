import React from 'react'
import './contentSearch.css'
import BotService from './BotService'

class ContentSearch extends React.Component {
  constructor (props) {
    // allows you to access this.props in the constructor method
    super(props)

    this.state = {
	count: 0,
	message: '',
	messages: []
	}
	let count = 0
	const addMessage = data => {
	  console.log('received content - ' + JSON.stringify(data))
	  this.setState({
		messages: [...this.state.messages, data]
	  })
	}
	this.botService = new BotService(addMessage)

	this.sendMessage = ev => {
	  ev.preventDefault()
	  this.botService.sendToBot(this.state.message)
	  addMessage(this.state.message)
	  // set this back to null so it resets the text input
	  this.setState({ message: '' })
	  count = count + 1
	}
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
                    <form onSubmit={this.sendMessage}>
					  <input
						type='text'
						placeholder='Content to search for eg. What do you have on Coffee'
						className='search-content-input'
						value={this.state.message}
						onChange={ev =>
						  this.setState({ message: ev.target.value })
						}
					  />
					</form>
                  </div>
                </div>

                <div className='search-messages'>
				  {this.state.messages.map((message, index) => {
					if (index % 2 === 0) {
					  return (
						<div className='bubble-left' key={index}>
						  You searched for "{message}"
						</div>
					  )
					} else {
					  let response = this.state.messages[index]

					  if (typeof response === 'string') {
						return (
						  <div className='search-response-error' key={index}>
							{' '}
							{message}{' '}
						  </div>
						)
					  } else {
						return (
						  <div className='search-response' key={index}>
							{message.map((contentItem, i) => (
							  <div key={i} className='search-item'>
								<img
								  alt='contentImage'
								  className='search-image'
								  src={contentItem.image}
								/>
								<div className='search-blog-title'>
								  {' '}
								  {contentItem.name} - {contentItem.description}{' '}
								</div>
								<div
								  className='search-blog-body'
								  dangerouslySetInnerHTML={this.createMarkup(
									contentItem.body
								  )}
								/>
								<br />
								<br />
								<br />
							  </div>
							))}
						  </div>
						)
					  }
					}
				  })}
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
