import { Button, Form, Input, Modal, Select } from 'antd'
import { formItems } from '../../constants/formItems'
import { validateMessages } from '../../../../constants/validateMessages'
import { useGetAllTeachersQuery } from '../../../../hooks/useGetAllTeachersQuery'
import { useCreateLessonQuery } from '../../hooks/useCreateLessonQuery'

export function CreateLessonForm({ isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm()

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const { data: teachers, isSuccess } = useGetAllTeachersQuery()

  const options = teachers?.rows.map((item) => ({
    value: item.id,
    label: `${item.firstName} ${item.surname} ${item.lastName} (${item.role})`,
  }))

  const { mutate: createLesson } = useCreateLessonQuery()

  const handleSubmit = (values) => {
    createLesson(values)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='create_lesson_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <Modal
      title='Создание предмета'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='create_lesson_form'
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
          label='Преподаватель'
          name='teacherId'
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
      </Form>
    </Modal>
  )
}
