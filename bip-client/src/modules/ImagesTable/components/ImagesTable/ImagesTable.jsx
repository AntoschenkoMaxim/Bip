import { Badge, Image, Popconfirm, Table } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAllImages } from '../../api/getImagesRequest'
import { removeImageById } from '../../api/removeImageRequest'

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
          <Popconfirm title='Вы уверены?' onConfirm={() => remove(record.id)}>
            <a>Удалить</a>
          </Popconfirm>
        ) : null,
    },
  ]

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
