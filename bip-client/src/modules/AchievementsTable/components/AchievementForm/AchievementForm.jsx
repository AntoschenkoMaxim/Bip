import { Button, Form, Input, Modal, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

export function AchievementForm({
  id,
  setSelectedRecord,
  isModalOpen,
  setIsModalOpen,
  title,
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
    const achievementData = new FormData()
    if (initialData) {
      achievementData.append('id', id)
    }
    achievementData.append('title', values.title)
    achievementData.append('description', values.description)
    achievementData.append('image', file)
    onSubmit(achievementData)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='achievement_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      {title}
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
        name='achievement_form'
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          key='title'
          label='Заголовок'
          name='title'
          required
          initialValue={initialData?.title}
          rules={[{ required: true }]}
        >
          <Input placeholder='Новое достижение' allowClear />
        </Form.Item>

        <Form.Item
          label='Описание'
          name='description'
          required
          initialValue={initialData?.description}
          rules={[{ required: true }]}
        >
          <Input.TextArea
            placeholder='Достижение в области науки...'
            allowClear
            autoSize={{ minRows: 3, maxRows: 7 }}
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
