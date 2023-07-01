import { Button, DatePicker, Form, Input, Modal, Select, Upload } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { POST_CATEGORIES_URL } from '../../../../constants/urls'
import { POST_CATEGORIES_KEY } from '../../../../constants/keys'

export function PostForm({
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

  const { data: postCategories, isSuccess } = useGetAllItemsQuery(
    POST_CATEGORIES_URL,
    POST_CATEGORIES_KEY
  )

  const options = postCategories?.rows.map((item) => ({
    value: item.id,
    label: item.description,
  }))

  const getPostData = (values) => {
    const date = values.date.toISOString()
    const postData = new FormData()
    if (initialData) {
      postData.append('id', id)
    }
    postData.append('title', values.title)
    postData.append('description', values.description)
    postData.append('date', date)
    postData.append('postsCategoryId', values.postsCategoryId)
    postData.append('image', file)
    return postData
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    const post = getPostData(values)
    onSubmit(post)
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
          key='title'
          label='Заголовок'
          name='title'
          required
          rules={[{ required: true }]}
          initialValue={initialData?.title}
        >
          <Input placeholder='Новая новость' allowClear />
        </Form.Item>

        <Form.Item
          label='Описание'
          name='description'
          required
          rules={[{ required: true }]}
          initialValue={initialData?.description}
        >
          <Input.TextArea
            placeholder='Новость о наших успехах...'
            allowClear
            autoSize={{
              minRows: 3,
              maxRows: 7,
            }}
          />
        </Form.Item>
        <Form.Item
          key='date'
          label='Дата'
          name='date'
          required
          rules={[{ required: true }]}
        >
          <DatePicker placeholder='Выберите дату' format='YYYY-MM-DD' />
        </Form.Item>
        <Form.Item
          label='Категория'
          name='postsCategoryId'
          required
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder='Искать'
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
