import { Badge, Button, Divider, Image, Table } from 'antd'
import { useState } from 'react'
import { useRemoveAdmissionByIdQuery } from '../../hooks/useRemoveAdmissionByIdQuery'
import { useGetAllAdmissionsQuery } from '../../../../hooks/useGetAllAdmissionsQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { AdmissionForm } from '../AdmissionForm/AdmissionForm'
import { useCreateAdmissionQuery } from '../../hooks/useCreateAdmissionQuery'
import { useUpdateAdmissionByIdQuery } from '../../hooks/useUpdateAdmissionByIdQuery'

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
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('title', 'описанию'),
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
            showModal={showUpdateModal}
          />
        ) : null,
    },
  ]

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState()

  const showUpdateModal = (record) => {
    setSelectedRecord(record)
    setIsUpdateModalOpen(true)
  }

  const showCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const { data: admissions, isSuccess } = useGetAllAdmissionsQuery()

  const { mutate: createAdmission } = useCreateAdmissionQuery()

  const { mutate: updateAdmission } = useUpdateAdmissionByIdQuery()

  const { mutate: removeAdmission } = useRemoveAdmissionByIdQuery()

  return (
    <>
      <Button onClick={showCreateModal}>Добавить порядок приема</Button>
      <AdmissionForm
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание порядка приема'
        onSubmit={createAdmission}
      />
      <Divider />
      {selectedRecord && (
        <AdmissionForm
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование порядка приема'
          initialData={{
            title: selectedRecord.title,
            description: selectedRecord.description,
          }}
          onSubmit={updateAdmission}
        />
      )}
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
