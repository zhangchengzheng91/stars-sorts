import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { getUsersStaredApi } from '../../apis/github'
import Card from '../../components/Card'
import axios from 'axios'

function InitRepo(props) {
  const [ form ] = Form.useForm()
  const [ stars, setStars ] = useState([])
  const [ tags, setTags ] = useState({})

  useEffect(() => {
    getTags()
  }, [])

  const getTags = async () => {
    setTags(preTags => ({
      ...preTags,
      loading: true,
    }))
    const { successful, data } = await axios.get('/api/tag/getall')
    setTags(preTags => ({
      ...preTags,
      loading: false,
    }))
    if (successful === '1') {
      setTags(preTags => {
        return {
          ...preTags,
          tags: data,
        }
      })
    }
  }

  const initRepo = () => {
    getUsersStaredApi('zhangchengzheng91').then(res => {
      if (Array.isArray(res)) {
        setStars(res)
      }
    })
    return
    form.validateFields().then(values => {
      getUsersStaredApi(values.username = 'zhangchengzheng91').then(res => {
        if (Array.isArray(res)) {
          setStars(res)
        }
      })
    }).catch(e => e)
  }

  return (
    <div>
      <Form form={form}>
        <Form.Item
          name='username'
          label='用户名称'
          rules={[{ required: true, message: '用户名称不能为空' }]}
        >
          <Input/>
        </Form.Item>
      </Form>
      <Button onClick={initRepo}>获取 stars 列表</Button>
      <div>
        {
          stars.map(star => {
            return (
              <Card {...star} key={star.id} tags={tags}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default InitRepo
