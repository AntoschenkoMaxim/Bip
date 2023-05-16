import { Button, Form, Input, Modal, Select, Upload, message } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useUpdatePostQuery } from '../../hooks/useUpdatePostQuery'
import { useGetPostsCategoriesQuery } from '../../hooks/useGetPostsCategoriesQuery'

export function UpdatePostForm({ id, setId, isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm()

  const [file, setFile] = useState(null)

  const props = {
    onRemove: () => {
      setFile(null)
    },
    beforeUpload: (file) => {
      setFile(file)
      return false
    },
  }

  const handleCancel = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const { data: postsCategories, isSuccess } = useGetPostsCategoriesQuery()

  const options = postsCategories?.rows.map((item) => ({
    value: item.id,
    label: item.description,
  }))

  const { mutate: updatePost } = useUpdatePostQuery()

  const getPostData = (values) => {
    const postData = new FormData()
    postData.append('id', id)
    postData.append('title', values.title)
    postData.append('description', values.description)
    postData.append('postsCategoryId', values.postsCategoryId)
    postData.append('image', file)
    return postData
  }

  const handleSubmit = (values) => {
    const post = getPostData(values)
    updatePost(post)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_post_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Обновить
    </Button>,
  ]

  return (
    <Modal
      title='Редактирование новости'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='update_post_form'
        form={form}
        validateMessages={validateMessages}
        onFinish={handleSubmit}
      >
        <Form.Item
          key='title'
          label='Заголовок'
          name='title'
          required
          rules={[{ required: true }]}
        >
          <Input placeholder='Новая новость' allowClear />
        </Form.Item>

        <Form.Item
          label='Описание'
          name='description'
          required
          rules={[{ required: true }]}
        >
          <Input.TextArea
            placeholder='Новость о наших успехах...'
            allowClear
            autoSize={{
              minRows: 3,
              maxRows: 7,
            }}
          />
        </Form.Item>
        <Form.Item
          label='Категория'
          name='postsCategoryId'
          required
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder='Искать'
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={isSuccess && options}
          />
        </Form.Item>
        <Form.Item
          name='image'
          label='Изображение'
          required
          rules={[{ required: true }]}
          valuePropName='file'
        >
          <Upload {...props} listType='picture' maxCount={1}>
            <Button icon={<UploadOutlined />}>Выберите изображение</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
