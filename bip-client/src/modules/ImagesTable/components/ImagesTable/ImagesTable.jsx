import { Badge, Button, Divider, Image, Table } from 'antd'
import { useState } from 'react'
import { useRemoveImageByIdQuery } from '../../hooks/useRemoveImageByIdQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { useUpdateImageByIdQuery } from '../../hooks/useUpdateImageByIdQuery'
import { useCreateImageQuery } from '../../hooks/useCreateImageQuery'
import { ImageForm } from '../ImageForm/ImageForm'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { IMAGES_URL } from '../../../../constants/urls'
import { IMAGES_KEY } from '../../../../constants/keys'

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
            showModal={showUpdateModal}
          />
        ) : null,
    },
  ]

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState()

  const showUpdateModal = (record) => {
    setSelectedRecord(record)
    setIsUpdateModalOpen(true)
  }

  const showCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const { data: images, isSuccess } = useGetAllItemsQuery(
    IMAGES_URL,
    IMAGES_KEY
  )

  const { mutate: createImage } = useCreateImageQuery()

  const { mutate: updateImage } = useUpdateImageByIdQuery()

  const { mutate: removeImage } = useRemoveImageByIdQuery()

  return (
    <>
      <Button onClick={showCreateModal}>Добавить изображение</Button>
      <ImageForm
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание изображения'
        btnTitle='Создать'
        onSubmit={createImage}
      />
      <Divider />
      {selectedRecord && (
        <ImageForm
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование изображения'
          btnTitle='Обновить'
          initialData={{
            title: selectedRecord.title,
            description: selectedRecord.description,
          }}
          onSubmit={updateImage}
        />
      )}
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
