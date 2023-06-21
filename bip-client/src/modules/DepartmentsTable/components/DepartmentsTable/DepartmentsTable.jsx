import { Badge, Popconfirm, Space, Table, Tag } from 'antd'
import { useState } from 'react'
import { UpdateDepartmentForm } from '../UpdateDepartmentForm/UpdateDepartmentForm'
import { useRemoveDepartmentByIdQuery } from '../../hooks/useRemoveDepartmentByIdQuery'
import { useGetAllDepartmentsQuery } from '../../../../hooks/useGetAllDepartmentsQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'

export function DepartmentsTable() {
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
          <ActionsColumn
            record={record}
            removeItem={removeDepartment}
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
