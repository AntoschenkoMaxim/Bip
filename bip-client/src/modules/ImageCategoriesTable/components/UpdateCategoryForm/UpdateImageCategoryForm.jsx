import { Button, Form, Input, Modal } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useUpdateImageCategoryByIdQuery } from '../../hooks/useUpdateImageCategoryByIdQuery'

export function UpdateImageCategoryForm({
  id,
  setId,
  isModalOpen,
  setIsModalOpen,
}) {
  const [form] = Form.useForm()

  const handleCancel = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const { mutate: updateCategory } = useUpdateImageCategoryByIdQuery()

  const getCategoryData = (values) => {
    const category = {
      id: id,
      value: values.value,
      description: values.description,
    }
    return category
  }

  const handleSubmit = (values) => {
    const category = getCategoryData(values)
    updateCategory(category)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_category_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Обновить
    </Button>,
  ]

  return (
    <Modal
      title='Редактирование категории'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='update_category_form'
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
      </Form>
    </Modal>
  )
}
