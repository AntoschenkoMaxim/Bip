import { Form, Input, message } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { validateMessages } from '../../../../constants/validateMessages'
import { updateCategoryById } from '../../api/updateCategoryRequest'

export function UpdateCategoryForm({ id, handleOk }) {
  const [form] = Form.useForm()

  const client = useQueryClient()

  const { mutate: updateCategory } = useMutation({
    mutationFn: updateCategoryById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['categories'] })
      message.success('Категория обновлена!')
    },
  })

  const getCategoryData = (values) => {
    const category = {
      id: id,
      value: values.value,
      description: values.description,
    }
    return category
  }

  const handleSubmit = (values) => {
    const category = getCategoryData(values)
    updateCategory(category)
    form.resetFields()
    handleOk()
  }

  return (
    <Form
      layout='vertical'
      name='update_category_form'
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
