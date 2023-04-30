import { Button, Form, Input, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { formItems } from '../../constants/formItems'
import { useMutation, useQueryClient } from 'react-query'
import { createPost } from '../../api/createPostRequest'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'

export function CreatePostForm({ handleOk }) {
  const [form] = Form.useForm()

  const [file, setFile] = useState()

  const props = {
    onRemove: () => {
      setFile()
    },
    beforeUpload: (file) => {
      setFile(file)
      return false
    },
  }

  const client = useQueryClient()

  const { mutate: create } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      client.invalidateQueries(['posts'])
    },
  })

  const getFormData = (values) => {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('image', file)
    return formData
  }

  const handleSubmit = (values) => {
    const formData = getFormData(values)
    create(formData)
    form.resetFields()
    handleOk()
  }

  return (
    <Form
      layout='vertical'
      name='create_post_form'
      form={form}
      validateMessages={validateMessages}
      onFinish={handleSubmit}
    >
      {formItems.map((item) => (
        <Form.Item
          key={item.name}
          label={item.label}
          name={item.name}
          required
          rules={[{ required: true }]}
        >
          <Input placeholder={item.placeholder} allowClear />
        </Form.Item>
      ))}
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
