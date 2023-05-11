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

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select defaultValue='375' style={{ width: 80 }}>
        <Option value='375'>+375</Option>
        <Option value='80'>80</Option>
      </Select>
    </Form.Item>
  )

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
        label='Номер телефона'
        name='phone'
        required
        rules={[
          { required: true },
          {
            pattern: /^(29|25|44|33)(\d{3})(\d{2})(\d{2})$/,
            message: 'Не соответствует формату!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          placeholder='295553535'
          allowClear
        />
      </Form.Item>
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
