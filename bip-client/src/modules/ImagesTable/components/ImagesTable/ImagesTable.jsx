import { Badge, Image, Popconfirm, Space, Table } from 'antd'
import { useState } from 'react'
import { UpdateImageForm } from '../UpdateImageForm/UpdateImageForm'
import { useRemoveImageByIdQuery } from '../../hooks/useRemoveImageByIdQuery'
import { useGetAllImagesQuery } from '../../../../hooks/useGetAllImagesQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'

export function ImagesTable() {
  const { getColumnSearchProps } = useTableFilterAndSearch()
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
      ...getColumnSearchProps('title', 'заголовку'),
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
        images?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeImage}
            showModal={showModal}
          />
        ) : null,
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState(null)

  const showModal = (id) => {
    setId(id)
    setIsModalOpen(true)
  }

  const { data: images, isSuccess } = useGetAllImagesQuery()

  const { mutate: removeImage } = useRemoveImageByIdQuery()

  return (
    <>
      <UpdateImageForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {isSuccess && (
        <Badge count={images?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={images?.rows}
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
