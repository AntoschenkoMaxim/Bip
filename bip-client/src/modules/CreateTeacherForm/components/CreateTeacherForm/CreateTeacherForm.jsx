import { Form, Input, Select, message } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { formItems } from '../../constants/formItems'
import { useMutation, useQueryClient } from 'react-query'
import { createTeacher } from '../../api/createTeacherRequest'
import { options } from '../../constants/options'

export function CreateTeacherForm({ handleOk }) {
  const [form] = Form.useForm()

  const client = useQueryClient()

  const { mutate: create } = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      client.invalidateQueries(['teachers'])
      message.success('Преподаватель добавлен!')
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
      name='create_teacher_form'
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
        label='Должность'
        name='role'
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
          options={options}
        />
      </Form.Item>
    </Form>
  )
}
