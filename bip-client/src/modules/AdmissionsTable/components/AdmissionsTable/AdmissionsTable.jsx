import { Badge, Image, Popconfirm, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { UpdateAdmissionForm } from '../UpdateAdmissionForm/UpdateAdmissionForm'
import { useRemoveAdmissionByIdQuery } from '../../hooks/useRemoveAdmissionByIdQuery'
import { useGetAllAdmissionsQuery } from '../../../../hooks/useGetAllAdmissionsQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'

export function AdmissionsTable() {
  const { getColumnSearchProps } = useTableFilterAndSearch()

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
      ...getColumnSearchProps('title', 'заголовку'),
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
        admissions?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeAdmission}
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

  const { data: admissions, isSuccess } = useGetAllAdmissionsQuery()

  const { mutate: removeAdmission } = useRemoveAdmissionByIdQuery()

  return (
    <>
      <UpdateAdmissionForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {isSuccess && (
        <Badge count={admissions?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={admissions?.rows}
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
