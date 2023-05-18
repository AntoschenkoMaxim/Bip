import { Button, Form, Input, Modal, Select } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useUpdateLessonByIdQuery } from '../../hooks/useUpdateLessonByIdQuery'
import { useGetAllTeachersQuery } from '../../../../hooks/useGetAllTeachersQuery'

export function UpdateLessonForm({ id, setId, isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm()

  const { mutate: updateLesson } = useUpdateLessonByIdQuery()

  const { data: teachers, isSuccess } = useGetAllTeachersQuery()

  const handleCancel = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const options = teachers?.rows.map((item) => ({
    value: item.id,
    label: `${item.firstName} ${item.surname} ${item.lastName} (${item.role})`,
  }))

  const getLessonData = (values) => {
    const lesson = {
      id: id,
      value: values.value,
      description: values.description,
      teacherId: values.teacherId,
    }
    return lesson
  }

  const handleSubmit = (values) => {
    const lesson = getLessonData(values)
    updateLesson(lesson)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_lesson_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Обновить
    </Button>,
  ]

  return (
    <Modal
      title='Редактирование предмета'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='update_lesson_form'
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
