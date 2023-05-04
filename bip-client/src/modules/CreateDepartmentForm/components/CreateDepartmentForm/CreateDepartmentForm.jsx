import { Form, Input, message } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { formItems } from '../../constants/formItems'
import { useMutation, useQueryClient } from 'react-query'
import { createDepartment } from '../../api/createDepartmentRequest'

export function CreateDepartmentForm({ handleOk }) {
  const [form] = Form.useForm()

  const client = useQueryClient()

  const { mutate: create } = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      client.invalidateQueries(['departments'])
      message.success('Кафедра добавлена!')
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
      name='create_department_form'
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
