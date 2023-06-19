import { Button, Form, Input, Modal, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useCreateStatementQuery } from '../../hooks/useCreateStatementQuery'

export function CreateStatementForm({ isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm()

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [file, setFile] = useState()

  const props = {
    onRemove: () => {
      setFile()
    },
    beforeUpload: (file) => {
      setFile(file)
      return false
    },
  }

  const { mutate: createStatement } = useCreateStatementQuery()

  const getStatementData = (values) => {
    const statementData = new FormData()
    statementData.append('title', values.title)
    statementData.append('image', file)
    return statementData
  }

  const handleSubmit = (values) => {
    const statementData = getStatementData(values)
    createStatement(statementData)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='create_statement_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <Modal
      title='Создание заявления'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='create_statement_form'
        form={form}
        validateMessages={validateMessages}
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Заголовок'
          name='title'
          required
          rules={[{ required: true }]}
        >
          <Input placeholder='Заявление на материальную помощь' allowClear />
        </Form.Item>
        <Form.Item
          name='image'
          label='Изображение'
          required
          rules={[{ required: true }]}
        >
          <Upload {...props} listType='picture' maxCount={1}>
            <Button icon={<UploadOutlined />}>Выберите изображение</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
