import { Button, Form, Input, Modal, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useUpdateDateByIdQuery } from '../../hooks/useUpdateDateByIdQuery'

export function UpdateDateForm({ id, setId, isModalOpen, setIsModalOpen }) {
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

  const { mutate: updateDate } = useUpdateDateByIdQuery()

  const getDateData = (values) => {
    const dateData = new FormData()
    dateData.append('id', id)
    dateData.append('title', values.title)
    dateData.append('image', file)
    return dateData
  }

  const handleSubmit = (values) => {
    const date = getDateData(values)
    updateDate(date)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_date_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Обновить
    </Button>,
  ]

  return (
    <Modal
      title='Редактирование сроков'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='update_date_form'
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
          <Input placeholder='Сроки вступления на 2023 год' allowClear />
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
