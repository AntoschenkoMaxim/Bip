import { Badge, Image, Popconfirm, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { useRemovePostsCategoryByIdQuery } from '../../hooks/useRemovePostsCategoryByIdQuery'
import { useGetAllPostsCategoriesQuery } from '../../../../hooks/useGetAllPostsCategoriesQuery'
import { UpdatePostsCategoryForm } from '../UpdatePostsCategoryForm/UpdatePostsCategoryForm'

export function PostsCategoriesTable() {
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
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement='topLeft' title={description}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        postsCategories?.rows.length >= 1 ? (
          <Space>
            <Popconfirm
              title='Вы уверены?'
              onConfirm={() => removePostsCategory(record.id)}
            >
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

  const { data: postsCategories, isSuccess } = useGetAllPostsCategoriesQuery()

  const { mutate: removePostsCategory } = useRemovePostsCategoryByIdQuery()

  return (
    <>
      <UpdatePostsCategoryForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {isSuccess && (
        <Badge count={postsCategories?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={postsCategories?.rows}
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
