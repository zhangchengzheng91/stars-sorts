import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

function Home(props) {
  return (
    <div className='header'>
      <div>
        <Link to='/tags'>
          <Button type='primary'>
            管理我的标签
          </Button>
        </Link>
        <Link to='/initRepo'>
          <Button type='primary'>
            初始化 stars 列表
          </Button>
        </Link>
      </div>
      this is home page
    </div>
  )
}

export default Home
