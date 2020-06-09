import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { getUsersStaredApi } from '../../apis/github'
import Card from '../../components/Card'

function InitRepo(props) {
  const [ form ] = Form.useForm()
  const [ stars, setStars ] = useState([])

  const initRepo = () => {
    form.validateFields().then(values => {
      getUsersStaredApi(values.username).then(res => {
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
              <Card {...star} key={star.id}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default InitRepo
