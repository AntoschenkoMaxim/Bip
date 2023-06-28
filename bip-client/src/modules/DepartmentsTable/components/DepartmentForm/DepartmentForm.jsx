import { Button, Form, Input, Modal } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'

export function DepartmentForm({
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

  const getDepartmentData = (values) => {
    const department = {
      id: id,
      value: values.value,
      description: values.description,
    }
    return department
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    const department = getDepartmentData(values)
    onSubmit(department)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form={initialData ? 'update_form' : 'create_form'}
      key='submit'
      type='primary'
      htmlType='submit'
    >
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
        name={initialData ? 'update_form' : 'create_form'}
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
          <Input placeholder='math' allowClear />
        </Form.Item>

        <Form.Item
          label='Описание'
          name='description'
          required
          rules={[{ required: true }]}
          initialValue={initialData?.description}
        >
          <Input placeholder='Кафедра математики' allowClear />
        </Form.Item>
      </Form>
    </Modal>
  )
}
