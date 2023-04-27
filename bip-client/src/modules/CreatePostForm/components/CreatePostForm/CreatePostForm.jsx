import { Button, Form, Input, Upload, message } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { formItems } from '../../constants/formItems'
import { useMutation, useQueryClient } from 'react-query'
import { createPost } from '../../api/createPostRequest'
import { UploadOutlined } from '@ant-design/icons'
import { BASE_URL } from '../../constants/baseUrl'
import { useState } from 'react'

export function CreatePostForm({ handleOk }) {
  const [form] = Form.useForm()

  const normFile = (e) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const client = useQueryClient()

  const { mutate: create } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      client.invalidateQueries(['posts'])
    },
  })

  const handleSubmit = (values) => {
    console.log(values)
    create(values)
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
      {/* <Form.Item
        // name='image'
        // label='Изображение'
        valuePropName='fileList'
        getValueFromEvent={normFile}
      >
        <Upload name='logo' listType='picture'>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item> */}
    </Form>
  )
}
