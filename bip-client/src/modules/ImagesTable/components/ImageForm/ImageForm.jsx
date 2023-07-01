import { Button, Form, Input, Modal, Select, Upload } from 'antd'
import { useState } from 'react'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { IMAGE_CATEGORIES_URL } from '../../../../constants/urls'
import { IMAGE_CATEGORIES_KEY } from '../../../../constants/keys'

export function ImageForm({
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

  const { data: imageCategories, isSuccess } = useGetAllItemsQuery(
    IMAGE_CATEGORIES_URL,
    IMAGE_CATEGORIES_KEY
  )

  const options = imageCategories?.rows.map((item) => ({
    value: item.id,
    label: item.description,
  }))

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    const imageData = new FormData()
    if (initialData) {
      imageData.append('id', id)
    }
    imageData.append('title', values.title)
    imageData.append('categoryId', values.categoryId)
    imageData.append('image', file)
    onSubmit(imageData)
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
          label='Заголовок'
          name='title'
          required
          rules={[{ required: true }]}
          initialValue={initialData?.title}
        >
          <Input placeholder='Олимпиада' allowClear />
        </Form.Item>

        <Form.Item
          label='Категория'
          name='categoryId'
          required
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder='Категория'
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={isSuccess && options}
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
