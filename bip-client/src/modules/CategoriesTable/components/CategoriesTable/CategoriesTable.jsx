import { Badge, Image, Popconfirm, Table, Tag } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAllCategories } from '../../api/getCategoriesRequest'
import { removeCategoryById } from '../../api/removeCategoryRequest'

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
          <Popconfirm title='Вы уверены?' onConfirm={() => remove(record.id)}>
            <a>Удалить</a>
          </Popconfirm>
        ) : null,
    },
  ]

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
    },
  })

  return (
    <>
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
