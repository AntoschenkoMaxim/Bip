import { Badge, Image, Popconfirm, Table, Tag } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAllPosts } from '../../api/getPostsRequest'
import { removePostById } from '../../api/removePostRequest'

export function PostsTable() {
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
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
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
    queryFn: () => getAllPosts(),
    queryKey: ['posts'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  const { mutate: remove } = useMutation({
    mutationFn: removePostById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['posts'] })
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
