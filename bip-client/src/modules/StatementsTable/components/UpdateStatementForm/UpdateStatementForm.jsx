import { Button, Form, Input, Modal, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useUpdateStatementByIdQuery } from '../../hooks/useUpdateStatementByIdQuery'

export function UpdateStatementForm({
  id,
  setId,
  isModalOpen,
  setIsModalOpen,
}) {
  const [form] = Form.useForm()

  const [file, setFile] = useState(null)

  const props = {
    onRemove: () => {
      setFile(null)
    },
    beforeUpload: (file) => {
      setFile(file)
      return false
    },
  }

  const handleCancel = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const { mutate: updateStatement } = useUpdateStatementByIdQuery()

  const getStatementData = (values) => {
    const statementData = new FormData()
    statementData.append('id', id)
    statementData.append('title', values.title)
    statementData.append('image', file)
    return statementData
  }

  const handleSubmit = (values) => {
    const statement = getStatementData(values)
    updateStatement(statement)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_statement_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Обновить
    </Button>,
  ]

  return (
    <Modal
      title='Редактирование заявления'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='update_statement_form'
        form={form}
        validateMessages={validateMessages}
        onFinish={handleSubmit}
      >
        <Form.Item
          key='title'
          label='Заголовок'
          name='title'
          required
          rules={[{ required: true }]}
        >
          <Input placeholder='Новая новость' allowClear />
        </Form.Item>
        <Form.Item
          name='image'
          label='Изображение'
          required
          rules={[{ required: true }]}
          valuePropName='file'
        >
          <Upload {...props} listType='picture' maxCount={1}>
            <Button icon={<UploadOutlined />}>Выберите изображение</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
