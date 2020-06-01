import React from 'react'
import { formatUpdateTime } from '../../assets/utils'
import './Card.css'

function Card(props) {
  const {
    full_name, description, id, language, stargazers_count, forks_count,
    pushed_at, html_url
  } = props
  return (
    <div id='card' key={id}>
      <div>
        <a href={html_url} className='full_name_link' target='_blank'>
          {full_name}
        </a>
      </div>
      <div className='description'>
        {description}
      </div>
      <div className='other'>
        <div className='language'>{language}</div>
        <div className='stargazers_count'>{stargazers_count}</div>
        <div className="forks_count">{forks_count}</div>
        <div className="updated_at">Updated {formatUpdateTime(pushed_at)}</div>
      </div>
    </div>
  )
}

export default Card
