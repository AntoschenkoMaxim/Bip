import { Button, Form, Input, Modal, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useUpdateAdmissionByIdQuery } from '../../hooks/useUpdateAdmissionByIdQuery'

export function UpdateAdmissionForm({
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

  const { mutate: updateAdmission } = useUpdateAdmissionByIdQuery()

  const getAdmissionData = (values) => {
    const admissionData = new FormData()
    admissionData.append('id', id)
    admissionData.append('title', values.title)
    admissionData.append('description', values.description)
    admissionData.append('image', file)
    return admissionData
  }

  const handleSubmit = (values) => {
    const admission = getAdmissionData(values)
    updateAdmission(admission)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_admission_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Обновить
    </Button>,
  ]

  return (
    <Modal
      title='Редактирование порядка приема'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='update_admission_form'
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
          <Input placeholder='Порядок приема на 2023 год' allowClear />
        </Form.Item>
        <Form.Item
          label='Описание'
          name='description'
          required
          rules={[{ required: true }]}
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
