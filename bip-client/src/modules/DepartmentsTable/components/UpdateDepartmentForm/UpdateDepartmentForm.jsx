import { Form, Input, message } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { validateMessages } from '../../../../constants/validateMessages'
import { updateDepartmentById } from '../../api/updateDepartmentRequest'

export function UpdateDepartmentForm({ id, handleOk }) {
  const [form] = Form.useForm()

  const client = useQueryClient()

  const { mutate: updateDepartment } = useMutation({
    mutationFn: updateDepartmentById,
    onSuccess: () => {
      client.invalidateQueries(['departments'])
      message.success('Кафедра обновлена!')
    },
  })

  const getDepartmentData = (values) => {
    const department = {
      id: id,
      value: values.value,
      description: values.description,
    }
    return department
  }

  const handleSubmit = (values) => {
    const department = getDepartmentData(values)
    updateDepartment(department)
    form.resetFields()
    handleOk()
  }

  return (
    <Form
      layout='vertical'
      name='update_department_form'
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
        <Input placeholder='math' allowClear />
      </Form.Item>

      <Form.Item
        label='Описание'
        name='description'
        required
        rules={[{ required: true }]}
      >
        <Input placeholder='Кафедра математики' allowClear />
      </Form.Item>
    </Form>
  )
}
