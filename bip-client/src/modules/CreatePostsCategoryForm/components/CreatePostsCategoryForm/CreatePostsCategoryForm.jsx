import { Form, Input, message } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useMutation, useQueryClient } from 'react-query'
import { createPostsCategory } from '../../api/createPostsCategoryRequest'
import { useCreatePostsCategoryQuery } from '../../hooks/useCreatePostsCategoryQuery'

export function CreatePostsCategoryForm({ handleOk }) {
  const [form] = Form.useForm()

  const { mutate: createCategory } = useCreatePostsCategoryQuery()

  const handleSubmit = (values) => {
    createCategory(values)
    form.resetFields()
    handleOk()
  }

  return (
    <Form
      layout='vertical'
      name='create_posts_category_form'
      form={form}
      validateMessages={validateMessages}
      onFinish={handleSubmit}
    >
      <Form.Item
        label='Значение'
        name='value'
        required
        rules={[{ required: true }]}
      >
        <Input placeholder='new' allowClear />
      </Form.Item>

      <Form.Item
        label='Описание'
        name='description'
        required
        rules={[{ required: true }]}
      >
        <Input placeholder='Новые' allowClear />
      </Form.Item>
    </Form>
  )
}
