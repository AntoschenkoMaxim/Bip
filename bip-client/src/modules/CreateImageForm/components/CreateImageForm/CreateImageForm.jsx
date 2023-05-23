import { Button, Form, Input, Select, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useCreateImageQuery } from '../../hooks/useCreateImageQuery'
import { useGetAllImageCategoriesQuery } from '../../../../hooks/useGetAllImageCategories'

export function CreateImageForm({ handleOk }) {
  const [form] = Form.useForm()

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

  const { mutate: createImage } = useCreateImageQuery()

  const getImageData = (values) => {
    const imageData = new FormData()
    imageData.append('title', values.title)
    imageData.append('categoryId', values.categoryId)
    imageData.append('image', file)
    return imageData
  }

  const handleSubmit = (values) => {
    const imageData = getImageData(values)
    createImage(imageData)
    form.resetFields()
    handleOk()
  }

  return (
    <Form
      layout='vertical'
      name='create_image_form'
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
  )
}
