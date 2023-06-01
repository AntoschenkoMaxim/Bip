import { Button, Form, Input, Modal, Select } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { formItems } from '../../constants/formItems'
import { options } from '../../constants/options'
import { useCreateTeacherQuery } from '../../hooks/useCreateTeacherQuery'

export function CreateTeacherForm({ isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm()

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const { mutate: createTeacher } = useCreateTeacherQuery()

  const handleSubmit = (values) => {
    createTeacher(values)
    form.resetFields()
    handleOk()
  }

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select
        style={{ width: 80 }}
        options={[
          { value: '375', label: '375' },
          { value: '80', label: '80' },
        ]}
      />
    </Form.Item>
  )

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='create_teacher_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <Modal
      title='Создание преподавателя'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
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
          label='Email'
          name='email'
          required
          rules={[{ required: true, type: 'email' }]}
        >
          <Input placeholder='bip@gmail.com' allowClear />
        </Form.Item>
        <Form.Item
          label='Телеграм'
          name='telegram'
          required
          rules={[{ required: true }]}
        >
          <Input placeholder='@teacher' allowClear />
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
    </Modal>
  )
}
