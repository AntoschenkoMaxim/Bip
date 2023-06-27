import { Button, Form, Input, Modal, Select } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useGetAllTeachersQuery } from '../../../../hooks/useGetAllTeachersQuery'

export function LessonForm({
  key,
  id,
  setSelectedRecord,
  isModalOpen,
  setIsModalOpen,
  title,
  btnTitle,
  initialData,
  onSubmit,
}) {
  const [form] = Form.useForm()

  const handleCancel = () => {
    setSelectedRecord(null)
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setSelectedRecord(null)
    setIsModalOpen(false)
  }

  const { data: teachers, isSuccess } = useGetAllTeachersQuery()

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

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    const lesson = getLessonData(values)
    onSubmit(lesson)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button form='lesson_form' key='submit' type='primary' htmlType='submit'>
      {btnTitle}
    </Button>,
  ]

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='lesson_form'
        form={form}
        validateMessages={validateMessages}
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Значение'
          name='value'
          required
          rules={[{ required: true }]}
          initialValue={initialData?.value}
        >
          <Input placeholder='new' allowClear />
        </Form.Item>

        <Form.Item
          label='Описание'
          name='description'
          required
          rules={[{ required: true }]}
          initialValue={initialData?.description}
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
