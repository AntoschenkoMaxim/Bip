import { Badge, Popconfirm, Table, Tag } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { removeDepartmentById } from '../../api/removeDepartmentRequest'
import { getAllDepartments } from '../../api/getDepartmentsRequest'

export function DepartmentsTable() {
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
      title: 'Предметы',
      dataIndex: 'lessons',
      key: 'lessons',
      render: (_, { lessons }) => (
        <>
          {lessons.length ? (
            lessons.map((lesson) => {
              return (
                <Tag color='geekblue' key={lesson.value}>
                  {lesson.description.toUpperCase()}
                </Tag>
              )
            })
          ) : (
            <Tag color='volcano'>НЕТ ПРЕДМЕТОВ</Tag>
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
    queryFn: () => getAllDepartments(),
    queryKey: ['departments'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  const { mutate: remove } = useMutation({
    mutationFn: removeDepartmentById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['departments'] })
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
