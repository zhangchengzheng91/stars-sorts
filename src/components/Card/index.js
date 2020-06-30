import React, { useState } from 'react'
import { formatUpdateTime } from '../../assets/utils'
import { Button, Modal, Select, message } from 'antd'
import axios from 'axios'
import './Card.css'

function Card(props) {
  const [ tagId, setTagId ] = useState('')
  const [ visible, setVisible ] = useState(false)
  const {
    full_name, description, id, language, stargazers_count, forks_count,
    pushed_at, html_url, tags
  } = props

  const handleOk = async () => {
    const { successful, data } = await axios.post('/api/repo/addTag', {
      tagId,
      repoId: id
    })
    if (successful === '1') {
      message.success('success')
      setVisible(false)
      return
    }
    console.log('data=', data)
    message.error(JSON.stringify({
      result: 'failed',
      data
    }))
  }

  const handleCancel = () => {
    setVisible(false)
  }

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
      <div>
        <Button type='primary' onClick={() => setVisible(true)}>add tag</Button>
      </div>
      <Modal
        title="Add Tag"
        visible={visible}
        closable={true}
        onOk={handleOk}
        onCancel={handleCancel}
        width=""
        maskClosable={false}
        confirmLoading={false}
        wrapClassName=""
        destroyOnClose={true}
      >
        {
          <Select onChange={tagId => setTagId(tagId)}>
            {
              (tags.tags || []).map(tag => {
                const { id, name } = tag
                return (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                )
                }
              )
            }
          </Select>
        }
      </Modal>
    </div>
  )
}

export default Card
