import React from 'react'
import './search.css'

// const render = ({ usePopover = false, ...others }) =>
// usePopover ? <PopOver {...others} /> : <Plain {...others} />
const render = () => (
  <div className='searchButtonComponent'>
    <a
      className='searchTrigger glyphicon glyphicon-search'
      href='#'
      data-original-title
    />
    <div className='searchPopover hide'>
      <form
        role='search'
        className='searchForm inPopover'
        action='blog/search.html'
        method='GET'
        target='_self'
      >
        <label htmlFor='search' className='sr-only'>
          Search Blogs...
        </label>
        <input
          className='form-control'
          type='text'
          name='term'
          placeholder='Search Blogs...'
        />
        <span className='hide' />
      </form>
    </div>
  </div>
)
const PopOver = ({
  hiddenInputs = [],
  url,
  method,
  target,
  placeholderText,
  urlParam = []
}) => (
  <div className='searchButtonComponent'>
    <a
      className='searchTrigger glyphicon glyphicon-search'
      href='#'
      title={placeholderText}
    />
    <div className='searchPopover hide'>
      <form
        role='search'
        className='searchForm inPopover'
        action={url}
        method={method}
        target={target}
      >
        <label for='search' className='sr-only'>
          {placeholderText}
        </label>
        <input
          className='form-control'
          type='text'
          name={urlParam}
          placeholder={placeholderText}
        />
        <span className='hide'>
          {hiddenInputs.map(({ name, value }) => (
            <input type='hidden' name={name} value={value} />
          ))}
        </span>
      </form>
    </div>
  </div>
)

const Plain = ({
  hiddenInputs = [],
  url,
  method,
  target,
  placeholderText,
  urlParam = []
}) => (
  <div className='searchButtonComponent'>
    <form
      role='search'
      className='searchForm'
      action={url}
      method={method}
      target={target}
    >
      <div className='input-group add-on'>
        <label htmlFor='search' className='sr-only'>
          {placeholderText}
        </label>
        <input
          className='form-control'
          type='text'
          name={urlParam}
          placeholder={placeholderText}
        />
        <div className='input-group-btn'>
          <button className='btn btn-default' type='submit'>
            <i className='glyphicon glyphicon-search' />
          </button>
        </div>
      </div>
      <span className='hide'>
        {hiddenInputs.map(({ name, value }) => (
          <input type='hidden' name={name} value={value} />
        ))}
      </span>
    </form>
  </div>
)

export default render
