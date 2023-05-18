import { Badge, Popconfirm, Space, Table, Tag, message } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getAllDepartments } from '../../api/getDepartmentsRequest'
import { UpdateDepartmentForm } from '../UpdateDepartmentForm/UpdateDepartmentForm'
import { useRemoveDepartmentByIdQuery } from '../../hooks/useRemoveDepartmentByIdQuery'
import { useGetAllDepartmentsQuery } from '../../hooks/useGetAllDepartmentsQuery'

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
        departments?.rows.length >= 1 ? (
          <Space>
            <Popconfirm
              title='Вы уверены?'
              onConfirm={() => removeDepartment(record.id)}
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

  const { data: departments, isSuccess } = useGetAllDepartmentsQuery()

  const { mutate: removeDepartment } = useRemoveDepartmentByIdQuery()

  return (
    <>
      <UpdateDepartmentForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {isSuccess && (
        <Badge count={departments?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={departments?.rows}
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
