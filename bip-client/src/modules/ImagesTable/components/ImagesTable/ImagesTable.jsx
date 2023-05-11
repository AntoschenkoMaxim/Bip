import {
  Badge,
  Button,
  Image,
  Modal,
  Popconfirm,
  Space,
  Table,
  message,
} from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAllImages } from '../../api/getImagesRequest'
import { removeImageById } from '../../api/removeImageRequest'
import { useState } from 'react'
import { UpdateImageForm } from '../UpdateImageForm/UpdateImageForm'

export function ImagesTable() {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Категория',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'Изображение',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Image
          src={`${import.meta.env.VITE_BASE_URL}/${image}`}
          alt='image'
          width={100}
        />
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
    queryFn: () => getAllImages(),
    queryKey: ['images'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  const { mutate: remove } = useMutation({
    mutationFn: removeImageById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['images'] })
      message.success('Изображение удалено!')
    },
  })

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
    <>
      <Modal
        title='Редактирование предмета'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={buttons}
      >
        <UpdateImageForm id={id} handleOk={handleOk} />
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
