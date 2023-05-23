import { Button, Form, Input, Modal, Select, Upload } from 'antd'
import { useState } from 'react'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useGetAllImageCategoriesQuery } from '../../../../hooks/useGetAllImageCategories'
import { useUpdateImageByIdQuery } from '../../hooks/useUpdateImageByIdQuery'

export function UpdateImageForm({ id, setId, isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm()

  const handleCancel = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setId(null)
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

  const { data: imageCategories, isSuccess } = useGetAllImageCategoriesQuery()

  const options = imageCategories?.rows.map((item) => ({
    value: item.id,
    label: item.description,
  }))

  const { mutate: updateImage } = useUpdateImageByIdQuery()

  const getImageData = (values) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('title', values.title)
    formData.append('categoryId', values.categoryId)
    formData.append('image', file)
    return formData
  }

  const handleSubmit = (values) => {
    const image = getImageData(values)
    updateImage(image)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_image_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Обновить
    </Button>,
  ]

  return (
    <Modal
      title='Редактирование предмета'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
      <Form
        layout='vertical'
        name='update_image_form'
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
