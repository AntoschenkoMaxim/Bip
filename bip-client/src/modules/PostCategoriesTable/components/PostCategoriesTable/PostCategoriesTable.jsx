import { Badge, Button, Divider, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { useGetAllPostCategoriesQuery } from '../../../../hooks/useGetAllPostCategoriesQuery'
import { useRemovePostCategoryByIdQuery } from '../../hooks/useRemovePostCategoryByIdQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { useUpdatePostCategoryByIdQuery } from '../../hooks/useUpdatePostCategoryByIdQuery'
import { useCreatePostCategoryQuery } from '../../hooks/useCreatePostCategoryQuery'
import { PostCategoryForm } from '../PostCategoryForm/PostCategoryForm'

export function PostCategoriesTable() {
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
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement='topLeft' title={description}>
          {description}
        </Tooltip>
      ),
      ...getColumnSearchProps('description', 'описанию'),
    },
    {
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        postCategories?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removePostCategory}
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

  const { data: postCategories, isSuccess } = useGetAllPostCategoriesQuery()

  const { mutate: createPostCategory } = useCreatePostCategoryQuery()

  const { mutate: updatePostCategory } = useUpdatePostCategoryByIdQuery()

  const { mutate: removePostCategory } = useRemovePostCategoryByIdQuery()

  return (
    <>
      <Button onClick={showCreateModal}>Добавить категорию</Button>
      <PostCategoryForm
        key='create'
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание категории'
        btnTitle='Создать'
        onSubmit={createPostCategory}
      />
      <Divider />
      {selectedRecord && (
        <PostCategoryForm
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
          onSubmit={updatePostCategory}
        />
      )}
      {isSuccess && (
        <Badge count={postCategories?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={postCategories?.rows}
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
