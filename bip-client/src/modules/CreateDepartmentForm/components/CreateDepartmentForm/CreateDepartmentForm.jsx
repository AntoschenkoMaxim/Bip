import { Button, Form, Input, Modal } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { formItems } from '../../constants/formItems'
import { useCreateDepartmentQuery } from '../../hooks/useCreateDepartmentForm'

export function CreateDepartmentForm({
  isCreateModalOpen,
  setIsCreateModalOpen,
}) {
  const [form] = Form.useForm()

  const handleCancel = () => {
    setIsCreateModalOpen(false)
  }

  const handleOk = () => {
    setIsCreateModalOpen(false)
  }

  const { mutate: createDepartment } = useCreateDepartmentQuery()

  const handleSubmit = (values) => {
    createDepartment(values)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='create_department_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <Modal
      title='Создание кафедры'
      open={isCreateModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='create_department_form'
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
