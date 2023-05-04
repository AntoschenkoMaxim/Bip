import { Button, Form, Input, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useMutation, useQueryClient } from 'react-query'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { updatePostById } from '../../api/updatePostRequest'

export function UpdatePostForm({ id, handleOk }) {
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

  const client = useQueryClient()

  const { mutate: updatePost } = useMutation({
    mutationFn: updatePostById,
    onSuccess: () => {
      client.invalidateQueries(['posts'])
    },
  })

  const getPostData = (values) => {
    const postData = new FormData()
    postData.append('id', id)
    postData.append('title', values.title)
    postData.append('description', values.description)
    postData.append('image', file)
    return postData
  }

  const handleSubmit = (values) => {
    const post = getPostData(values)
    updatePost(post)
    form.resetFields()
    handleOk()
  }

  return (
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
        name='image'
        label='Изображение'
        required
        rules={[{ required: true }]}
      >
        <Upload {...props} listType='picture' maxCount={1}>
          <Button icon={<UploadOutlined />}>Выберите изображение</Button>
        </Upload>
      </Form.Item>
    </Form>
  )
}
