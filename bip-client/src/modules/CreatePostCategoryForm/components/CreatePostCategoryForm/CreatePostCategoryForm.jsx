import { Button, Form, Input, Modal } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useCreatePostCategoryQuery } from '../../hooks/useCreatePostCategoryQuery'

export function CreatePostCategoryForm({ isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm()

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const { mutate: createCategory } = useCreatePostCategoryQuery()

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
      form='create_post_category_form'
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
        name='create_post_category_form'
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
