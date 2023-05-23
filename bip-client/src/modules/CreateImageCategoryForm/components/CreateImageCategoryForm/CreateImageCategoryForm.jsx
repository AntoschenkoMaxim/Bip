import { Button, Form, Input, Modal } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { formItems } from '../../constants/formItems'
import { useCreateImageCategoryQuery } from '../../hooks/useCreateImageCategoryQuery'

export function CreateImageCategoryForm({ isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm()

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const { mutate: createCategory } = useCreateImageCategoryQuery()

  const handleSubmit = (values) => {
    createCategory(values)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='create_image_category_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <Modal
      title='Создание категории'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='create_image_category_form'
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
      </Form>
    </Modal>
  )
}
