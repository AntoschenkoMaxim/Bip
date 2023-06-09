import { Button, Form, Input, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { ACHIEVEMENTS_URL } from '../../../../constants/urls'
import { ACHIEVEMENTS_KEY } from '../../../../constants/keys'

export function AchievementForm({
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
