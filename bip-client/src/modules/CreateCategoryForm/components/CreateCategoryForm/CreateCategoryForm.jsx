import { Form, Input } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { formItems } from '../../constants/formItems'
import { useMutation, useQueryClient } from 'react-query'
import { createCategory } from '../../api/createCategoryRequest'

export function CreateCategoryForm({ handleOk }) {
  const [form] = Form.useForm()

  const client = useQueryClient()

  const { mutate: create } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      client.invalidateQueries(['categories'])
    },
  })

  const handleSubmit = (values) => {
    create(values)
    form.resetFields()
    handleOk()
  }

  return (
    <Form
      layout='vertical'
      name='create_category_form'
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
    </Form>
  )
}
