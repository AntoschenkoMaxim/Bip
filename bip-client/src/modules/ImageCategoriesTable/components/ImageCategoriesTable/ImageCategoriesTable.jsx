import { Badge, Image, Popconfirm, Space, Table, Tag } from 'antd'
import { UpdateImageCategoryForm } from '../UpdateCategoryForm/UpdateImageCategoryForm'
import { useState } from 'react'
import { useRemoveImageCategoryByIdQuery } from '../../hooks/useRemoveImageCategoryByIdQuery'
import { useGetAllImageCategoriesQuery } from '../../../../hooks/useGetAllImageCategories'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'

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
        imageCategories?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeCategory}
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

  const { data: imageCategories, isSuccess } = useGetAllImageCategoriesQuery()

  const { mutate: removeCategory } = useRemoveImageCategoryByIdQuery()

  return (
    <>
      <UpdateImageCategoryForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
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
