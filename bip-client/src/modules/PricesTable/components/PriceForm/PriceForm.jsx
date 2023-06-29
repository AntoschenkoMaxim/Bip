import { Button, Form, Input, Modal, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'

export function PriceForm({
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
  const [priceImage, setPriceImage] = useState(null)
  const [paymentImage, setPaymentImage] = useState(null)

  const handleCancel = () => {
    setSelectedRecord(null)
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setSelectedRecord(null)
    setIsModalOpen(false)
  }

  const getPriceData = (values) => {
    const priceData = new FormData()
    if (initialData) {
      priceData.append('id', id)
    }
    priceData.append('title', values.title)
    if (priceImage) {
      priceData.append('price_image', priceImage)
    }
    if (paymentImage) {
      priceData.append('payment_image', paymentImage)
    }
    return priceData
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    const price = getPriceData(values)
    onSubmit(price)
    form.resetFields()
    handleOk()
  }

  const priceProps = {
    onRemove: () => {
      setPriceImage(null)
    },
    beforeUpload: (file) => {
      setPriceImage(file)
      return false
    },
  }

  const paymentProps = {
    onRemove: () => {
      setPaymentImage(null)
    },
    beforeUpload: (file) => {
      setPaymentImage(file)
      return false
    },
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
          <Input placeholder='Стоимость обучения на 2024 год' allowClear />
        </Form.Item>
        <Form.Item
          name='price_image'
          label='Стоимость'
          required
          rules={[{ required: true }]}
          valuePropName='file'
        >
          <Upload {...priceProps} listType='picture' maxCount={1}>
            <Button icon={<UploadOutlined />}>Выберите изображение</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name='payment_image'
          label='Оплата'
          required
          rules={[{ required: true }]}
          valuePropName='file'
        >
          <Upload {...paymentProps} listType='picture' maxCount={1}>
            <Button icon={<UploadOutlined />}>Выберите изображение</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
