import {
  Badge,
  Button,
  Image,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
} from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAllCategories } from '../../api/getCategoriesRequest'
import { removeCategoryById } from '../../api/removeCategoryRequest'
import { UpdateCategoryForm } from '../UpdateCategoryForm/UpdateCategoryForm'
import { useState } from 'react'

export function CategoriesTable() {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Значение',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Изображения',
      dataIndex: 'images',
      key: 'images',
      render: (_, { images }) => (
        <>
          {images.length ? (
            <Image.PreviewGroup>
              {images.map((item) => {
                return (
                  <Image
                    key={item.id}
                    src={`${import.meta.env.VITE_BASE_URL}/${item.image}`}
                    alt='image'
                    width={100}
                  />
                )
              })}
            </Image.PreviewGroup>
          ) : (
            <Tag color='volcano'>НЕТ ИЗОБРАЖЕНИЙ</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        data?.rows.length >= 1 ? (
          <Space>
            <Popconfirm title='Вы уверены?' onConfirm={() => remove(record.id)}>
              <a>Удалить</a>
            </Popconfirm>
            <a onClick={() => showModal(record.id)}>Изменить</a>
          </Space>
        ) : null,
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState(null)

  const showModal = (id) => {
    setId(id)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const client = useQueryClient()

  const { data, isSuccess } = useQuery({
    queryFn: () => getAllCategories(),
    queryKey: ['categories'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  const { mutate: remove } = useMutation({
    mutationFn: removeCategoryById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['categories'] })
      message.success('Категория удалена!')
    },
  })

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_category_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Обновить
    </Button>,
  ]

  return (
    <>
      <Modal
        title='Редактирование категории'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={buttons}
      >
        <UpdateCategoryForm id={id} handleOk={handleOk} />
      </Modal>
      {isSuccess && (
        <Badge count={data?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={data?.rows}
            pagination={{
              defaultPageSize: '5',
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 15],
            }}
          />
        </Badge>
      )}
    </>
  )
}
