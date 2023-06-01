import { Button, Form, Input, Modal, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useCreateAchievementQuery } from '../../hooks/useCreateAchievementQuery'

export function CreateAchievementForm({ isModalOpen, setIsModalOpen }) {
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

  const { mutate: createAchievement } = useCreateAchievementQuery()

  const getAchievementData = (values) => {
    const achievementData = new FormData()
    achievementData.append('title', values.title)
    achievementData.append('description', values.description)
    achievementData.append('image', file)
    return achievementData
  }

  const handleSubmit = (values) => {
    const achievementData = getAchievementData(values)
    createAchievement(achievementData)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='create_achievement_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <Modal
      title='Создание достижения'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='create_achievement_form'
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
          <Input placeholder='Новое достижение' allowClear />
        </Form.Item>
        <Form.Item
          label='Описание'
          name='description'
          required
          rules={[{ required: true }]}
        >
          <Input.TextArea
            placeholder='Достижение в области науки...'
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
        >
          <Upload {...props} listType='picture' maxCount={1}>
            <Button icon={<UploadOutlined />}>Выберите изображение</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
