import { Button, Form, Input, Modal, Select, Upload, message } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useUpdatePostsCategoryByIdQuery } from '../../hooks/useUpdatePostsCategoryByIdQuery'

export function UpdatePostsCategoryForm({
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

  const getPostsCategoryData = (values) => {
    const category = {
      id: id,
      value: values.value,
      description: values.description,
    }
    return category
  }

  const { mutate: updatePostsCategory } = useUpdatePostsCategoryByIdQuery()

  const handleSubmit = (values) => {
    const postsCategory = getPostsCategoryData(values)
    updatePostsCategory(postsCategory)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_posts_category_form'
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
        name='update_posts_category_form'
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
