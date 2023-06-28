import { Button, DatePicker, Form, Modal, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import dayjs from 'dayjs'

export function TimetableForm({
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

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day')
  }

  const getTimetableData = (values) => {
    const date = values.date.toISOString()
    const timetableData = new FormData()
    if (initialData) {
      timetableData.append('id', id)
    }
    timetableData.append('date', date)
    timetableData.append('image', file)
    return timetableData
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    const timetable = getTimetableData(values)
    onSubmit(timetable)
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
          key='date'
          label='Дата'
          name='date'
          required
          rules={[{ required: true }]}
        >
          <DatePicker
            placeholder='Выберите дату'
            format='YYYY-MM-DD'
            disabledDate={disabledDate}
            showTime={{
              defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
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
