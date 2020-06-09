import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Table, Button, Modal } from 'antd'
import axios from 'axios'
import TagModal from './TagModal'

function Tags(props) {
  const [ modal, setModal ] = useState({
    visible: false,
  })
  const [ tags, setTags ] = useState({
    loading: false,
    dataSource: []
  })

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
          dataSource: data,
        }
      })
    }
  }

  const editTag = record => {
    setModal({
      isEdit: true,
      visible: true,
      info: record,
    })
  }

  const deleteTag = record => {
    const { id } = record
    return Modal.confirm({
      content: '删除此标签，将同是移除包含项目中的标签',
      onOk: async () => {
        const { successful } = await axios.delete(`/api/tag/${id}`)
        if (successful === '1') {
          getTags()
        }
      },
    })
  }

  const openModal = () => {
    setModal({
      visible: true
    })
  }

  const columns = [
    {
      key: 'id',
      title: '序号',
      render: (key, record, index) => index + 1
    }, {
      title: '名称',
      dataIndex: 'name'
    }, {
      title: '描述',
      dataIndex: 'description'
    }, {
      key: 'handle',
      title: '操作',
      render: (text, record) => {
        return (
          <React.Fragment>
            <Button
              onClick={() => editTag(record)}
              type='primary'
            >
              编辑
            </Button>
            <Button
              type='danger'
              onClick={() => deleteTag(record)}
            >
              删除
            </Button>
          </React.Fragment>
        )
      }
    }
  ]

  return (
    <div>
      <div>
        <Link to='/'>
          <ArrowLeftOutlined/>
        </Link>
        <Button type='primary' onClick={openModal}>
          创建标签
        </Button>
        <Button type='primary' onClick={getTags}>
          刷新
        </Button>
      </div>
      <div>
        <Table
          columns={columns}
          rowKey={record => record.id}
          {...tags}
        />
      </div>
      <TagModal
        {...modal}
        setModal={setModal}
        success={getTags}
      />
    </div>
  )
}

export default Tags
