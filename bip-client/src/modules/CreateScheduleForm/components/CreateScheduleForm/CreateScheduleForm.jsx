import { Button, Form, Input, Modal, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useCreateScheduleQuery } from '../../hooks/useCreateScheduleQuery'

export function CreateScheduleForm({ isModalOpen, setIsModalOpen }) {
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

  const { mutate: createSchedule } = useCreateScheduleQuery()

  const getScheduleData = (values) => {
    const scheduleData = new FormData()
    scheduleData.append('title', values.title)
    scheduleData.append('image', file)
    return scheduleData
  }

  const handleSubmit = (values) => {
    const schedule = getScheduleData(values)
    createSchedule(schedule)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='create_schedule_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <Modal
      title='Создание графика учебного процесса'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='create_schedule_form'
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
          <Input
            placeholder='График учебного процесса на 2023 год'
            allowClear
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
