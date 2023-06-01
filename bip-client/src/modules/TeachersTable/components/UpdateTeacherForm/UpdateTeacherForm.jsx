import { Button, Form, Input, Modal, Select } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { options } from '../../constants/options'
import { useUpdateTeacherByIdQuery } from '../../hooks/useUpdateTeacherByIdQuery'

export function UpdateTeacherForm({ id, setId, isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm()

  const handleCancel = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const { mutate: updateTeacher } = useUpdateTeacherByIdQuery()

  const getTeacherData = (values) => {
    const teacher = {
      id: id,
      firstName: values.firstName,
      lastName: values.lastName,
      surname: values.surname,
      phone: values.phone,
      email: values.email,
      telegram: values.telegram,
      role: values.role,
    }
    return teacher
  }

  const handleSubmit = (values) => {
    const teacher = getTeacherData(values)
    updateTeacher(teacher)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_teacher_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Обновить
    </Button>,
  ]

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

  return (
    <Modal
      title='Редактирование преподавателя'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='update_teacher_form'
        form={form}
        validateMessages={validateMessages}
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Фамилия'
          name='lastName'
          required
          rules={[{ required: true }]}
        >
          <Input placeholder='Дмитриенко' allowClear />
        </Form.Item>

        <Form.Item
          label='Имя'
          name='firstName'
          required
          rules={[{ required: true }]}
        >
          <Input placeholder='Дмитрий' allowClear />
        </Form.Item>

        <Form.Item
          label='Отчество'
          name='surname'
          required
          rules={[{ required: true }]}
        >
          <Input placeholder='Дмитриевич' allowClear />
        </Form.Item>

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
