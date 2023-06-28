import { Button, Form, Input, Modal, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'

export function AdmissionForm({
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
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const props = {
    onRemove: () => {
      setFile(null)
      setImageUrl(null)
    },
    beforeUpload: (file) => {
      setFile(file)
      return false
    },
  }

  const handleCancel = () => {
    setSelectedRecord(null)
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setSelectedRecord(null)
    setIsModalOpen(false)
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    const admissionData = new FormData()
    if (initialData) {
      admissionData.append('id', id)
    }
    admissionData.append('title', values.title)
    admissionData.append('description', values.description)
    admissionData.append('image', file)
    onSubmit(admissionData)
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
          key='title'
          label='Заголовок'
          name='title'
          required
          rules={[{ required: true }]}
          initialValue={initialData?.title}
        >
          <Input placeholder='Порядок приема на 2023 год' allowClear />
        </Form.Item>
        <Form.Item
          label='Описание'
          name='description'
          required
          rules={[{ required: true }]}
          initialValue={initialData?.description}
        >
          <Input.TextArea
            placeholder='В 2023 году будет осуществляться прием...'
            allowClear
            autoSize={{
              minRows: 3,
              maxRows: 7,
            }}
          />
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
