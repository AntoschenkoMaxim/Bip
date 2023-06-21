import { Button, DatePicker, Form, Modal, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useCreateTimetableQuery } from '../../hooks/useCreateTimetableQuery'
import dayjs from 'dayjs'

export function CreateTimetableForm({ isModalOpen, setIsModalOpen }) {
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

  const { mutate: createTimetable } = useCreateTimetableQuery()

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day')
  }

  const getTimetableData = (values) => {
    const date = values.date.toISOString()
    const timetableData = new FormData()
    timetableData.append('date', date)
    timetableData.append('image', file)
    return timetableData
  }

  const handleSubmit = (values) => {
    const timetableData = getTimetableData(values)
    createTimetable(timetableData)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='create_timetable_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <Modal
      title='Редактирование расписания'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='create_timetable_form'
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
