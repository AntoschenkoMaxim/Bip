import { Badge, Button, Divider, Table } from 'antd'
import { ImageCategoryForm } from '../ImageCategoryForm/ImageCategoryForm'
import { useState } from 'react'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { IMAGE_CATEGORIES_URL } from '../../../../constants/urls'
import { IMAGE_CATEGORIES_KEY } from '../../../../constants/keys'
import { useCreateItemQuery } from '../../../../hooks/useCreateItemQuery'
import { useUpdateItemByIdQuery } from '../../../../hooks/useUpdateItemByIdQuery'
import { useRemoveItemByIdQuery } from '../../../../hooks/useRemoveItemByIdQuery'

export function ImageCategoriesTable() {
  const { getColumnSearchProps } = useTableFilterAndSearch()
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
      ...getColumnSearchProps('value', 'значению'),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description', 'описанию'),
    },
    {
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        imageCategories?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeImageCategory}
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
    setSelectedRecord(null)
    setIsCreateModalOpen(true)
  }

  const { data: imageCategories, isSuccess } = useGetAllItemsQuery(
    IMAGE_CATEGORIES_URL,
    IMAGE_CATEGORIES_KEY
  )

  const { mutate: createImageCategory } = useCreateItemQuery(
    IMAGE_CATEGORIES_URL,
    IMAGE_CATEGORIES_KEY
  )

  const { mutate: updateImageCategory } = useUpdateItemByIdQuery(
    IMAGE_CATEGORIES_URL,
    IMAGE_CATEGORIES_KEY
  )

  const { mutate: removeImageCategory } = useRemoveItemByIdQuery(
    IMAGE_CATEGORIES_URL,
    IMAGE_CATEGORIES_KEY
  )

  return (
    <>
      <Button onClick={showCreateModal}>Добавить категорию</Button>
      <ImageCategoryForm
        key='create'
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание категории'
        btnTitle='Создать'
        onSubmit={createImageCategory}
      />
      <Divider />
      {selectedRecord && (
        <ImageCategoryForm
          key='update'
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование категории'
          btnTitle='Обновить'
          initialData={{
            value: selectedRecord.value,
            description: selectedRecord.description,
          }}
          onSubmit={updateImageCategory}
        />
      )}
      {isSuccess && (
        <Badge count={imageCategories?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={imageCategories?.rows}
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
