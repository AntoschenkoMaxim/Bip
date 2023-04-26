import { Badge, Popconfirm, Table, Tag } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAllTeachers } from '../../api/getTeachersRequest'
import { removeTeacherById } from '../../api/removeTeacherRequest'

export function TeachersTable() {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Отчество',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Должность',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Предметы',
      dataIndex: 'lessons',
      key: 'lessons',
      render: (_, { lessons }) => (
        <>
          {lessons.map((lesson) => {
            return (
              <Tag color='geekblue' key={lesson.value}>
                {lesson.description.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm title='Вы уверены?' onConfirm={() => remove(record.id)}>
            <a>Удалить</a>
          </Popconfirm>
        ) : null,
    },
  ]

  const client = useQueryClient()

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => getAllTeachers(),
    queryKey: ['teachers'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  const { mutate: remove } = useMutation({
    mutationFn: removeTeacherById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['teachers'] })
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
