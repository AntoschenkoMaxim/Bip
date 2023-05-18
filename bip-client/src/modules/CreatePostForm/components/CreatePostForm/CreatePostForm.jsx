import { Button, Form, Input, Select, Upload, message } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createPost } from '../../api/createPostRequest'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { getAllPostsCategories } from '../../api/getPostsCategoriesRequest'

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

  const { data: postsCategories, isSuccess } = useQuery({
    queryFn: () => getAllPostsCategories(),
    queryKey: ['posts-categories'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  const options = postsCategories?.rows.map((item) => ({
    value: item.id,
    label: item.description,
  }))

  const client = useQueryClient()

  const { mutate: create } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      client.invalidateQueries(['posts'])
      message.success('Новость добавлена!')
    },
  })

  const getFormData = (values) => {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('postsCategoryId', values.postsCategoryId)
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
      <Form.Item
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
      >
        <Upload {...props} listType='picture' maxCount={1}>
          <Button icon={<UploadOutlined />}>Выберите изображение</Button>
        </Upload>
      </Form.Item>
    </Form>
  )
}
