import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import axios from 'axios'

function TagModal(props) {
  const [ confirmLoading, setConfirmLoading ] = useState(false)
  const { visible, info, setModal, success, isEdit } = props
  const [ form ] = Form.useForm()

  useEffect(() => {
    if (info) {
      const { name, description } = info
      form.setFieldsValue({
        name,
        description,
      })
    }
  }, [info])

  const handleOk = async () => {
    setConfirmLoading(true)
    form.validateFields().then(async values => {
      const callback = () => {
        setConfirmLoading(false)
        setModal({ visible: false })
        success()
      }
      if (isEdit) {
        editTag(values, callback)
        return
      }
      addTag(values, callback)
    }).catch(e => {
      setConfirmLoading(false)
    })
  }

  const editTag = async (values, callback) => {
    const { successful } = await axios.put(`/api/tag/${info.id}`, { ...values })
    setConfirmLoading(false)
    if (successful === '1') {
      callback && callback()
    }
  }

  const addTag = async (values, callback) => {
    const { successful } = await axios.post('/api/tag/add', { ...values })
    setConfirmLoading(false)
    if (successful === '1') {
      callback && callback()
    }
  }

  const handleCancel = () => {
    setModal({ visible: false })
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  return (
    <Modal
      title="标签"
      visible={visible}
      closable={true}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      confirmLoading={confirmLoading}
      wrapClassName=""
      destroyOnClose
    >
      <Form {...layout} form={form}>
        <Form.Item name="name" label="名称" rules={[{ required: true, message: '名字不能为空' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TagModal
