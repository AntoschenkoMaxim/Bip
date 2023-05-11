import { Button, Form, Input, Select, Upload, message } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useState } from 'react'
import { validateMessages } from '../../../../constants/validateMessages'
import { updateImageById } from '../../api/updateImageRequest'
import { getAllCategories } from '../../api/getCategoriesRequest'
import { UploadOutlined } from '@ant-design/icons'

export function UpdateImageForm({ id, handleOk }) {
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

  const client = useQueryClient()

  const { mutate: updateImage } = useMutation({
    mutationFn: updateImageById,
    onSuccess: () => {
      client.invalidateQueries(['images'])
      message.success('Изображение обновлено!')
    },
  })

  const { data: categoriesData, isSuccess } = useQuery({
    queryFn: () => getAllCategories(),
    queryKey: ['categories'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  const options = categoriesData?.rows.map((item) => ({
    value: item.id,
    label: item.description,
  }))

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

  return (
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
  )
}
