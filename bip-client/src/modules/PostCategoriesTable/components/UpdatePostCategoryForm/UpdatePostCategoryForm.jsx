import { Button, Form, Input, Modal } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useUpdatePostCategoryByIdQuery } from '../../hooks/useUpdatePostCategoryByIdQuery'

export function UpdatePostCategoryForm({
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

  const getPostCategoryData = (values) => {
    const category = {
      id: id,
      value: values.value,
      description: values.description,
    }
    return category
  }

  const { mutate: updatePostCategory } = useUpdatePostCategoryByIdQuery()

  const handleSubmit = (values) => {
    const postCategory = getPostCategoryData(values)
    updatePostCategory(postCategory)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_post_category_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Обновить
    </Button>,
  ]

  return (
    <Modal
      title='Редактирование новости'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='update_post_category_form'
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
