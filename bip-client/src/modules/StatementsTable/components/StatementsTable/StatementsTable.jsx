import { Badge, Button, Divider, Image, Table } from 'antd'
import { useState } from 'react'
import { StatementForm } from '../StatementForm/StatementForm'
import { useRemoveStatementByIdQuery } from '../../hooks/useRemoveStatementByIdQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { useUpdateStatementByIdQuery } from '../../hooks/useUpdateStatementByIdQuery'
import { useCreateStatementQuery } from '../../hooks/useCreateStatementQuery'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { STATEMENTS_URL } from '../../../../constants/urls'
import { STATEMENTS_KEY } from '../../../../constants/keys'

export function StatementsTable() {
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
        statements?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeStatement}
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

  const { data: statements, isSuccess } = useGetAllItemsQuery(
    STATEMENTS_URL,
    STATEMENTS_KEY
  )

  const { mutate: createStatement } = useCreateStatementQuery()

  const { mutate: updateStatement } = useUpdateStatementByIdQuery()

  const { mutate: removeStatement } = useRemoveStatementByIdQuery()

  return (
    <>
      <Button onClick={showCreateModal}>Добавить заявление</Button>
      <StatementForm
        key='create'
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание заявления'
        btnTitle='Создать'
        onSubmit={createStatement}
      />
      <Divider />
      {selectedRecord && (
        <StatementForm
          key='update'
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование заявления'
          btnTitle='Обновить'
          initialData={{
            title: selectedRecord.title,
            image: selectedRecord.image,
          }}
          onSubmit={updateStatement}
        />
      )}
      {isSuccess && (
        <Badge count={statements?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={statements?.rows}
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
