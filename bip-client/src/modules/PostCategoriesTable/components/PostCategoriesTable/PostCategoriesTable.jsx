import { Badge, Popconfirm, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { UpdatePostCategoryForm } from '../UpdatePostCategoryForm/UpdatePostCategoryForm'
import { useGetAllPostCategoriesQuery } from '../../../../hooks/useGetAllPostCategoriesQuery'
import { useRemovePostCategoryByIdQuery } from '../../hooks/useRemovePostCategoryByIdQuery'

export function PostCategoriesTable() {
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
        postCategories?.rows.length >= 1 ? (
          <Space>
            <Popconfirm
              title='Вы уверены?'
              onConfirm={() => removePostCategory(record.id)}
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

  const { data: postCategories, isSuccess } = useGetAllPostCategoriesQuery()

  const { mutate: removePostCategory } = useRemovePostCategoryByIdQuery()

  return (
    <>
      <UpdatePostCategoryForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
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
