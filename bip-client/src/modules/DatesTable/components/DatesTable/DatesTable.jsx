import { Badge, Button, Divider, Image, Table } from 'antd'
import { useState } from 'react'
import { useRemoveDateByIdQuery } from '../../hooks/useRemoveDateByIdQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { DateForm } from '../DateForm/DateForm'
import { useUpdateDateByIdQuery } from '../../hooks/useUpdateDateByIdQuery'
import { useCreateDateQuery } from '../../hooks/useCreateDateQuery'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { DATES_URL } from '../../../../constants/urls'
import { DATES_KEY } from '../../../../constants/keys'

export function DatesTable() {
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
        dates?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeDate}
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

  const { data: dates, isSuccess } = useGetAllItemsQuery(DATES_URL, DATES_KEY)

  const { mutate: createDate } = useCreateDateQuery()

  const { mutate: updateDate } = useUpdateDateByIdQuery()

  const { mutate: removeDate } = useRemoveDateByIdQuery()

  return (
    <>
      <Button onClick={showCreateModal}>Добавить срок поступления</Button>
      <DateForm
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание срока поступления'
        btnTitle='Создать'
        onSubmit={createDate}
      />
      <Divider />
      {selectedRecord && (
        <DateForm
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование срока поступления'
          btnTitle='Обновить'
          initialData={{
            title: selectedRecord.title,
          }}
          onSubmit={updateDate}
        />
      )}
      {isSuccess && (
        <Badge count={dates?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={dates?.rows}
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
