import { Badge, Button, Divider, Image, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { PostForm } from '../PostForm/PostForm'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { POSTS_URL } from '../../../../constants/urls'
import { POSTS_KEY } from '../../../../constants/keys'
import { useCreateItemQuery } from '../../../../hooks/useCreateItemQuery'
import { useUpdateItemByIdQuery } from '../../../../hooks/useUpdateItemByIdQuery'
import { useRemoveItemByIdQuery } from '../../../../hooks/useRemoveItemByIdQuery'

export function PostsTable() {
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
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
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
        posts?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removePost}
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

  const { data: posts, isSuccess } = useGetAllItemsQuery(POSTS_URL, POSTS_KEY)

  const { mutate: createPost } = useCreateItemQuery(POSTS_URL, POSTS_KEY)

  const { mutate: updatePost } = useUpdateItemByIdQuery(POSTS_URL, POSTS_KEY)

  const { mutate: removePost } = useRemoveItemByIdQuery(POSTS_URL, POSTS_KEY)

  return (
    <>
      <Button onClick={showCreateModal}>Добавить новость</Button>
      <PostForm
        key='create'
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание новости'
        btnTitle='Создать'
        onSubmit={createPost}
      />
      <Divider />
      {selectedRecord && (
        <PostForm
          key='update'
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование новости'
          btnTitle='Обновить'
          initialData={{
            title: selectedRecord.title,
            description: selectedRecord.description,
            date: selectedRecord.date,
          }}
          onSubmit={updatePost}
        />
      )}
      {isSuccess && (
        <Badge count={posts?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={posts?.rows}
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
